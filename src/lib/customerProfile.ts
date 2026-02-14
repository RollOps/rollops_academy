import { supabase } from './supabase'
import type { SiteConfig } from '@/config/sites'

export interface CustomerProfile {
  id: string
  subdomain: string
  business_name: string
  tagline: string | null
  location: string | null
  logo_url: string | null
  hero_image_url: string | null
  description: string | null
  phone: string | null
  email: string | null
  address: string | null
  facebook_url: string | null
  instagram_url: string | null
  youtube_url: string | null
  theme: SiteConfig['theme']
  services: Array<{ title: string; description: string }>
  hours_of_operation: Record<string, string> | null
  tier: 'free' | 'pro'
  custom_domain: string | null
  custom_site_component: string | null
  status: 'pending' | 'active' | 'suspended'
  company_id: string | null
  initial_hours_used: number
  monthly_hours_used: number
  created_at: string
  updated_at: string
}

export async function fetchProfileBySubdomain(subdomain: string): Promise<CustomerProfile | null> {
  const { data, error } = await supabase
    .from('customer_profiles')
    .select('*')
    .eq('subdomain', subdomain)
    .maybeSingle()

  if (error) throw error
  return data as CustomerProfile | null
}

export async function fetchProfileByUserId(userId: string): Promise<CustomerProfile | null> {
  const { data, error } = await supabase
    .from('customer_profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()

  if (error) throw error
  return data as CustomerProfile | null
}

export async function updateProfile(
  userId: string,
  updates: Partial<Omit<CustomerProfile, 'id' | 'created_at' | 'updated_at'>>,
): Promise<CustomerProfile> {
  const { data, error } = await supabase
    .from('customer_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data as CustomerProfile
}

const DEFAULT_THEME: SiteConfig['theme'] = {
  primary: '#000000',
  secondary: '#1a1a1a',
  accent: '#9B1421',
  background: '#0a0a0a',
  surface: '#141414',
  text: '#ffffff',
  textMuted: '#b0b0b0',
  border: '#2a2a2a',
}

export function buildSiteConfigFromProfile(profile: CustomerProfile): SiteConfig {
  const theme = profile.theme ?? DEFAULT_THEME

  return {
    subdomain: profile.subdomain,
    name: profile.business_name,
    tagline: profile.tagline ?? '',
    location: profile.location ?? '',
    logo: profile.logo_url ?? undefined,
    theme,
    social: {
      facebook: profile.facebook_url ?? undefined,
      instagram: profile.instagram_url ?? undefined,
    },
    contact: {
      phone: profile.phone ?? undefined,
      email: profile.email ?? undefined,
      address: profile.address ?? undefined,
    },
    authEnabled: true,
    customComponent: profile.custom_site_component ?? undefined,
    description: profile.description ?? undefined,
    heroImageUrl: profile.hero_image_url ?? undefined,
    services: profile.services,
    hoursOfOperation: profile.hours_of_operation ?? undefined,
  }
}
