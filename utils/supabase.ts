import { serverSupabaseClient } from '#supabase/server'
import { H3Event } from 'h3'

export const fetchDashboardStats = async (event: H3Event) => {
  const client = await serverSupabaseClient(event)
  
  const [pages, services, inquiries] = await Promise.all([
    client.from('pages').select('count', { count: 'exact' }),
    client.from('services').select('count', { count: 'exact' }),
    client.from('inquiries').select('count', { count: 'exact' })
      .eq('status', 'new')
  ])

  return {
    totalPages: pages.count || 0,
    totalServices: services.count || 0,
    pendingInquiries: inquiries.count || 0
  }
}

export const fetchRecentInquiries = async (event: H3Event, limit = 5) => {
  const client = await serverSupabaseClient(event)
  
  const { data, error } = await client
    .from('inquiries')
    .select('*')
    .eq('status', 'new')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}