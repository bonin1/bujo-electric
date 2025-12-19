/**
 * Brand Icons - Hybrid Approach
 * Uses Lucide React for icons it supports, and react-icons ONLY for brand icons Lucide doesn't have
 * This ensures optimal tree-shaking and minimal bundle size
 */

import React from 'react';

// Lucide React icons (supported brands)
import { Facebook, Instagram, Linkedin,  Youtube } from 'lucide-react';

// React Icons - ONLY import brand icons that Lucide doesn't support
// Tree-shakeable: only these specific icons will be bundled
// Import directly from specific icon files to ensure tree-shaking
import { FaXTwitter } from 'react-icons/fa6';
import { FaPinterest, FaYelp } from 'react-icons/fa';

/**
 * Props for brand icon components
 */
export interface BrandIconProps {
  className?: string;
  size?: number | string;
  color?: string;
}

/**
 * Wrapper component to normalize react-icons props to match Lucide API
 * React-icons uses the same prop API, but this ensures consistency
 */
const createBrandIcon = (
  IconComponent: React.ComponentType<{ className?: string; size?: number | string; color?: string; style?: React.CSSProperties }>
) => {
  const BrandIcon = ({ className, size, color, ...props }: BrandIconProps & { style?: React.CSSProperties }) => {
    // React-icons accepts both string and number for size
    // If size is a Tailwind class like "size-5", use className instead
    const iconSize = typeof size === 'string' && !/^\d+$/.test(size) ? undefined : size || undefined;
    
    return (
      <IconComponent
        className={className}
        size={iconSize}
        color={color}
        {...props}
      />
    );
  };
  
  return BrandIcon;
};

// Export brand icons - Lucide icons first (already in optimal format)
export const BrandFacebook = Facebook;
export const BrandInstagram = Instagram;
export const BrandLinkedin = Linkedin;
export const BrandTwitter = FaXTwitter;
export const BrandYoutube = Youtube;

// React Icons brand icons - wrapped to match Lucide API
export const BrandPinterest = createBrandIcon(FaPinterest);
export const BrandYelp = createBrandIcon(FaYelp);
export const BrandX = FaXTwitter; // X (formerly Twitter) - can use directly

/**
 * Get the appropriate brand icon component by platform name
 * Falls back to Facebook if platform not found
 */
export const getBrandIcon = (
  platform: string,
  props: BrandIconProps = {}
): React.ReactElement => {
  const iconMap: Record<string, React.ComponentType<BrandIconProps>> = {
    facebook: BrandFacebook,
    instagram: BrandInstagram,
    linkedin: BrandLinkedin,
    twitter: BrandTwitter,
    x: BrandX,
    pinterest: BrandPinterest,
    yelp: BrandYelp,
    youtube: BrandYoutube,
  };

  const IconComponent = iconMap[platform.toLowerCase()] || BrandFacebook;
  return <IconComponent {...props} />;
};

/**
 * Pre-built icon components with standard sizing for social media links
 */
export const SocialIcons = {
  Facebook: (props: BrandIconProps) => <BrandFacebook className={props.className || "size-5"} {...props} />,
  Instagram: (props: BrandIconProps) => <BrandInstagram className={props.className || "size-5"} {...props} />,
  Linkedin: (props: BrandIconProps) => <BrandLinkedin className={props.className || "size-5"} {...props} />,
  Twitter: (props: BrandIconProps) => <BrandTwitter className={props.className || "size-5"} {...props} />,
  X: (props: BrandIconProps) => <BrandX className={props.className || "size-5"} {...props} />,
  Pinterest: (props: BrandIconProps) => <BrandPinterest className={props.className || "size-5"} {...props} />,
  Yelp: (props: BrandIconProps) => <BrandYelp className={props.className || "size-5"} {...props} />,
  Youtube: (props: BrandIconProps) => <BrandYoutube className={props.className || "size-5"} {...props} />,
};

