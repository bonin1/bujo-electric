import yaml
import os
import json
import re
import shutil
from pathlib import Path
from typing import List, Dict, Tuple
try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False
    print("⚠️  Warning: PIL (Pillow) not installed. Image conversion features will be disabled.")

# -----------------------------
# Paths
# -----------------------------
script_dir = os.path.dirname(os.path.abspath(__file__))
business_file = os.path.join(script_dir, "business.yaml")
rules_folder = os.path.join(script_dir, ".cursor/rules/")
templates_folder = os.path.join(script_dir, ".cursor/templates/")

# -----------------------------
# Load business YAML
# -----------------------------
try:
    with open(business_file, "r", encoding="utf-8") as f:
        business = yaml.safe_load(f)
    print(f"✅ Loaded business data from {business_file}")
except FileNotFoundError:
    print(f"❌ Error: {business_file} not found!")
    exit(1)
except Exception as e:
    print(f"❌ Error loading {business_file}: {e}")
    exit(1)

# -----------------------------
# Helper functions
# -----------------------------
def render_value(value, placeholder=None):
    """Converts YAML values to string for template replacement"""
    if isinstance(value, list):
        # JSON array for *_ARRAY or when used in JSON context
        if placeholder and (placeholder.endswith("_ARRAY") or placeholder in ["BLOG_TOPICS", "SERVICES", "LOCATIONS"]):
            return json.dumps(value, indent=2)
        # Markdown list for *_MD
        elif placeholder and placeholder.endswith("_MD"):
            # Handle both string and dict items safely
            items = []
            for item in value:
                if isinstance(item, dict):
                    # For location dictionaries, format as CITY-STATE
                    if 'CITY' in item or 'STATE' in item:
                        city = item.get('CITY', '')
                        state = item.get('STATE', '')
                        if city and state:
                            items.append(f"{city}-{state}")
                        elif city:
                            items.append(city)
                        elif state:
                            items.append(state)
                        else:
                            items.append(str(item))
                    else:
                        items.append(str(item))
                else:
                    items.append(str(item))
            return "\n- " + "\n- ".join(items)
        # Simple comma list otherwise
        elif all(isinstance(i, dict) for i in value):
            items = []
            for i in value:
                city = i.get('CITY', '')
                state = i.get('STATE', '')
                if city and state:
                    items.append(f"{city}-{state}")
                elif city:
                    items.append(city)
                elif state:
                    items.append(state)
                else:
                    items.append(str(i))
            return ", ".join(items)
        else:
            # Handle mixed types safely
            return ", ".join(str(i) for i in value)
    elif isinstance(value, dict):
        return json.dumps(value, indent=2)
    else:
        return str(value)

def render_supporting_topics(topics):
    """Converts supporting topics dict into Markdown"""
    md = ""
    for pillar, subs in topics.items():
        md += f"## {pillar} Supporting Pages\n\n"
        for s in subs:
            md += f"- {s}\n"
        md += "\n"
    return md

def get_nested_value(data, key_path):
    """Get nested dictionary values using dot notation (e.g., CONTACT.PHONE)"""
    keys = key_path.split('.')
    value = data
    for key in keys:
        if isinstance(value, dict) and key in value:
            value = value[key]
        else:
            return None
    return value

def create_missing_placeholders(business_data):
    """Create missing placeholders from existing data"""
    placeholders = {}
    
    # Map existing data to expected placeholders
    placeholders['BUSINESS_NAME'] = business_data.get('BUSINESS_NAME', business_data.get('SITE_NAME', ''))
    placeholders['PRIMARY_KEYWORD'] = business_data.get('PRIMARY_KEYWORD', 'Landscaping')
    placeholders['WEBSITE_URL'] = business_data.get('WEBSITE_URL', business_data.get('BASE_URL', ''))
    
    # Handle locations - use existing LOCATIONS_MD if available, otherwise generate from LOCATIONS
    if 'LOCATIONS_MD' in business_data:
        placeholders['LOCATIONS_MD'] = render_value(business_data['LOCATIONS_MD'], 'LOCATIONS_MD')
    else:
        placeholders['LOCATIONS_MD'] = render_value(business_data.get('LOCATIONS', []), 'LOCATIONS_MD')
    
    # Handle services - use flattened lists if available
    # Check for CORE_SERVICES (new hierarchical structure)
    if 'CORE_SERVICES' in business_data:
        placeholders['SERVICES_MD'] = render_value(business_data['CORE_SERVICES'], 'SERVICES_MD')
        placeholders['SERVICES'] = business_data['CORE_SERVICES']
    elif 'SERVICES_MD' in business_data:
        placeholders['SERVICES_MD'] = render_value(business_data['SERVICES_MD'], 'SERVICES_MD')
    else:
        # Handle old format (list of strings) or new format (list of dicts)
        services = business_data.get('SERVICES', [])
        if services and isinstance(services[0], dict):
            # New hierarchical format - extract service names
            service_names = [s.get('NAME', '') for s in services]
            placeholders['SERVICES_MD'] = render_value(service_names, 'SERVICES_MD')
            placeholders['SERVICES'] = service_names
        else:
            # Old format - simple list
            placeholders['SERVICES_MD'] = render_value(services, 'SERVICES_MD')
            placeholders['SERVICES'] = services
    
    placeholders['CTA_TEXT'] = business_data.get('CTA_TEXT', 'Na kontaktoni sot për një konsultim falas!')
    
    # Meta information mapping
    meta = business_data.get('META', {})
    placeholders['META_TITLE'] = meta.get('title', '')
    placeholders['META_DESCRIPTION'] = meta.get('description', '')
    placeholders['KEYWORDS_MD'] = render_value([meta.get('keywords', '')], 'KEYWORDS_MD')
    
    # Page-specific placeholders (these should be filled per-page, but provide defaults)
    placeholders['PAGE_TITLE'] = business_data.get('PAGE_TITLE', '')
    placeholders['PAGE_META_DESCRIPTION'] = business_data.get('PAGE_META_DESCRIPTION', '')
    placeholders['PAGE_KEYWORDS_MD'] = render_value(business_data.get('PAGE_KEYWORDS', []), 'PAGE_KEYWORDS_MD')
    placeholders['PAGE_URL_SLUG'] = business_data.get('PAGE_URL_SLUG', '')
    placeholders['PAGE_CONTENT'] = business_data.get('PAGE_CONTENT', '')
    
    # Create service URLs - use flattened URLs if available
    if 'CORE_SERVICES_URLS' in business_data:
        service_urls = business_data['CORE_SERVICES_URLS']
        placeholders['SERVICES_URLS'] = service_urls
        placeholders['SERVICES_URLS_MD'] = render_value(service_urls, 'SERVICES_URLS_MD')
    elif 'SERVICES_URLS' in business_data:
        service_urls = business_data['SERVICES_URLS']
        placeholders['SERVICES_URLS'] = service_urls
        placeholders['SERVICES_URLS_MD'] = render_value(service_urls, 'SERVICES_URLS_MD')
    else:
        # Generate from SERVICES
        services = business_data.get('SERVICES', [])
        if services and isinstance(services[0], dict):
            # New hierarchical format - extract URLs
            service_urls = [s.get('URL', '') for s in services]
        else:
            # Old format - generate from service names
            service_urls = [f"/{service.lower().replace(' ', '-').replace('(', '').replace(')', '').replace('&', 'and')}/" for service in services]
        placeholders['SERVICES_URLS'] = service_urls
        placeholders['SERVICES_URLS_MD'] = render_value(service_urls, 'SERVICES_URLS_MD')
    
    # Create blog links
    blog_topics = business_data.get('BLOG_TOPICS', [])
    blog_links = [f"/our-blog/{topic.lower().replace(' ', '-').replace(',', '').replace('&', 'and')}/" for topic in blog_topics]
    placeholders['BLOG_LINKS_MD'] = render_value(blog_links, 'BLOG_LINKS_MD')
    
    # Contact info - handle both uppercase and lowercase keys
    contact = business_data.get('CONTACT', {})
    phone = contact.get('PHONE', contact.get('phone', ''))
    email = contact.get('EMAIL', contact.get('email', ''))
    placeholders['CONTACT_MD'] = business_data.get('CONTACT_MD', f"Phone: {phone} | Email: {email}")
    
    # Arrays for schema
    placeholders['LOCATIONS_ARRAY'] = business_data.get('LOCATIONS_ARRAY', business_data.get('LOCATIONS', []))
    
    # Handle SERVICES_ARRAY - use flattened list if available
    if 'ALL_SERVICES' in business_data:
        placeholders['SERVICES_ARRAY'] = business_data['ALL_SERVICES']
    elif 'SERVICES_ARRAY' in business_data:
        placeholders['SERVICES_ARRAY'] = business_data['SERVICES_ARRAY']
    else:
        services = business_data.get('SERVICES', [])
        if services and isinstance(services[0], dict):
            # Extract service names from hierarchical structure
            service_names = [s.get('NAME', '') for s in services]
            placeholders['SERVICES_ARRAY'] = service_names
        else:
            placeholders['SERVICES_ARRAY'] = services
    
    # Social media profiles
    social_media = business_data.get('SOCIAL_MEDIA', {})
    social_profiles = []
    for platform, data in social_media.items():
        if isinstance(data, dict) and data.get('URL'):
            social_profiles.append(data['URL'])
        elif isinstance(data, str) and data:
            social_profiles.append(data)
    placeholders['SOCIAL_PROFILES_ARRAY'] = business_data.get('SOCIAL_PROFILES_ARRAY', social_profiles)
    
    # Area served and language
    locations = business_data.get('LOCATIONS', [])
    if locations and isinstance(locations[0], dict):
        # Handle dictionary locations (CITY-STATE format)
        area_served = []
        for loc in locations:
            city = loc.get('CITY', '')
            state = loc.get('STATE', '')
            if city and state:
                area_served.append(f"{city}, {state}")
            elif city:
                area_served.append(city)
            elif state:
                area_served.append(state)
        placeholders['AREA_SERVED'] = business_data.get('AREA_SERVED', ', '.join(area_served))
    else:
        placeholders['AREA_SERVED'] = business_data.get('AREA_SERVED', ', '.join(str(loc) for loc in locations))
    
    placeholders['AVAILABLE_LANGUAGE'] = business_data.get('AVAILABLE_LANGUAGE', 'English')
    
    return placeholders


# -----------------------------
# Data Generation Functions
# -----------------------------

def generate_blog_posts(business_data):
    """Generate blog-posts.json stubs from business.yaml
    
    NOTE: Blog post categories now use CORE_SERVICES as categories.
    Each blog post is assigned to a service category.
    Blog posts are accessed directly via /{slug}/ not /{category}/{slug}/
    """
    output_path = os.path.join(script_dir, "data/blog-posts.json")
    
    blog_topics = business_data.get('BLOG_TOPICS', [])
    business_name = business_data.get('BUSINESS_NAME', 'Our Company')
    primary_keyword = business_data.get('PRIMARY_KEYWORD', 'Services')
    core_services = business_data.get('CORE_SERVICES', [primary_keyword])
    
    blog_posts = []
    all_tags = set()
    
    # Create categories from core services
    categories = []
    for service in core_services:
        categories.append({
            "slug": service.lower().replace(' ', '-'),
            "name": service,
            "description": f"Tips and guides for {service.lower()}"
        })
    
    # If no core services, create one from primary keyword
    if not categories:
        categories.append({
            "slug": primary_keyword.lower().replace(' ', '-'),
            "name": primary_keyword,
            "description": f"Tips and guides for {primary_keyword.lower()}"
        })
    
    for i, topic in enumerate(blog_topics):
        slug = topic.lower().replace(' ', '-').replace(',', '').replace('&', 'and')
        
        # Assign to a category (cycle through services)
        category_index = i % len(categories)
        category = categories[category_index]
        
        # Create tags for this post
        post_tags = [slug, category['name'].lower(), primary_keyword.lower()]
        all_tags.update(post_tags)
        
        blog_posts.append({
            "id": slug,
            "slug": slug,
            "title": topic,
            "excerpt": f"Expert advice and tips about {topic.lower()}. Learn from our professional team's experience in the industry.",
            "content": f"# {topic}\n\nComprehensive guide to {topic.lower()}. Contact {business_name} for professional {primary_keyword.lower()}.\n\n[Content to be added]",
            "date": "2024-01-01",
            "publishedAt": "2024-01-01",
            "updatedAt": "2024-01-01",
            "author": {
                "name": business_name,
                "bio": f"Professional {primary_keyword.lower()} experts",
                "avatar": "/assets/config/logo.png"
            },
            "category": category,
            "tags": list(post_tags),
            "image": {
                "url": "/assets/images/portfolio/la-marque-garage-door-center-49.webp",
                "alt": topic,
                "width": 1200,
                "height": 630
            },
            "readTime": "5 min read",
            "featured": i == 0,
            "status": "published",
            "seo": {
                "metaTitle": f"{topic} | {business_name}",
                "metaDescription": f"Expert advice about {topic.lower()}. Professional {primary_keyword.lower()} tips and guides.",
                "keywords": f"{topic.lower()}, {category['name'].lower()}, {primary_keyword.lower()}",
                "canonical": f"/{slug}/"  # Blog posts are now at /{slug}/ directly
            },
            "keywords": list(post_tags),
            "highlights": [f"{category['name']} tips", f"{topic}", "expert advice"]
        })
    
    # Create output data with categories, tags, and blog posts
    output_data = {
        "categories": categories,
        "tags": sorted(list(all_tags)),
        "blogPosts": blog_posts
    }
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2)
    
    print(f"✅ Generated: {output_path} (categories based on CORE_SERVICES, posts at /{{slug}}/)")

def generate_faqs(business_data):
    """Generate faq.json from business.yaml"""
    output_path = os.path.join(script_dir, "data/faq.json")
    
    business_name = business_data.get('BUSINESS_NAME', 'Our Company')
    locations = business_data.get('LOCATIONS_ARRAY', [])
    service_areas = ', '.join(locations[:4]) if len(locations) > 4 else ', '.join(locations)
    contact = business_data.get('CONTACT', {})
    phone = contact.get('PHONE', '')
    core_services = business_data.get('CORE_SERVICES', [])
    
    faqs = [
        {
            "id": 1,
            "category": "General",
            "question": "Cilat zona mbuloni?",
            "answer": f"Ne me krenari u shërbejmë {service_areas}, së bashku me zonat përreth. Shërbimet tona profesionale janë të disponueshme në të gjitha këto komunitete."
        },
        {
            "id": 2,
            "category": "General",
            "question": "Si mund t'ju kontaktoj?",
            "answer": f"Ju mund të na kontaktoni në {phone} ose të na dërgoni email në {contact.get('EMAIL', '')}. Ne jemi në dispozicion {business_data.get('HOURS', {}).get('MONDAY', '7 ditë në javë')}."
        },
        {
            "id": 3,
            "category": "Services",
            "question": "Çfarë shërbimesh ofroni?",
            "answer": f"Ne ofrojmë {', '.join(core_services)}. Na kontaktoni për një konsultim falas për të diskutuar nevojat tuaja specifike."
        },
        {
            "id": 4,
            "category": "Services",
            "question": "A ofroni vlerësime falas?",
            "answer": f"Po, ne ofrojmë vlerësime plotësisht falas dhe pa detyrime për të gjitha shërbimet tona. Na kontaktoni në {phone} për të caktuar vlerësimin tuaj."
        },
        {
            "id": 5,
            "category": "Pricing",
            "question": "Sa kushtojnë shërbimet tuaja?",
            "answer": "Çmimi ndryshon në varësi të fushëveprimit të punës, materialeve të nevojshme dhe kërkesave specifike. Ne ofrojmë çmime transparente, paraprake pa tarifa të fshehura. Na kontaktoni për një vlerësim falas."
        },
        {
            "id": 6,
            "category": "Scheduling",
            "question": "Sa shpejt mund të filloni një projekt?",
            "answer": f"Ne ofrojmë shërbim në të njëjtën ditë për riparime emergjente. Për instalime dhe projekte më të mëdha, zakonisht mund të caktojmë brenda pak ditësh. Telefononi {phone} për të kontrolluar disponueshmërinë aktuale."
        }
    ]
    
    output_data = {"faqs": faqs}
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2)
    
    print(f"✅ Generated: {output_path}")

def generate_portfolio(business_data):
    """Generate portfolio.json from business.yaml"""
    output_path = os.path.join(script_dir, "data/portfolio.json")
    
    business_name = business_data.get('BUSINESS_NAME', 'Our Company')
    locations = business_data.get('LOCATIONS', [])
    core_services = business_data.get('CORE_SERVICES', [])
    
    # Create sample projects for each core service
    projects = []
    project_id = 1
    
    for i, service in enumerate(core_services[:5]):  # Limit to 5 services
        # Get a city for this project
        city_data = locations[i % len(locations)] if locations else {"CITY": "Local Area", "STATE": "TX"}
        city = city_data.get('CITY', 'Local Area') if isinstance(city_data, dict) else city_data
        state = city_data.get('STATE', 'TX') if isinstance(city_data, dict) else 'TX'
        
        projects.append({
            "id": project_id,
            "title": f"Professional {service} Project",
            "category": service,
            "image": "/assets/images/portfolio/la-marque-garage-door-center-17.webp",
            "date": "2024",
            "location": f"{city}, {state}",
            "description": f"Complete {service.lower()} with professional installation and quality materials.",
            "features": ["Professional Installation", "Quality Materials", "Expert Service", "Customer Satisfaction"],
            "client": "Residential Client" if i % 2 == 0 else "Commercial Client",
            "duration": "1-2 Days",
            "tags": [service, city, state]
        })
        project_id += 1
    
    # Add portfolio stats
    stats = {
        "totalProjects": 500,
        "happyClients": 450,
        "yearsExperience": 10,
        "averageRating": 4.9
    }
    
    output_data = {
        "stats": stats,
        "projects": projects
    }
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2)
    
    print(f"✅ Generated: {output_path}")

def generate_services_json(business_data):
    """Generate data/services.json from business.yaml"""
    output_path = os.path.join(script_dir, "data/services.json")
    
    business_name = business_data.get('BUSINESS_NAME', 'Example Company')
    primary_keyword = business_data.get('PRIMARY_KEYWORD', 'Professional Services')
    services = business_data.get('SERVICES', [])
    locations = business_data.get('LOCATIONS_ARRAY', [])
    primary_city = locations[0] if locations else "Example City, ST"
    
    services_array = []
    
    for service in services:
        if not isinstance(service, dict):
            continue
            
        service_name = service.get('NAME', '')
        service_slug = service.get('URL', '').strip('/').replace('/', '-')
        service_desc = service.get('DESCRIPTION', f'Professional {service_name} solutions')
        sub_services = service.get('SUB_SERVICES', [])
        
        # Create core service entry
        core_service = {
            "id": service_slug,
            "name": service_name,
            "slug": service_slug,
            "description": service_desc,
            "content": f"Our {service_name} provide exceptional quality and reliability for both residential and commercial clients.\\n\\n## Our Process\\n\\n### 1. Consultation\\n- Free consultation\\n- Custom recommendations\\n- Detailed quote and timeline\\n\\n### 2. Professional Service\\n- Expert team\\n- Quality materials\\n- Precise execution\\n\\n### 3. Follow-up Support\\n- Thorough quality check\\n- Operation demonstration\\n- Warranty and maintenance guidance",
            "category": "Core Services",
            "duration": "1-2 days",
            "priceRange": "Contact for quote",
            "isCore": True,
            "parentService": None,
            "features": [
                "Free Consultation",
                "Professional Service",
                "Quality Guarantee",
                "Warranty Included",
                "Expert Team"
            ],
            "seo": {
                "metaTitle": f"{service_name} in {primary_city} | {business_name}",
                "metaDescription": f"Professional {service_name.lower()} in {primary_city}. Expert service, quality products & satisfaction guaranteed. Free consultation!",
                "keywords": f"{service_name.lower()}, {primary_keyword.lower()}, {primary_city}"
            },
                "featuredImage": "/assets/images/portfolio/la-marque-garage-door-center-17.webp",
                "gallery": [
                    "/assets/images/portfolio/la-marque-garage-door-center-18.webp",
                    "/assets/images/portfolio/la-marque-garage-door-center-19.webp",
                    "/assets/images/portfolio/la-marque-garage-door-center-20.webp"
                ],
            "contentVariations": {
                "opening": f"Transform your property with professional {service_name.lower()}. Our expert team provides quality solutions tailored to your specific needs.",
                "whyChoose": f"We bring years of experience and expertise to every {service_name.lower()} project. Our commitment to quality and customer satisfaction sets us apart.",
                "closing": f"Ready to get started? Let's discuss your {service_name.lower()} needs. Schedule your free consultation today."
            },
            "uniqueFaqs": [
                {
                    "question": f"What does {service_name.lower()} include?",
                    "answer": f"Our {service_name.lower()} includes consultation, professional service delivery, quality materials, and follow-up support. We provide comprehensive solutions tailored to your needs."
                },
                {
                    "question": f"How long does {service_name.lower()} take?",
                    "answer": "Most projects are completed within 1-2 days, depending on scope and complexity. We'll provide an accurate timeline during your consultation."
                }
            ]
        }
        
        services_array.append(core_service)
        
        # Create sub-service entries
        for sub_service in sub_services:
            if not isinstance(sub_service, dict):
                continue
                
            sub_name = sub_service.get('NAME', '')
            sub_slug = sub_service.get('URL', '').strip('/').replace('/', '-')
            
            sub_service_entry = {
                "id": sub_slug,
                "name": sub_name,
                "slug": sub_slug,
                "description": f"Expert {sub_name.lower()} services. Professional quality and customer satisfaction guaranteed.",
                "content": f"Our {sub_name} services provide specialized solutions with professional expertise.\\n\\n## Service Features\\n\\n- Professional team\\n- Quality materials\\n- Expert execution\\n- Customer satisfaction guarantee",
                "category": f"{service_name} Services",
                "duration": "1 day",
                "priceRange": "Contact for quote",
                "isCore": False,
                "parentService": service_slug,
                "features": [
                    "Expert Service",
                    "Quality Materials",
                    "Professional Team",
                    "Satisfaction Guarantee"
                ],
                "seo": {
                    "metaTitle": f"{sub_name} | {business_name}",
                    "metaDescription": f"Expert {sub_name.lower()} services. Professional quality and customer satisfaction guaranteed. Free consultation available!",
                    "keywords": f"{sub_name.lower()}, {service_name.lower()}, {primary_keyword.lower()}"
                },
                "featuredImage": "/assets/images/portfolio/la-marque-garage-door-center-17.webp",
                "gallery": [
                    "/assets/images/portfolio/la-marque-garage-door-center-18.webp",
                    "/assets/images/portfolio/la-marque-garage-door-center-19.webp"
                ],
                "contentVariations": {
                    "opening": f"Specialized {sub_name.lower()} services for your needs. Our expert team delivers quality solutions with professional care.",
                    "whyChoose": f"Our {sub_name.lower()} services combine expertise with customer-focused solutions. We're committed to your satisfaction.",
                    "closing": f"Get started with {sub_name.lower()} today. Contact us for your free consultation."
                },
                "uniqueFaqs": [
                    {
                        "question": f"What makes your {sub_name.lower()} different?",
                        "answer": f"Our {sub_name.lower()} services combine professional expertise with personalized attention. We focus on quality and customer satisfaction in every project."
                    }
                ]
            }
            
            services_array.append(sub_service_entry)
    
    output_data = {"services": services_array}
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2)
    
    print(f"✅ Generated: {output_path}")

def generate_business_config(business_data):
    """Generate lib/business-config.ts from business.yaml"""
    config_path = os.path.join(script_dir, "lib/business-config.ts")
    
    business_name = business_data.get('BUSINESS_NAME', 'Our Company')
    website_url = business_data.get('WEBSITE_URL', 'https://example.com')
    logo_url = business_data.get('LOGO_URL', f'{website_url}/logo.png')
    tagline = business_data.get('TAGLINE', 'Your Trusted Service Provider')
    primary_keyword = business_data.get('PRIMARY_KEYWORD', 'Services')
    cta_text = business_data.get('CTA_TEXT', 'Na kontaktoni sot!')
    tone = business_data.get('TONE', 'Professional')
    
    # Categories
    categories = business_data.get('CATEGORIES', {})
    primary_category = categories.get('PRIMARY', 'Service Business')
    secondary_categories = categories.get('SECONDARY', [])
    
    # Services
    services = business_data.get('SERVICES', [])
    
    # Locations
    locations = business_data.get('LOCATIONS', [])
    
    # Contact
    contact = business_data.get('CONTACT', {})
    
    # Hours
    hours = business_data.get('HOURS', {})
    
    # Google Maps
    google_maps = business_data.get('GOOGLE_MAPS', {})
    
    # Social Media
    social_media = business_data.get('SOCIAL_MEDIA', {})
    
    # Blog Topics
    blog_topics = business_data.get('BLOG_TOPICS', [])
    
    # Meta
    meta = business_data.get('META', {})
    
    # Format services for TypeScript
    def format_service(service):
        if isinstance(service, dict):
            name = service.get('NAME', '')
            url = service.get('URL', '')
            sub_services = service.get('SUB_SERVICES', [])
            
            sub_services_str = ""
            if sub_services:
                sub_items = []
                for sub in sub_services:
                    sub_name = sub.get('NAME', '')
                    sub_url = sub.get('URL', '')
                    sub_items.append(f'      {{ name: "{sub_name}", url: "{sub_url}" }}')
                sub_services_str = f",\n    subServices: [\n" + ",\n".join(sub_items) + "\n    ]"
            
            return f'  {{\n    name: "{name}",\n    url: "{url}"{sub_services_str},\n  }}'
        return ''
    
    services_ts = ",\n".join([format_service(s) for s in services])
    
    # Format locations for TypeScript
    def format_location(loc):
        if isinstance(loc, dict):
            city = loc.get('CITY', '')
            state = loc.get('STATE', '')
            url = loc.get('URL', f"/{city.lower().replace(' ', '-')}-{state.lower()}/")
            return f'  {{ city: "{city}", state: "{state}", url: "{url}" }}'
        return ''
    
    locations_ts = ",\n".join([format_location(loc) for loc in locations])
    
    # Format social media
    social_media_entries = []
    for platform, data in social_media.items():
        if isinstance(data, dict) and data.get('URL'):
            url = data['URL']
            social_media_entries.append(f'  {platform.lower()}: "{url}"')
    social_media_ts = ",\n".join(social_media_entries)
    
    # Format secondary categories
    secondary_cat_str = ",\n    ".join([f'"{cat}"' for cat in secondary_categories])
    
    # Format blog topics
    blog_topics_str = ",\n  ".join([f'"{topic}"' for topic in blog_topics])
    
    # Generate the TypeScript file
    ts_content = f'''/**
 * Business Configuration - Single Source of Truth
 * This file is AUTO-GENERATED from business.yaml
 * Run `python generate_rules.py` to regenerate
 * DO NOT EDIT THIS FILE DIRECTLY - Edit business.yaml instead
 */

export interface ServiceItem {{
  name: string;
  url: string;
  description?: string;
  subServices?: ServiceItem[];
}}

export interface Location {{
  city: string;
  state: string;
  url?: string;
}}

export interface ContactInfo {{
  address: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  areaCode: string;
  phone: string;
  email: string;
  addressVisibility: 'HIDDEN' | 'VISIBLE';
}}

export interface SocialMedia {{
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  pinterest?: string;
  nextdoor?: string;
  yelp?: string;
  instagram?: string;
  youtube?: string;
}}

export interface GoogleMaps {{
  shortLink: string;
  fullUrl: string;
  embedCode: string;
  latitude: string;
  longitude: string;
}}

export interface BusinessHours {{
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}}

// ==========================================
// BUSINESS INFORMATION
// ==========================================
export const BUSINESS_INFO = {{
  name: "{business_name}",
  websiteUrl: "{website_url}",
  tone: "{tone}",
  logoUrl: "{logo_url}",
  tagline: "{tagline}",
  primaryKeyword: "{primary_keyword}",
  ctaText: "{cta_text}",
}} as const;

// ==========================================
// BUSINESS CATEGORIES
// ==========================================
export const BUSINESS_CATEGORIES = {{
  primary: "{primary_category}",
  secondary: [
    {secondary_cat_str}
  ],
}} as const;

// ==========================================
// CORE SERVICES
// ==========================================
export const CORE_SERVICES: ServiceItem[] = [
{services_ts}
];

// Flattened arrays for quick access
export const CORE_SERVICE_NAMES = CORE_SERVICES.map(s => s.name);
export const CORE_SERVICE_URLS = CORE_SERVICES.map(s => s.url);

// All services including sub-services
export const ALL_SERVICES = CORE_SERVICES.flatMap(service => [
  {{ name: service.name, url: service.url }},
  ...(service.subServices || []),
]);

// ==========================================
// SERVICE AREAS / LOCATIONS
// ==========================================
export const LOCATIONS: Location[] = [
{locations_ts}
];

// Helper to get top locations (first 4)
export const TOP_LOCATIONS = LOCATIONS.slice(0, 4);

// Helper to format location string
export const formatLocation = (location: Location): string => 
  `${{location.city}}, ${{location.state}}`;

// ==========================================
// CONTACT INFORMATION
// ==========================================
export const CONTACT: ContactInfo = {{
  address: "{contact.get('ADDRESS', '')}",
  street: "{contact.get('STREET', '')}",
  city: "{contact.get('CITY', '')}",
  state: "{contact.get('STATE', '')}",
  zip: "{contact.get('ZIP', '')}",
  areaCode: "{contact.get('AREA_CODE', '')}",
  phone: "{contact.get('PHONE', '')}",
  email: "{contact.get('EMAIL', '')}",
  addressVisibility: "{contact.get('ADDRESS_VISIBILITY', 'HIDDEN')}", // SAB (Service Area Business)
}};

// ==========================================
// BUSINESS HOURS
// ==========================================
export const BUSINESS_HOURS: BusinessHours = {{
  monday: "{hours.get('MONDAY', '08:00 - 17:00')}",
  tuesday: "{hours.get('TUESDAY', '08:00 - 17:00')}",
  wednesday: "{hours.get('WEDNESDAY', '08:00 - 17:00')}",
  thursday: "{hours.get('THURSDAY', '08:00 - 17:00')}",
  friday: "{hours.get('FRIDAY', '08:00 - 17:00')}",
  saturday: "{hours.get('SATURDAY', '08:00 - 17:00')}",
  sunday: "{hours.get('SUNDAY', 'Mbyllur')}",
}};

// Helper to format business hours for schema
export const BUSINESS_HOURS_SCHEMA = "{business_data.get('BUSINESS_HOURS_SCHEMA', 'Mo-Fr 09:00-17:00')}";

// ==========================================
// GOOGLE MAPS
// ==========================================
export const GOOGLE_MAPS: GoogleMaps = {{
  shortLink: "{google_maps.get('SHORT_LINK', '')}",
  fullUrl: "{google_maps.get('FULL_URL', '')}",
  embedCode: `{google_maps.get('EMBED_CODE', '')}`,
  latitude: "{google_maps.get('LATITUDE', '0')}",
  longitude: "{google_maps.get('LONGITUDE', '0')}",
}};

// ==========================================
// SOCIAL MEDIA
// ==========================================
export const SOCIAL_MEDIA: SocialMedia = {{
{social_media_ts}
}};

// Filter out undefined social media links
export const ACTIVE_SOCIAL_MEDIA = Object.entries(SOCIAL_MEDIA)
  .filter(([_, url]) => url)
  .reduce((acc, [key, url]) => ({{ ...acc, [key]: url }}), {{}}) as SocialMedia;

// ==========================================
// BLOG TOPICS
// ==========================================
export const BLOG_TOPICS = [
  {blog_topics_str}
] as const;

// ==========================================
// META INFORMATION
// ==========================================
export const META = {{
  title: "{meta.get('title', '')}",
  description: "{meta.get('description', '')}",
  keywords: "{meta.get('keywords', '')}",
}} as const;

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get services formatted for navigation/footer
 */
export const getServicesForNavigation = () => {{
  return CORE_SERVICES.map(service => ({{
    name: service.name,
    href: service.url,
  }}));
}};

/**
 * Get locations formatted for navigation/footer
 */
export const getLocationsForNavigation = (limit?: number) => {{
  const locs = limit ? LOCATIONS.slice(0, limit) : LOCATIONS;
  return locs.map(location => ({{
    name: formatLocation(location),
    href: location.url || `/${{location.city.toLowerCase().replace(/\\s+/g, '-')}}-${{location.state.toLowerCase()}}/`,
  }}));
}};

/**
 * Get company links for footer/navigation
 */
export const getCompanyLinks = () => [
  {{ name: "Rreth Nesh", href: "/rreth-nesh/" }},
  {{ name: "Blogu", href: "/blog/" }},
  {{ name: "Kontakti", href: "/kontakti/" }},
  {{ name: "Portofolio", href: "/galeria-e-projekteve/" }},
  {{ name: "Zonat e Shërbimit", href: "/zonat-e-sherbimit/" }},
];

/**
 * Get legal links for footer
 */
export const getLegalLinks = () => [
  {{ name: "Politika e Privatësisë", href: "/politika-e-privatesise/" }},
  {{ name: "Kushtet e Përdorimit", href: "/kushtet-e-perdorimit/" }},
];

/**
 * Format phone number for display (555-123-4567)
 */
export const formatPhoneDisplay = (phone: string): string => {{
  const digits = phone.replace(/\\D/g, '');
  if (digits.length === 10) {{
    return `${{digits.slice(0, 3)}}-${{digits.slice(3, 6)}}-${{digits.slice(6)}}`;
  }}
  if (digits.length === 11 && digits.startsWith('1')) {{
    const withoutCountryCode = digits.slice(1);
    return `${{withoutCountryCode.slice(0, 3)}}-${{withoutCountryCode.slice(3, 6)}}-${{withoutCountryCode.slice(6)}}`;
  }}
  return phone;
}};

/**
 * Format phone number for tel: links (+15551234567)
 */
export const formatPhoneTel = (phone: string): string => {{
  const digits = phone.replace(/\\D/g, '');
  if (digits.length === 10) {{
    return `+1${{digits}}`;
  }}
  if (digits.length === 11 && digits.startsWith('1')) {{
    return `+${{digits}}`;
  }}
  if (phone.startsWith('+')) {{
    return phone;
  }}
  return `+1${{digits}}`;
}};

export const getPhoneDisplay = (): string => formatPhoneDisplay(CONTACT.phone);
export const getPhoneTel = (): string => formatPhoneTel(CONTACT.phone);
export const getEmail = (): string => CONTACT.email;
export const getBusinessHours = (): BusinessHours => BUSINESS_HOURS;
export const getBusinessHoursForDay = (day: keyof BusinessHours): string => BUSINESS_HOURS[day];
export const getSocialLinks = (): SocialMedia => ACTIVE_SOCIAL_MEDIA;
export const getSocialLink = (platform: keyof SocialMedia): string | undefined => ACTIVE_SOCIAL_MEDIA[platform];
export const getAddress = (): string => CONTACT.address;
export const getCityState = (): string => `${{CONTACT.city}}, ${{CONTACT.state}}`;
export const getGoogleMapsLink = (): string => GOOGLE_MAPS.shortLink;
export const getGoogleMapsUrl = (): string => GOOGLE_MAPS.fullUrl;
export const getBusinessName = (): string => BUSINESS_INFO.name;
export const getTagline = (): string => BUSINESS_INFO.tagline;
export const getPrimaryKeyword = (): string => BUSINESS_INFO.primaryKeyword;
export const getWebsiteUrl = (): string => BUSINESS_INFO.websiteUrl;
export const getTopLocations = (count: number = 4): Location[] => LOCATIONS.slice(0, count);
export const getLocationsString = (limit?: number): string => {{
  const locs = limit ? LOCATIONS.slice(0, limit) : LOCATIONS;
  return locs.map(loc => formatLocation(loc)).join(', ');
}};
export const getPrimaryLocation = (): Location => LOCATIONS[0];
export const getServiceByName = (serviceName: string): ServiceItem | undefined => {{
  return CORE_SERVICES.find(service => service.name === serviceName);
}};
export const getServiceByUrl = (url: string): ServiceItem | undefined => {{
  return CORE_SERVICES.find(service => service.url === url);
}};
export const getSubServices = (serviceName: string): ServiceItem[] => {{
  const service = getServiceByName(serviceName);
  return service?.subServices || [];
}};
export const servesLocation = (city: string, state?: string): boolean => {{
  if (state) {{
    return LOCATIONS.some(loc => 
      loc.city.toLowerCase() === city.toLowerCase() && 
      loc.state.toLowerCase() === state.toLowerCase()
    );
  }}
  return LOCATIONS.some(loc => loc.city.toLowerCase() === city.toLowerCase());
}};
export const getMetaInfo = () => ({{
  title: META.title,
  description: META.description,
  keywords: META.keywords,
}});
export const getBlogTopics = (): readonly string[] => BLOG_TOPICS;
export const getCopyright = (): string => `© ${{new Date().getFullYear()}} ${{BUSINESS_INFO.name}}. Të gjitha të drejtat e rezervuara.`;
export const getBusinessCategories = () => BUSINESS_CATEGORIES;
export const getBusinessDescription = (): string => {{
  return `Profesionistë në ${{BUSINESS_INFO.primaryKeyword}} që ofrojnë zgjidhje cilësore dhe shërbim të jashtëzakonshëm.`;
}};
export const getContactInfo = () => ({{
  phone: getPhoneDisplay(),
  email: getEmail(),
  address: getAddress(),
}});
export const getSocialLinksFormatted = () => {{
  return Object.entries(ACTIVE_SOCIAL_MEDIA).map(([key, href]) => ({{
    name: key.charAt(0).toUpperCase() + key.slice(1),
    href: href as string,
    key: key as keyof SocialMedia,
  }}));
}};
export const getDefaultAddresses = () => [
  {{
    location: getCityState(),
    address: getAddress(),
  }}
];
export const getDefaultMapLocation = () => ({{
  id: "main-location",
  name: getCityState(),
  address: getAddress(),
  mapEmbed: GOOGLE_MAPS.embedCode.match(/src="([^"]*)"/)?.[1] || "",
  mapTitle: `${{getBusinessName()}} ${{getCityState()}} Location`,
  isMain: true as const,
}});
'''
    
    with open(config_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
    
    print(f"✅ Generated: {config_path}")

def generate_manifest_json(business_data):
    """Generate public/manifest.json from business.yaml"""
    output_path = os.path.join(script_dir, "public/manifest.json")
    
    business_name = business_data.get('BUSINESS_NAME', 'Example Company')
    primary_keyword = business_data.get('PRIMARY_KEYWORD', 'Professional Services')
    meta = business_data.get('META', {})
    locations = business_data.get('LOCATIONS_ARRAY', [])
    primary_city = locations[0] if locations else "Example City, ST"
    
    # Get description
    description = meta.get('description', f"Professional {primary_keyword.lower()} for businesses in {primary_city} and surrounding areas")
    
    # Get categories
    categories = business_data.get('CATEGORIES', {})
    primary_category = categories.get('PRIMARY', 'business')
    category_keywords = [primary_category.lower(), primary_keyword.lower().replace(' ', '_')]
    
    # Create manifest structure
    manifest = {
        "name": f"{business_name} - {primary_keyword}",
        "short_name": business_name,
        "description": description,
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#3B82F6",
        "orientation": "portrait-primary",
        "scope": "/",
        "lang": "en-US",
        "categories": category_keywords,
        "icons": [
            {
                "src": "/assets/config/favicon.ico",
                "sizes": "16x16",
                "type": "image/x-icon",
                "purpose": "maskable any"
            },
            {
                "src": "/assets/config/favicon.ico",
                "sizes": "512x512",
                "type": "image/x-icon",
                "purpose": "maskable any"
            },
            {
                "src": "/assets/config/favicon.ico",
                "sizes": "180x180",
                "type": "image/x-icon"
            },
            {
                "src": "/assets/config/favicon.ico",
                "sizes": "32x32",
                "type": "image/x-icon"
            },
            {
                "src": "/assets/config/favicon.ico",
                "sizes": "16x16",
                "type": "image/x-icon"
            }
        ],
        "screenshots": [
            {
                "src": "/assets/config/favicon.ico",
                "sizes": "1280x720",
                "type": "image/x-icon",
                "form_factor": "wide"
            },
            {
                "src": "/assets/config/favicon.ico",
                "sizes": "750x1334",
                "type": "image/x-icon",
                "form_factor": "narrow"
            }
        ],
        "shortcuts": [
            {
                "name": "Na Kontaktoni",
                "short_name": "Kontakti",
                "description": "Na kontaktoni",
                "url": "/kontakti",
                "icons": [
                    {
                        "src": "/assets/config/favicon.ico",
                        "sizes": "16x16"
                    }
                ]
            },
            {
                "name": "Shërbimet Tona",
                "short_name": "Shërbimet",
                "description": f"Shikoni {primary_keyword.lower()} tona profesionale",
                "url": "/sherbime-elektrike",
                "icons": [
                    {
                        "src": "/assets/config/favicon.ico",
                        "sizes": "16x16"
                    }
                ]
            }
        ]
    }
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    
    print(f"✅ Generated: {output_path}")

def generate_seo_config(business_data):
    """Update siteConfig in lib/seo-config.ts from business.yaml
    
    NOTE: This function ONLY updates siteConfig, NOT seoConfigs.
    The seoConfigs should be manually maintained because they contain
    imports from business-config.ts and complex logic that can't be
    safely generated via regex replacement.
    """
    config_path = os.path.join(script_dir, "lib/seo-config.ts")
    
    # Read existing file
    try:
        with open(config_path, "r", encoding="utf-8") as f:
            file_content = f.read()
    except FileNotFoundError:
        print(f"⚠️  Warning: {config_path} not found, skipping update")
        return
    
    business_name = business_data.get('BUSINESS_NAME', 'Example Company')
    website_url = business_data.get('WEBSITE_URL', 'https://example.com')
    meta = business_data.get('META', {})
    contact = business_data.get('CONTACT', {})
    social_media = business_data.get('SOCIAL_MEDIA', {})
    core_services = business_data.get('CORE_SERVICES', [])
    hours = business_data.get('HOURS', {})
    google_maps = business_data.get('GOOGLE_MAPS', {})
    
    # Format business hours
    monday_hours = hours.get('MONDAY', 'Monday - Friday: 9:00 AM - 6:00 PM')
    
    # Extract social media links
    facebook = social_media.get('FACEBOOK', {}).get('URL', '')
    twitter = social_media.get('TWITTER', {}).get('URL', '')
    linkedin = social_media.get('LINKEDIN', {}).get('URL', '')
    instagram = social_media.get('INSTAGRAM', {}).get('URL', '')
    youtube = social_media.get('YOUTUBE', {}).get('URL', '')
    pinterest = social_media.get('PINTEREST', {}).get('URL', '')
    nextdoor = social_media.get('NEXTDOOR', {}).get('URL', '')
    yelp = social_media.get('YELP', {}).get('URL', '')
    
    # Extract twitter handle
    twitter_handle = twitter.split('/')[-1] if twitter else business_name.lower().replace(' ', '')
    
    # Build social object with only existing links
    social_lines = []
    if facebook:
        social_lines.append(f'    facebook: "{facebook}",')
    if twitter:
        social_lines.append(f'    twitter: "{twitter}",')
        social_lines.append(f'    twitterHandle: "{twitter_handle}",')
    if instagram:
        social_lines.append(f'    instagram: "{instagram}",')
    if linkedin:
        social_lines.append(f'    linkedin: "{linkedin}",')
    if youtube:
        social_lines.append(f'    youtube: "{youtube}",')
    if pinterest:
        social_lines.append(f'    pinterest: "{pinterest}",')
    if nextdoor:
        social_lines.append(f'    nextdoor: "{nextdoor}",')
    if yelp:
        social_lines.append(f'    yelp: "{yelp}",')
    
    # Remove trailing comma from last item
    if social_lines:
        social_lines[-1] = social_lines[-1].rstrip(',')
    
    social_content = '\n'.join(social_lines)
    
    # Build new siteConfig
    new_site_config = f'''export const siteConfig: SiteConfig = {{
  name: BUSINESS_INFO.name,
  url: BUSINESS_INFO.websiteUrl || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '{website_url}'),
  description: `Expert ${{BUSINESS_INFO.primaryKeyword.toLowerCase()}} in ${{CONTACT.city}}, ${{CONTACT.state}}. Quality solutions and customer satisfaction guaranteed. ${{BUSINESS_INFO.ctaText}}`,
  logo: BUSINESS_INFO.logoUrl || "/assets/config/logo.png",
  favicon: "/assets/config/favicon.ico",
  themeColor: "#3B82F6",
  author: BUSINESS_INFO.name,
  copyright: getCopyright(),
  social: {{
    facebook: SOCIAL_MEDIA.facebook,
    twitter: SOCIAL_MEDIA.twitter,
    twitterHandle: SOCIAL_MEDIA.twitter?.split('/').pop(),
    instagram: SOCIAL_MEDIA.instagram,
    linkedin: SOCIAL_MEDIA.linkedin,
    pinterest: SOCIAL_MEDIA.pinterest,
    yelp: SOCIAL_MEDIA.yelp,
    nextdoor: SOCIAL_MEDIA.nextdoor
  }},
  contact: {{
    phone: CONTACT.phone,
    email: CONTACT.email,
    address: CONTACT.street,
    city: CONTACT.city,
    state: CONTACT.state,
    zipCode: CONTACT.zip,
    country: "Kosovë"
  }},
  businessHours: BUSINESS_HOURS_SCHEMA,
  services: CORE_SERVICE_NAMES,
  coordinates: {{
    latitude: GOOGLE_MAPS.latitude,
    longitude: GOOGLE_MAPS.longitude
  }}
}};'''
    
    # Replace siteConfig using a more careful regex that matches balanced braces
    # Find the start of siteConfig
    site_config_start = file_content.find('export const siteConfig: SiteConfig = {')
    if site_config_start == -1:
        print("⚠️  Warning: Could not find siteConfig in file")
        return
    
    # Find the closing of siteConfig by counting braces
    brace_count = 0
    site_config_end = site_config_start
    in_site_config = False
    
    for i in range(site_config_start, len(file_content)):
        char = file_content[i]
        if char == '{':
            brace_count += 1
            in_site_config = True
        elif char == '}':
            brace_count -= 1
            if in_site_config and brace_count == 0:
                # Found the closing brace, look for the semicolon
                site_config_end = i + 1
                if site_config_end < len(file_content) and file_content[site_config_end] == ';':
                    site_config_end += 1
                break
    
    if site_config_end > site_config_start:
        # Replace the old siteConfig with the new one
        file_content = file_content[:site_config_start] + new_site_config + file_content[site_config_end:]
        
        # Write updated content back
        with open(config_path, "w", encoding="utf-8") as f:
            f.write(file_content)
        
        print(f"✅ Updated: {config_path} (siteConfig only - seoConfigs are maintained manually)")
    else:
        print("⚠️  Warning: Could not properly parse siteConfig structure")

# ========================================================================
# IMAGE PROCESSING FUNCTIONS
# ========================================================================

def sanitize_filename(filename: str) -> str:
    """
    Sanitize filename by removing spaces and special characters.
    Example: "My Image File!.jpg" -> "my-image-file.jpg"
    """
    name, ext = os.path.splitext(filename)
    name = name.lower()
    name = name.replace(' ', '-').replace('_', '-')
    name = re.sub(r'[^a-z0-9-]', '', name)
    name = re.sub(r'-+', '-', name)
    name = name.strip('-')
    return f"{name}{ext.lower()}"

def find_image_files(directories: List[str]) -> List[Path]:
    """Find all image files (jpg, jpeg, png, gif) in specified directories."""
    image_extensions = ['*.jpg', '*.jpeg', '*.png', '*.gif', '*.JPG', '*.JPEG', '*.PNG', '*.GIF']
    all_images = []
    
    for directory in directories:
        dir_path = Path(directory)
        if not dir_path.exists():
            print(f"⚠️  Directory not found: {directory}")
            continue
            
        for ext in image_extensions:
            all_images.extend(dir_path.glob(ext))
            all_images.extend(dir_path.rglob(ext))
    
    return list(set(all_images))

def find_source_files(base_dir: str = '.', exclude_dirs: List[str] = None) -> List[Path]:
    """Find all source code files that might contain image references."""
    if exclude_dirs is None:
        exclude_dirs = ['node_modules', '.next', '.git', 'dist', 'build', 'out', 'public/assets/config']
    
    source_extensions = ['*.tsx', '*.ts', '*.jsx', '*.js', '*.json', '*.css', '*.scss', '*.md']
    source_files = []
    base_path = Path(base_dir)
    
    for ext in source_extensions:
        for file_path in base_path.rglob(ext):
            if any(excluded in file_path.parts for excluded in exclude_dirs):
                continue
            source_files.append(file_path)
    
    return source_files

def update_source_references(source_files: List[Path], filename_mapping: Dict[str, str]) -> Dict[str, int]:
    """Update image references in source files."""
    stats = {'files_modified': 0, 'total_replacements': 0}
    
    for source_file in source_files:
        try:
            with open(source_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            replacements_in_file = 0
            
            for old_name, new_name in filename_mapping.items():
                patterns = [
                    (old_name, new_name),
                    (old_name.replace(' ', '%20'), new_name),
                ]
                
                for old_pattern, new_pattern in patterns:
                    if old_pattern in content:
                        count = content.count(old_pattern)
                        content = content.replace(old_pattern, new_pattern)
                        replacements_in_file += count
            
            if content != original_content:
                with open(source_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                stats['files_modified'] += 1
                stats['total_replacements'] += replacements_in_file
                print(f"  ✓ Updated {replacements_in_file} reference(s) in: {source_file.relative_to('.')}")
                
        except Exception as e:
            print(f"  ✗ Error processing {source_file}: {str(e)}")
    
    return stats

def rename_and_convert_images(image_files: List[Path], quality: int = 85, convert_to_webp: bool = True, delete_original: bool = False) -> Tuple[Dict[str, str], Dict[str, int]]:
    """Rename image files and optionally convert to WebP."""
    if not PIL_AVAILABLE:
        print("❌ PIL (Pillow) is not installed. Cannot convert images.")
        print("   Install with: pip install Pillow")
        return {}, {'renamed': 0, 'converted': 0, 'skipped': 0, 'failed': 0}
    
    filename_mapping = {}
    stats = {'renamed': 0, 'converted': 0, 'skipped': 0, 'failed': 0}
    
    for idx, image_file in enumerate(image_files, 1):
        old_filename = image_file.name
        new_filename = sanitize_filename(old_filename)
        
        if old_filename == new_filename and not convert_to_webp:
            print(f"[{idx}/{len(image_files)}] Skipped (already clean): {old_filename}")
            stats['skipped'] += 1
            continue
        
        try:
            new_filepath = image_file.parent / new_filename
            
            # Step 1: Rename the file if needed
            if old_filename != new_filename:
                if new_filepath.exists() and new_filepath != image_file:
                    print(f"[{idx}/{len(image_files)}] ⚠️  Target exists, skipping rename: {old_filename} -> {new_filename}")
                    stats['skipped'] += 1
                    continue
                
                os.rename(image_file, new_filepath)
                filename_mapping[old_filename] = new_filename
                print(f"[{idx}/{len(image_files)}] Renamed: {old_filename} -> {new_filename}")
                stats['renamed'] += 1
                image_file = new_filepath
            
            # Step 2: Convert to WebP if requested
            if convert_to_webp:
                webp_filename = f"{Path(new_filename).stem}.webp"
                webp_filepath = image_file.parent / webp_filename
                
                if webp_filepath.exists():
                    print(f"  → WebP already exists: {webp_filename}")
                else:
                    img = Image.open(image_file)
                    
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    elif img.mode == 'LA':
                        img = img.convert('RGBA')
                    elif img.mode not in ('RGB', 'RGBA', 'L'):
                        img = img.convert('RGB')
                    
                    if img.mode == 'RGBA':
                        img.save(webp_filepath, 'WEBP', quality=quality, method=6, lossless=False)
                    else:
                        img.save(webp_filepath, 'WEBP', quality=quality, method=6)
                    
                    original_size = os.path.getsize(image_file) / 1024
                    webp_size = os.path.getsize(webp_filepath) / 1024
                    savings = ((original_size - webp_size) / original_size) * 100
                    
                    print(f"  → Converted to WebP: {webp_filename} ({original_size:.1f}KB -> {webp_size:.1f}KB, saved {savings:.1f}%)")
                    stats['converted'] += 1
                    
                    if old_filename in filename_mapping:
                        filename_mapping[old_filename] = webp_filename
                    else:
                        filename_mapping[old_filename] = webp_filename
                    
                    if delete_original:
                        os.remove(image_file)
                        print(f"  → Deleted original: {new_filename}")
            
        except Exception as e:
            stats['failed'] += 1
            print(f"[{idx}/{len(image_files)}] ✗ Failed to process {old_filename}: {str(e)}")
    
    return filename_mapping, stats

def process_images(
    image_directories: List[str],
    source_base_dir: str = '.',
    quality: int = 85,
    convert_to_webp: bool = True,
    delete_original: bool = False,
    update_references: bool = True
):
    """Main function to process images: find, rename, update references, and convert."""
    print("="*80)
    print("IMAGE PROCESSING")
    print("="*80)
    print()
    
    # Step 1: Find all image files
    print("📁 Step 1: Finding image files...")
    image_files = find_image_files(image_directories)
    print(f"   Found {len(image_files)} image files\n")
    
    if not image_files:
        print("No image files found. Exiting.")
        return
    
    # Step 2: Rename and convert images
    print("🔄 Step 2: Renaming and converting images...")
    filename_mapping, rename_stats = rename_and_convert_images(
        image_files,
        quality=quality,
        convert_to_webp=convert_to_webp,
        delete_original=delete_original
    )
    print()
    
    # Step 3: Update source code references
    if update_references and filename_mapping:
        print("📝 Step 3: Updating source code references...")
        source_files = find_source_files(source_base_dir)
        print(f"   Found {len(source_files)} source files to check")
        update_stats = update_source_references(source_files, filename_mapping)
        print()
    else:
        update_stats = {'files_modified': 0, 'total_replacements': 0}
    
    # Print final summary
    print("\n" + "="*80)
    print("IMAGE PROCESSING COMPLETE")
    print("="*80)
    print(f"Images renamed:          {rename_stats['renamed']}")
    print(f"Images converted:        {rename_stats['converted']}")
    print(f"Images skipped:          {rename_stats['skipped']}")
    print(f"Images failed:           {rename_stats['failed']}")
    print(f"Source files modified:   {update_stats['files_modified']}")
    print(f"Total replacements:      {update_stats['total_replacements']}")
    print("="*80)

# ========================================================================
# MAIN EXECUTION FUNCTIONS
# ========================================================================

def generate_rules_and_data():
    """Generate all rules and data files from business.yaml"""
    # -----------------------------
    # Process all templates
    # -----------------------------
    templates_processed = 0

    # Check if templates folder exists
    if not os.path.exists(templates_folder):
        print(f"❌ Templates folder not found: {templates_folder}")
        print("Please ensure templates are in the correct location.")
        return templates_processed

    print(f"📁 Processing templates from: {templates_folder}")

    for file_name in os.listdir(templates_folder):
        if not file_name.endswith(".template"):
            continue

        template_path = os.path.join(templates_folder, file_name)
        print(f"🔄 Processing: {file_name}")
        
        try:
            with open(template_path, "r", encoding="utf-8") as f:
                template = f.read()

            output_content = template

            # Handle numbered examples if present
            for i in range(1, 5):
                ph = f"EXAMPLE_{i}"
                if ph in output_content:
                    ex_value = business.get("EXAMPLES", [])
                    if len(ex_value) >= i:
                        output_content = output_content.replace(f"{{{{{ph}}}}}", ex_value[i-1])
                    else:
                        output_content = output_content.replace(f"{{{{{ph}}}}}", "")

            # Create missing placeholders
            missing_placeholders = create_missing_placeholders(business)
            
            # Replace all other placeholders dynamically
            placeholders = re.findall(r"{{(.*?)}}", output_content)
            for ph in placeholders:
                # Handle nested dictionary access (e.g., CONTACT.PHONE)
                if '.' in ph:
                    value = get_nested_value(business, ph)
                    # Try lowercase version if not found
                    if value is None:
                        keys = ph.split('.')
                        if len(keys) == 2:
                            parent_key = keys[0]
                            child_key = keys[1].lower()  # Try lowercase
                            if parent_key in business and isinstance(business[parent_key], dict):
                                value = business[parent_key].get(child_key)
                else:
                    value = business.get(ph) or missing_placeholders.get(ph)
                
                if value is not None:
                    rendered_value = render_value(value, ph)
                    output_content = output_content.replace(f"{{{{{ph}}}}}", rendered_value)
                elif ph == "SUPPORTING_TOPICS_MD" and "SUPPORTING_TOPICS" in business:
                    rendered_value = render_supporting_topics(business["SUPPORTING_TOPICS"])
                    output_content = output_content.replace(f"{{{{{ph}}}}}", rendered_value)
                else:
                    print(f"⚠️  Warning: Placeholder '{ph}' not found in business data")
                    output_content = output_content.replace(f"{{{{{ph}}}}}", "")

            # Rule 1: Convert <a> tags to <Link> components
            output_content = re.sub(
                r'<a\s+([^>]*?)href=["\']([^"\']*)["\']([^>]*?)>([^<]*)</a>',
                r'<Link href="\2" \1\3>\4</Link>',
                output_content,
                flags=re.IGNORECASE | re.DOTALL
            )

            # Only apply &apos; replacement for .mdc.template files (Cursor rules/markdown)
            # Skip for JSON files and TypeScript/JavaScript files
            if file_name.endswith(".mdc.template"):
                protected_content = []
                def protect_and_replace(match):
                    protected_content.append(match.group(0))
                    return f'__PROTECTED_{len(protected_content)-1}__'
                
                # Protect HTML tags, JSX expressions, and JSON-like structures
                output_content = re.sub(r'<[^>]*>|{[^}]*}|\[[^\]]*\]', protect_and_replace, output_content)
                
                # Replace quotes in remaining text (only for markdown/rules content)
                output_content = output_content.replace("'", "&apos;")
                
                # Restore protected content
                for i, content in enumerate(protected_content):
                    output_content = output_content.replace(f'__PROTECTED_{i}__', content)

            # Determine output file name and location
            if file_name.endswith(".mdc.template"):
                output_name = file_name.replace(".mdc.template", ".mdc")
                output_file = os.path.join(rules_folder, output_name)
            elif file_name.endswith(".json.template"):
                output_name = file_name.replace(".json.template", ".json")
                output_file = os.path.join(script_dir, "public", output_name)
            else:
                output_name = file_name.replace(".template", ".mdc")
                output_file = os.path.join(rules_folder, output_name)

            # Write output
            with open(output_file, "w", encoding="utf-8") as f:
                f.write(output_content)

            # Validate JSON if it's a JSON file
            if output_file.endswith('.json'):
                try:
                    with open(output_file, "r", encoding="utf-8") as f:
                        json.load(f)
                    print(f"✅ Generated: {output_file} (valid JSON)")
                except json.JSONDecodeError as e:
                    print(f"❌ Generated: {output_file} (INVALID JSON: {e})")
            else:
                print(f"✅ Generated: {output_file}")
            templates_processed += 1
            
        except Exception as e:
            print(f"❌ Error processing {file_name}: {e}")

    # -----------------------------
    # Update Public Files
    # -----------------------------
    # NOTE: robots.txt is handled by app/robots.ts (dynamic Next.js route)
    # which uses siteConfig that's generated from business.yaml
    # No need for static public/robots.txt file

    # -----------------------------
    # Generate Data Files from business.yaml
    # -----------------------------
    print("\n📊 Generating data files from business.yaml...")
    data_files_generated = 0

    # SKIP: Blog posts are maintained manually
    # try:
    #     generate_blog_posts(business)
    #     data_files_generated += 1
    # except Exception as e:
    #     print(f"❌ Error generating blog-posts.json: {e}")

    try:
        # generate_services_json(business)
        # data_files_generated += 1
        print("⚠️  Skipping services.json generation to preserve manual edits")
    except Exception as e:
        print(f"❌ Error generating services.json: {e}")

    try:
        generate_faqs(business)
        data_files_generated += 1
    except Exception as e:
        print(f"❌ Error generating faq.json: {e}")

    try:
        generate_portfolio(business)
        data_files_generated += 1
    except Exception as e:
        print(f"❌ Error generating portfolio.json: {e}")

    try:
        generate_business_config(business)
        data_files_generated += 1
    except Exception as e:
        print(f"❌ Error generating business-config.ts: {e}")

    try:
        generate_seo_config(business)
        data_files_generated += 1
    except Exception as e:
        print(f"❌ Error generating seo-config.ts: {e}")

    try:
        generate_manifest_json(business)
        data_files_generated += 1
    except Exception as e:
        print(f"❌ Error generating manifest.json: {e}")

    # Summary
    print("\n" + "="*60)
    print("📊 GENERATION SUMMARY")
    print("="*60)

    if templates_processed > 0:
        print(f"\n✅ Templates Processed: {templates_processed}")
        print(f"   📁 Rules location: {rules_folder}")
        print(f"   📁 Public files location: {os.path.join(script_dir, 'public/')}")

    if data_files_generated > 0:
        print(f"\n✅ Data Files Generated: {data_files_generated}")
        print(f"   📁 Data location: {os.path.join(script_dir, 'data/')}")
        print(f"   📁 Public location: {os.path.join(script_dir, 'public/')}")

    print("\n💡 All files are now data-driven from business.yaml!")
    print("   - Update business.yaml to change content")
    print("   - Re-run this script to regenerate all files")
    print("\n📝 Manually maintained files (NOT auto-generated):")
    print("   - data/blog-posts.json (blog content should be customized)")
    print("\n✨ AUTO-GENERATED from business.yaml:")
    print("   - data/services.json")
    print("   - data/cities.json")
    print("   - data/faq.json")
    print("   - data/portfolio.json")
    print("   - lib/business-config.ts")
    print("   - lib/seo-config.ts")
    print("   - public/manifest.json")
    print("\n📝 DYNAMIC Next.js Routes (use business.yaml via seo-config):")
    print("   - app/robots.ts → /robots.txt (dynamic)")
    print("   - app/sitemap.ts → /sitemap.xml (dynamic)")
    print("\n" + "="*60)

# ========================================================================
# MAIN MENU
# ========================================================================

if __name__ == "__main__":
    print("="*80)
    print("BUSINESS CONFIGURATION & IMAGE PROCESSING TOOL")
    print("="*80)
    print("\nWhat would you like to do?\n")
    print("1. Generate rules and data files (from business.yaml)")
    print("2. Process images (rename, convert to WebP, update references)")
    print("3. Do both (Generate rules + Process images)")
    print("4. Exit")
    print("\n" + "="*80)
    
    choice = input("\nEnter your choice (1-4): ").strip()
    
    if choice == "1":
        print("\n" + "="*80)
        print("GENERATING RULES AND DATA FILES")
        print("="*80 + "\n")
        generate_rules_and_data()
        
    elif choice == "2":
        print("\n" + "="*80)
        print("IMAGE PROCESSING CONFIGURATION")
        print("="*80 + "\n")
        
        # Image processing configuration
        IMAGE_DIRECTORIES = [
            './public/assets/images',
            './public/assets/images/brands',
            './public/assets/images/portfolio',
            './public/assets/images/services',
        ]
        
        SOURCE_BASE_DIR = '.'
        QUALITY = 85
        CONVERT_TO_WEBP = True
        DELETE_ORIGINAL = True
        UPDATE_REFERENCES = True
        
        print("📋 Configuration:")
        print(f"   Image directories: {IMAGE_DIRECTORIES}")
        print(f"   Source base: {SOURCE_BASE_DIR}")
        print(f"   WebP quality: {QUALITY}")
        print(f"   Convert to WebP: {CONVERT_TO_WEBP}")
        print(f"   Delete originals: {DELETE_ORIGINAL}")
        print(f"   Update references: {UPDATE_REFERENCES}")
        print("\n" + "="*80)
        
        confirm = input("\n⚠️  Press ENTER to start processing (or Ctrl+C to cancel)...")
        print()
        
        process_images(
            image_directories=IMAGE_DIRECTORIES,
            source_base_dir=SOURCE_BASE_DIR,
            quality=QUALITY,
            convert_to_webp=CONVERT_TO_WEBP,
            delete_original=DELETE_ORIGINAL,
            update_references=UPDATE_REFERENCES
        )
        
    elif choice == "3":
        print("\n" + "="*80)
        print("RUNNING BOTH OPERATIONS")
        print("="*80 + "\n")
        
        # First: Generate rules and data
        print("STEP 1: GENERATING RULES AND DATA FILES")
        print("="*80 + "\n")
        generate_rules_and_data()
        
        # Second: Process images
        print("\n\n" + "="*80)
        print("STEP 2: IMAGE PROCESSING")
        print("="*80 + "\n")
        
        IMAGE_DIRECTORIES = [
            './public/assets/images',
            './public/assets/images/brands',
            './public/assets/images/portfolio',
            './public/assets/images/services',
        ]
        
        SOURCE_BASE_DIR = '.'
        QUALITY = 85
        CONVERT_TO_WEBP = True
        DELETE_ORIGINAL = True
        UPDATE_REFERENCES = True
        
        print("📋 Image Processing Configuration:")
        print(f"   Image directories: {IMAGE_DIRECTORIES}")
        print(f"   WebP quality: {QUALITY}")
        print(f"   Convert to WebP: {CONVERT_TO_WEBP}")
        print(f"   Delete originals: {DELETE_ORIGINAL}")
        print(f"   Update references: {UPDATE_REFERENCES}\n")
        
        confirm = input("⚠️  Press ENTER to start image processing (or Ctrl+C to cancel)...")
        print()
        
        process_images(
            image_directories=IMAGE_DIRECTORIES,
            source_base_dir=SOURCE_BASE_DIR,
            quality=QUALITY,
            convert_to_webp=CONVERT_TO_WEBP,
            delete_original=DELETE_ORIGINAL,
            update_references=UPDATE_REFERENCES
        )
        
    elif choice == "4":
        print("\n✅ Exiting. No changes made.")
        exit(0)
        
    else:
        print("\n❌ Invalid choice. Please run the script again and select 1-4.")
        exit(1)
    
    print("\n" + "="*80)
    print("✅ ALL OPERATIONS COMPLETED SUCCESSFULLY")
    print("="*80)