import { supabase } from './supabase'

export interface GymEntry {
  id: string
  name: string
  logo_url: string | null
  slogan: string | null
  address: string
  city: string
  state: string
  zip: string
  phone: string | null
  email: string | null
  website_url: string | null
  lat: number
  lng: number
  google_rating: number | null
  google_review_count: number | null
  is_hosted: boolean
  hosted_url: string | null
}

export async function fetchGymDirectory(params?: {
  search?: string
  state?: string
}): Promise<GymEntry[]> {
  const queryParams = new URLSearchParams()
  if (params?.search) queryParams.set('search', params.search)
  if (params?.state) queryParams.set('state', params.state)

  const qs = queryParams.toString()
  const { data, error } = await supabase.functions.invoke('gym-directory', {
    method: 'GET',
    headers: qs ? { 'x-query-params': qs } : undefined,
  })

  if (error) throw error
  return (data as { gyms: GymEntry[] }).gyms
}
