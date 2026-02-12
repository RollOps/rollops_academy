/**
 * Site Configuration Registry
 *
 * Each gym/academy hosted on rollops.academy gets a config entry here.
 * The subdomain key maps to the site config used for routing, theming, and content.
 */

export interface SiteConfig {
  /** Subdomain identifier (e.g., "onyx" for onyx.rollops.academy) */
  subdomain: string
  /** Display name of the gym */
  name: string
  /** Tagline or short description */
  tagline: string
  /** Location info */
  location: string
  /** Brand colors */
  theme: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textMuted: string
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
 * Registry of all hosted gym sites.
 * Add new entries here when onboarding a gym.
 */
export const siteRegistry: Record<string, SiteConfig> = {
  onyx: {
    subdomain: 'onyx',
    name: 'Onyx BJJ',
    tagline: 'Brazilian Jiu-Jitsu in Safford, Arizona',
    location: 'Safford, AZ',
    theme: {
      primary: '#1a1a2e',
      secondary: '#16213e',
      accent: '#e94560',
      background: '#0f0f0f',
      surface: '#1a1a1a',
      text: '#ffffff',
      textMuted: '#a0a0a0',
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
  name: 'RollOps Academy',
  tagline: 'Managed Websites for Martial Arts Academies',
  location: '',
  theme: {
    primary: '#6366f1',
    secondary: '#4f46e5',
    accent: '#f59e0b',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc',
    textMuted: '#94a3b8',
  },
  authEnabled: false,
}
