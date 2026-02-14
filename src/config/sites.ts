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
  /** Key mapping to a custom-built React component (e.g. 'onyxbjj') */
  customComponent?: string
  /** Longer business description for the About section */
  description?: string
  /** Hero background image URL */
  heroImageUrl?: string
  /** Services/programs offered — rendered as cards in the default template */
  services?: Array<{ title: string; description: string }>
  /** Operating hours by day of week */
  hoursOfOperation?: Record<string, string>
}

/**
 * Registry of all hosted sites.
 * Add new entries here when onboarding a customer.
 */
export const siteRegistry: Record<string, SiteConfig> = {
  onyxbjj: {
    subdomain: 'onyxbjj',
    name: 'Onyx Jiu-Jitsu',
    tagline: 'Checkmat Affiliate — Brazilian Jiu-Jitsu in Safford, Arizona',
    location: 'Safford, AZ',
    theme: {
      primary: '#000000',
      secondary: '#1a1a1a',
      accent: '#37ca37',
      background: '#0a0a0a',
      surface: '#141414',
      text: '#ffffff',
      textMuted: '#b0b0b0',
      border: '#2a2a2a',
    },
    social: {
      facebook: 'https://www.facebook.com/onyxbjj',
      instagram: 'https://www.instagram.com/onyxbjj_/',
    },
    contact: {
      phone: '928-651-6311',
      email: 'info@onyxbjj.com',
      address: '408 W Main St, Safford, AZ 85546',
    },
    authEnabled: true,
    originalUrl: 'https://onyxbjj.com',
    customComponent: 'onyxbjj',
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
