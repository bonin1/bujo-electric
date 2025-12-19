# [COMPANY_NAME] - City Content Generation Prompt (TEMPLATE)

> **Instructions**: Replace all `[PLACEHOLDER]` values with your project-specific information. Search for `[COMPANY_NAME]`, `[INDUSTRY]`, `[SERVICE_X]`, etc. and replace throughout this document.

---

## Purpose
Generate unique, SEO-optimized content for each city page to reduce duplicate content from 30%+ to ~10%. Each city must have completely unique content with only city names and company branding as similarities.

---

## Business Context

### Company: [COMPANY_NAME]

- **Primary Services**: 
  - [PRIMARY_SERVICE_1]
  - [PRIMARY_SERVICE_2]
  - [PRIMARY_SERVICE_3]
  - [PRIMARY_SERVICE_4]
  - [PRIMARY_SERVICE_5]

- **Sub-Services**:
  - [SUB_SERVICE_1]
  - [SUB_SERVICE_2]
  - [SUB_SERVICE_3]
  - [SUB_SERVICE_4]
  - [SUB_SERVICE_5]
  - [SUB_SERVICE_6]
  - [Add more as needed]

- **Contact Information**:
  - **Phone**: [PHONE_NUMBER]
  - **Email**: [EMAIL_ADDRESS]
  - **Base Location**: [CITY, STATE] ([LANDMARK/ADDRESS])

- **Brand Tone**: [TONE_DESCRIPTION]
  - Example: "Local, trustworthy, family-owned, community-focused, professional yet conversational"

---

## Service Area - [STATE/REGION] Cities ([NUMBER] Total)

> **Instructions**: List all cities you serve, organized by region/county/proximity. Include brief characteristics for each.

### Primary Service Area ([REGION_NAME])
1. **[City 1], [ST]** - [Key characteristic, e.g., "Home base, downtown area, main features"]
2. **[City 2], [ST]** - [Key characteristic]
3. **[City 3], [ST]** - [Key characteristic]
4. **[City 4], [ST]** - [Key characteristic]
5. **[City 5], [ST]** - [Key characteristic]
[Continue...]

### Secondary Service Area ([REGION_NAME])
[List cities with characteristics]

### Outer Service Area ([REGION_NAME])
[List cities with characteristics]

---

## Geographic & Climate Context

> **Instructions**: Describe the environmental factors that affect your industry in this region.

### Regional Characteristics

**[CLIMATE_ZONE_NAME]** (All Cities)
- [Climate characteristic 1 - e.g., "High humidity year-round"]
- [Climate characteristic 2 - e.g., "Hot summers, mild winters"]
- [Climate characteristic 3 - e.g., "Heavy rainfall patterns"]
- [Climate characteristic 4 - e.g., "Storm/weather exposure"]
- [Environmental factor 1 - e.g., "Salt air influence (coastal)"]
- [Environmental factor 2 - e.g., "Dust from agricultural areas"]

**Key Environmental Factors**:
- **[City Type 1]** ([City examples]): [How this affects your services]
- **[City Type 2]** ([City examples]): [How this affects your services]
- **[City Type 3]** ([City examples]): [How this affects your services]
- **[City Type 4]** ([City examples]): [How this affects your services]
- **[City Type 5]** ([City examples]): [How this affects your services]

---

## Variation Factors

> **Instructions**: These factors create unique combinations for each city. Customize categories based on your industry.

Each city must use unique combinations of these factors to create distinctive content:

### 1. Environmental Angle
Choose based on city location and characteristics:

- **[angle-1]**: [Description and when to use]
  - *Cities*: [Example cities]
  - *Focus*: [What to emphasize in content]

- **[angle-2]**: [Description and when to use]
  - *Cities*: [Example cities]
  - *Focus*: [What to emphasize in content]

- **[angle-3]**: [Description and when to use]
  - *Cities*: [Example cities]
  - *Focus*: [What to emphasize in content]

- **[angle-4]**: [Description and when to use]
  - *Cities*: [Example cities]
  - *Focus*: [What to emphasize in content]

- **[angle-5]**: [Description and when to use]
  - *Cities*: [Example cities]
  - *Focus*: [What to emphasize in content]

**Example Categories (Garage Doors):**
- coastal-humidity, agricultural-dust, industrial-coastal, suburban-residential, hometown-rural

**Example Categories (Pools):**
- coastal-saltwater, desert-heat, suburban-luxury, rural-acreage, urban-compact

**Example Categories (HVAC):**
- extreme-heat, extreme-cold, coastal-humidity, mountain-elevation, urban-efficiency

### 2. Technical Focus
Select primary technical emphasis based on community needs:

- **[focus-1]**: [When to use, what to emphasize]
- **[focus-2]**: [When to use, what to emphasize]
- **[focus-3]**: [When to use, what to emphasize]
- **[focus-4]**: [When to use, what to emphasize]
- **[focus-5]**: [When to use, what to emphasize]
- **[focus-6]**: [When to use, what to emphasize]
- **[focus-7]**: [When to use, what to emphasize]

**Example Technical Focuses (Garage Doors):**
- corrosion-resistance, durability-heavy-use, hurricane-rating-security, insulation-energy, smart-technology

**Example Technical Focuses (Pools):**
- salt-system-conversion, energy-efficiency, automation-smart-pools, water-conservation, freeze-protection

### 3. Tone Archetype
Match community personality and demographics:

- **[tone-1]**: "[Description in quotes]"
  - Best for: [City types]
  - Voice: [Voice characteristics]

- **[tone-2]**: "[Description in quotes]"
  - Best for: [City types]
  - Voice: [Voice characteristics]

- **[tone-3]**: "[Description in quotes]"
  - Best for: [City types]
  - Voice: [Voice characteristics]

- **[tone-4]**: "[Description in quotes]"
  - Best for: [City types]
  - Voice: [Voice characteristics]

- **[tone-5]**: "[Description in quotes]"
  - Best for: [City types]
  - Voice: [Voice characteristics]

**Standard Tone Archetypes (Usually transferable):**
- hometown-trust, hardworking-reliable, family-friendly, industrial-professional, modern-innovative, luxury-polish

### 4. Local Proof Statement
Each city needs authentic local credibility. Examples:

- "Founded in [HOME_CITY], serving our neighbors since day one"
- "Serving [City]'s [community type] families for over a decade"
- "[City]'s trusted [industry] experts since [year]"
- "Protecting [City]'s [property type] properties"
- "Your [City] neighbors providing fast, reliable service"
- "[City]'s [specialization] specialists"

---

## Required JSON Output Structure

> **Instructions**: Adjust field names and structure based on your data needs. This is a comprehensive structure.

For each city, generate this complete JSON structure:

```json
{
  "id": "city-name-st",
  "name": "City Name",
  "state": "ST",
  "slug": "city-name-st",
  "description": "[1-2 sentences overview of [COMPANY_NAME] services in this specific city]",
  "content": "[3-4 paragraphs of unique, detailed content about serving this city. Include: Why this city matters, local characteristics that affect [SERVICE] needs, what makes [COMPANY_NAME] different here, specific services popular in this area. Use conversational tone with connectors like 'the truth is,' 'besides,' 'therefore.' Mention specific neighborhoods or landmarks when relevant.]",
  "population": "[Approximate population]",
  "area": "[Square miles]",
  "timezone": "[Timezone - e.g., Central Time, Pacific Time]",
  "coordinates": {
    "latitude": [latitude],
    "longitude": [longitude]
  },
  "seo": {
    "metaTitle": "[50-60 characters - City + [SERVICE_KEYWORD] + Unique Hook]",
    "metaDescription": "[140-160 characters - Hook + City + Service + CTA]",
    "keywords": "[service keyword] [City] [ST], [service] repair [City], [service] installation [City], [COMPANY_NAME] [City]"
  },
  "services": [
    "[PRIMARY_SERVICE_1]",
    "[PRIMARY_SERVICE_2]",
    "[PRIMARY_SERVICE_3]",
    "[PRIMARY_SERVICE_4]",
    "[PRIMARY_SERVICE_5]"
  ],
  "featuredImage": "/assets/images/[default-image].webp",
  "variationFactors": {
    "environmentalAngle": "[chosen angle]",
    "technicalFocus": "[chosen focus]",
    "toneArchetype": "[chosen tone]",
    "localProof": "[unique local credibility statement]"
  },
  "sectionContent": {
    "services": {
      "heading": "[Unique heading that incorporates city name and key differentiator]",
      "subheading": "[2-3 sentences about why [COMPANY_NAME] serves this city well, with conversational tone and city-specific details]",
      "highlights": [
        "[Specific benefit or feature relevant to this city's environment/needs]",
        "[Another city-specific benefit addressing local concerns]",
        "[Third benefit that differentiates [COMPANY_NAME] in this community]"
      ],
      "cta": "[Unique call-to-action phrase with city name or local flavor]"
    },
    "process": {
      "heading": "[City]-Focused Process / How We Serve [City]",
      "subheading": "[1-2 sentences explaining why this process works for this city specifically]",
      "steps": [
        {
          "title": "[Step 1 title - may be standard or adapted with local flavor]",
          "description": "[Description that mentions city name and includes local considerations, characteristics, or specific needs of this community]"
        },
        {
          "title": "[Step 2 title]",
          "description": "[Description with city-specific details, local building codes, or community characteristics]"
        },
        {
          "title": "[Step 3 title]",
          "description": "[Description mentioning local weather, climate, or environmental factors relevant to this city]"
        },
        {
          "title": "[Step 4 title]",
          "description": "[Description with maintenance considerations specific to this city's climate or community needs]"
        }
      ]
    },
    "whySetsApart": {
      "heading": "Why [City] Chooses [COMPANY_NAME] / What Sets Us Apart in [City]",
      "subheading": "[2-3 engaging sentences with conversational connectors. Include 'the truth is,' 'besides,' 'therefore,' or similar. Make it specific to this city's needs or [COMPANY_NAME]'s relationship with this community.]",
      "features": [
        {
          "title": "[Unique feature title relevant to this city]",
          "description": "[2-4 sentences with specific local proof points, examples from this city, benefits for this community. Include details like local climate considerations, community characteristics, or specific [COMPANY_NAME] experience in this area.]"
        },
        {
          "title": "[Another unique feature]",
          "description": "[2-4 sentences with city-specific examples, local benefits, or community-relevant advantages]"
        },
        {
          "title": "[Third unique feature]",
          "description": "[2-4 sentences highlighting how this benefits this specific city, with local references or examples]"
        },
        {
          "title": "[Fourth unique feature]",
          "description": "[2-4 sentences with local credibility markers, community involvement, or city-specific service advantages]"
        }
      ]
    },
    "cta": {
      "heading": "[Action-oriented heading specific to city - encouraging, benefit-focused]",
      "subheading": "[1-2 sentences about benefits for this city's residents, mentioning city name and specific advantages]",
      "primaryCTA": "[Custom call-to-action phrase with local flavor or city mention]",
      "secondaryCTA": "[Alternative action phrase, possibly mentioning proximity or local presence]"
    }
  },
  "heroTitle": "Your Trusted [SERVICE_TYPE] Professionals in [City], [ST]"
}
```

---

## Critical Writing Guidelines

### ✅ DO THIS

1. **Research Each City First** (5-10 minutes)
   - Google: "[City], [ST] demographics"
   - Google: "[City], [ST] characteristics"
   - Look for: Population, economy (industrial/agricultural/residential), geographic features, notable characteristics
   - Note: Historic areas, new developments, community personality

2. **Make Every Section Unique**
   - Different sentence structures for each city
   - Varied vocabulary choices
   - Different examples and specifics
   - Unique angles and perspectives
   - No template language

3. **Use Conversational Connectors Naturally**
   - "The truth is..."
   - "Besides..."
   - "Therefore..."
   - "And the thing is..."
   - "What's more..."
   - "Honestly..."
   - Mix short and long sentences for natural rhythm

4. **Include Specific Local References**
   - Neighborhoods (e.g., "historic downtown [City]," "[City]'s newer developments off [Highway]")
   - Local features (e.g., "[Geographic feature]," "[City]'s [characteristic] heritage")
   - Regional context (e.g., "[Climate zone]," "[County/Region] values")
   - Community characteristics (e.g., "[City]'s [type] communities")

5. **Vary Technical Details by City Type**
   - **[City Type 1]**: Emphasize [relevant features]
   - **[City Type 2]**: Focus on [relevant features]
   - **[City Type 3]**: Highlight [relevant features]
   - **[City Type 4]**: Emphasize [relevant features]
   - **[City Type 5]**: Focus on [relevant features]

6. **Use Proper Formatting**
   - **Always use standard apostrophes `'` in JSON strings**
   - **Always use `&quot;` instead of `"` for quotes in JSON content**
   - Ensure valid JSON formatting
   - Include all required fields

### ❌ DON'T DO THIS

1. **Never Copy-Paste Content Between Cities**
   - Every paragraph must be rewritten
   - Every heading must be unique
   - Every example must be different

2. **Don't Use Generic Template Language**
   - Avoid: "We provide excellent service..."
   - Avoid: "Our team is professional and experienced..."
   - Instead: Use specific, unique phrasing for each city

3. **Don't Ignore Environmental Context**
   - Consider how climate/geography affects your industry
   - Mention relevant environmental factors
   - Adapt emphasis based on location

4. **Don't Sound Robotic**
   - Vary sentence lengths (short + long)
   - Use conversational connectors
   - Include emotional language when appropriate
   - Show personality

5. **Don't Make Up Information**
   - Research real city characteristics
   - Use accurate population/geographic data
   - Don't invent neighborhoods or landmarks
   - Be authentic about company presence

---

## Content Examples

> **Instructions**: Create 2-3 example city entries showing different variation factor combinations. These examples should demonstrate your brand voice and industry-specific language.

### Example 1: [City 1], [ST] ([Tone Type], [Environmental Angle])

**Key elements to demonstrate:**
- [Tone archetype] voice
- Specific local references
- Authentic local proof
- Conversational connectors used naturally
- Varied sentence structures and rhythms

```json
{
  "id": "[city-slug]",
  "name": "[City Name]",
  "state": "[ST]",
  "slug": "[city-slug]",
  "description": "[Brief overview specific to this city and your services]",
  "variationFactors": {
    "environmentalAngle": "[angle]",
    "technicalFocus": "[focus]",
    "toneArchetype": "[tone]",
    "localProof": "[local proof statement]"
  },
  "sectionContent": {
    "services": {
      "heading": "[Unique heading for this city]",
      "subheading": "[2-3 sentences with city-specific details and conversational tone]",
      "highlights": [
        "[City-specific benefit 1]",
        "[City-specific benefit 2]",
        "[City-specific benefit 3]"
      ],
      "cta": "[Unique CTA phrase]"
    },
    "process": {
      "heading": "[Process heading with city context]",
      "subheading": "[Why this process works for this city]",
      "steps": [
        {
          "title": "[Step 1 title]",
          "description": "[Description with city mentions and local considerations]"
        },
        {
          "title": "[Step 2 title]",
          "description": "[Description with city-specific details]"
        },
        {
          "title": "[Step 3 title]",
          "description": "[Description mentioning local factors]"
        },
        {
          "title": "[Step 4 title]",
          "description": "[Description with city-specific maintenance considerations]"
        }
      ]
    },
    "whySetsApart": {
      "heading": "Why [City] Chooses [COMPANY_NAME]",
      "subheading": "[2-3 engaging sentences with conversational connectors, specific to this city's needs]",
      "features": [
        {
          "title": "[Feature 1 title relevant to city]",
          "description": "[2-4 sentences with local proof points and examples]"
        },
        {
          "title": "[Feature 2 title]",
          "description": "[2-4 sentences with city-specific benefits]"
        },
        {
          "title": "[Feature 3 title]",
          "description": "[2-4 sentences with local references]"
        },
        {
          "title": "[Feature 4 title]",
          "description": "[2-4 sentences with credibility markers]"
        }
      ]
    },
    "cta": {
      "heading": "[Action-oriented heading specific to city]",
      "subheading": "[Benefits for this city's residents]",
      "primaryCTA": "[Custom CTA phrase]",
      "secondaryCTA": "[Alternative action phrase]"
    }
  },
  "heroTitle": "Your Trusted [SERVICE_TYPE] Professionals in [City], [ST]"
}
```

### Example 2: [City 2], [ST] ([Different Tone], [Different Angle])

[Create second example showing contrast]

### Example 3: [City 3], [ST] ([Different Tone], [Different Angle])

[Create third example showing another combination]

---

## Workflow for Each City

### Step 1: City Research (5-10 minutes)

1. **Basic Information**
   - Google: "[City], [ST] population"
   - Google: "[City], [ST] characteristics"
   - Wikipedia: Quick overview

2. **Geographic Context**
   - Identify: [Relevant geographic factors for your industry]
   - Note: Proximity to [relevant geographic features]
   - Determine: Urban/suburban/rural classification

3. **Community Characteristics**
   - Demographics: [Relevant demographic factors]
   - Economy: Industrial, agricultural, residential, commercial
   - Housing: Historic homes, new developments, property types
   - Notable features: Schools, landmarks, community identity

4. **Environmental Factors**
   - [Factor 1 that affects your services]
   - [Factor 2 that affects your services]
   - [Factor 3 that affects your services]
   - [Factor 4 that affects your services]

### Step 2: Assign Variation Factors (3-5 minutes)

1. **Choose Environmental Angle**
   - Consider: Location, economy, housing type
   - Select: Most fitting angle from list

2. **Choose Technical Focus**
   - Based on: Environmental angle and community needs
   - Consider: What problems does your service face here?

3. **Choose Tone Archetype**
   - Match: Community personality
   - Consider: Demographics and community values

4. **Create Local Proof Statement**
   - Be specific: Years serving, local presence, community involvement
   - Be authentic: Don't make up details
   - Examples: "Serving [City] since [year]", "[City]'s trusted [service provider]"

### Step 3: Write Content (20-30 minutes per city)

1. **Description Field** (2-3 minutes)
   - 1-2 sentences
   - Mention city name, company name, primary service differentiator

2. **Content Field** (5-7 minutes)
   - 3-4 unique paragraphs
   - First paragraph: Why this city matters
   - Second paragraph: Local characteristics affecting service needs
   - Third paragraph: What makes company different here
   - Fourth paragraph: Specific services popular in this area

3. **SEO Section** (2-3 minutes)
   - metaTitle: 50-60 characters, unique hook
   - metaDescription: 140-160 characters, engaging, includes CTA
   - keywords: Standard format with city name

4. **Services Section Content** (4-5 minutes)
   - Unique heading incorporating city
   - Subheading with city-specific details
   - 3 highlights relevant to this city
   - Custom CTA

5. **Process Section Content** (5-6 minutes)
   - Heading with city mention
   - Subheading explaining relevance to city
   - 4 steps, each mentioning city and local factors

6. **Why Sets Apart Section** (6-8 minutes)
   - Heading with city name
   - Conversational subheading with connectors
   - 4 unique features with 2-4 sentences each
   - Include local proof and city-specific examples

7. **CTA Section** (2-3 minutes)
   - Action-oriented heading
   - Subheading with city benefits
   - Custom primary and secondary CTAs

### Step 4: Quality Review (3-5 minutes)

- Check: Proper apostrophe formatting
- Check: City name mentioned throughout
- Check: No duplicate phrases from other cities
- Check: Conversational connectors used naturally
- Check: Technical focus matches environmental angle
- Check: Valid JSON formatting
- Check: All required fields present

**Total time per city: 30-45 minutes for high-quality unique content**

---

## Quality Checklist

Before submitting each city, verify:

- [ ] **Uniqueness**: 70%+ unique content compared to other cities
- [ ] **City-Specific**: At least 5-7 mentions of city name throughout
- [ ] **Local References**: Specific neighborhoods, landmarks, or characteristics included
- [ ] **Conversational Tone**: Natural connectors used ("the truth is," "besides," etc.)
- [ ] **Variation Factors**: All 4 factors clearly represented in content
- [ ] **Technical Accuracy**: Services and capabilities accurately represented
- [ ] **Environmental Context**: Relevant climate/geography mentioned where appropriate
- [ ] **Formatting**: Proper apostrophes and quote formatting
- [ ] **JSON Valid**: No syntax errors, all fields present
- [ ] **SEO Optimized**: Title and description within character limits
- [ ] **CTA Unique**: Call-to-action phrases different from other cities
- [ ] **Reading Level**: Conversational, accessible, varied sentence structures

---

## Success Metrics

Your content will be successful if:

✅ **Uniqueness**: <10% duplicate content between cities
✅ **Readability**: Natural flow with varied sentence rhythms  
✅ **Local Authenticity**: City-specific details showing real research
✅ **Brand Consistency**: [COMPANY_NAME]'s voice maintained across all cities
✅ **SEO Value**: Each page targets city-specific keywords naturally
✅ **Conversion-Focused**: Clear CTAs that motivate action

---

## Submission Format

Output ONE complete JSON object per city following the structure provided.

Submit cities individually or in batches of 3-5.

### Batch Format:

```json
{
  "cities": [
    { 
      /* Complete city 1 JSON */ 
    },
    { 
      /* Complete city 2 JSON */ 
    },
    { 
      /* Complete city 3 JSON */ 
    }
  ]
}
```

---

## Starter Task

> **Instructions**: Select 3-5 pilot cities that represent different variation factor combinations.

Your first assignment: Generate content for these **[3-5] pilot cities** to demonstrate variety:

1. **[City 1], [ST]** - [Key characteristic, variation focus]
2. **[City 2], [ST]** - [Key characteristic, variation focus]
3. **[City 3], [ST]** - [Key characteristic, variation focus]
4. **[City 4], [ST]** - [Key characteristic, variation focus]
5. **[City 5], [ST]** - [Key characteristic, variation focus]

Complete these first. We'll verify quality and uniqueness before proceeding to all [NUMBER] cities.

---

## Important Reminders

1. **Research First**: Always research the city before writing
2. **Be Specific**: Use real neighborhoods, characteristics, local context
3. **Stay Authentic**: Don't invent local details you don't know
4. **Unique Above All**: Better slightly less polished than duplicate content
5. **Environmental Context**: Adapt emphasis based on local conditions
6. **[HOME_CITY] is Home Base**: [COMPANY_NAME] founded in [HOME_CITY], serves surrounding areas
7. **Phone**: [PHONE_NUMBER]
8. **Email**: [EMAIL_ADDRESS]

---

## Ready to Begin?

Start with **[City 1], [ST]** as your first city. Research the community, assign variation factors, and generate the complete JSON structure following this guide.

**Goal**: Create [NUMBER] unique city pages with <10% duplicate content that authentically represent [COMPANY_NAME]'s presence in each [STATE/REGION] community.

---

## Customization Checklist

Before using this template, replace all of the following:

- [ ] `[COMPANY_NAME]` - Your company name
- [ ] `[INDUSTRY]` - Your industry (e.g., garage doors, pools, HVAC, roofing)
- [ ] `[SERVICE_X]` - All service listings
- [ ] `[PHONE_NUMBER]` - Contact phone
- [ ] `[EMAIL_ADDRESS]` - Contact email
- [ ] `[CITY, STATE]` - Base location
- [ ] `[TONE_DESCRIPTION]` - Brand voice description
- [ ] `[STATE/REGION]` - Service area
- [ ] `[NUMBER]` - Total city count
- [ ] All city lists and characteristics
- [ ] `[CLIMATE_ZONE_NAME]` - Regional climate description
- [ ] All climate and environmental factors
- [ ] Environmental angles (5-7 options)
- [ ] Technical focuses (5-7 options)
- [ ] Tone archetypes (customize if needed)
- [ ] Local proof examples
- [ ] JSON structure (adjust fields as needed)
- [ ] 2-3 complete example city entries
- [ ] Pilot city selection (3-5 cities)
- [ ] `[SERVICE_KEYWORD]` - Primary SEO keyword
- [ ] `[SERVICE_TYPE]` - Service category for hero titles

**Search and Replace Strategy:**
1. Use Find & Replace for common placeholders
2. Manually review and customize section descriptions
3. Create 2-3 detailed examples for your industry
4. Update all industry-specific language
5. Test with 1-2 pilot cities before full deployment

