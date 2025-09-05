import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Types pour les rendez-vous
export interface Appointment {
  id?: number
  first_name: string
  last_name: string
  email: string
  phone: string
  service: string
  platform: string
  message: string
  appointment_date: string
  appointment_time: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at?: string
  updated_at?: string
}
