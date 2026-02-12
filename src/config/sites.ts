/**
 * Site Configuration Registry
 *
 * Each business hosted on the RollOps Pro platform gets a config entry here.
 * The subdomain key maps to the site config used for routing, theming, and content.
 */

export interface SiteConfig {
  /** Subdomain identifier (e.g., "onyx" for onyx.rollops.pro) */
  subdomain: string
  /** Display name of the business */
  name: string
  /** Tagline or short description */
  tagline: string
  /** Location info */
  location: string
  /** Path to logo image (in public/) */
  logo?: string
  /** Brand colors */
  theme: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textMuted: string
    border?: string
  }
  /** Social links */
  social?: {
    facebook?: string
    instagram?: string
    youtube?: string
  }
  /** Contact info */
  contact?: {
    phone?: string
    email?: string
    address?: string
  }
  /** Whether RollOps auth is enabled for this site */
  authEnabled: boolean
  /** The original website being replicated (for reference) */
  originalUrl?: string
}

/**
 * Registry of all hosted sites.
 * Add new entries here when onboarding a customer.
 */
export const siteRegistry: Record<string, SiteConfig> = {
  onyx: {
    subdomain: 'onyx',
    name: 'Onyx BJJ',
    tagline: 'Brazilian Jiu-Jitsu in Safford, Arizona',
    location: 'Safford, AZ',
    theme: {
      primary: '#188bf6',
      secondary: '#1a1a2e',
      accent: '#37ca37',
      background: '#0f0f0f',
      surface: '#1a1a1a',
      text: '#ffffff',
      textMuted: '#a0a0a0',
      border: '#333333',
    },
    social: {
      facebook: 'https://www.facebook.com/onyxbjj',
      instagram: 'https://www.instagram.com/onyxbjj',
    },
    contact: {
      address: 'Safford, AZ',
    },
    authEnabled: true,
    originalUrl: 'https://onyxbjj.com',
  },
}

/** Default/fallback config shown when no subdomain matches */
export const defaultSiteConfig: SiteConfig = {
  subdomain: '',
  name: 'RollOps Pro',
  tagline: 'Professional Web Hosting & Management',
  location: '',
  theme: {
    primary: '#9B1421',
    secondary: '#7A0F1A',
    accent: '#9B1421',
    background: '#111010',
    surface: '#221F1F',
    text: '#FFFFFF',
    textMuted: '#E0E0E0',
    border: '#504A4A',
  },
  authEnabled: false,
}
