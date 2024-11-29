import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  try {
    // Get total pages count
    const { count: totalPages } = await client
      .from('pages')
      .select('*', { count: 'exact', head: true })

    // Get total services count
    const { count: totalServices } = await client
      .from('services')
      .select('*', { count: 'exact', head: true })

    // Get pending inquiries count
    const { count: pendingInquiries } = await client
      .from('inquiries')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    // Get recent inquiries
    const { data: recentInquiries } = await client
      .from('inquiries')
      .select('id, name, email, created_at')
      .order('created_at', { ascending: false })
      .limit(5)

    return {
      stats: {
        totalPages: totalPages || 0,
        totalServices: totalServices || 0,
        pendingInquiries: pendingInquiries || 0
      },
      recentInquiries: recentInquiries || []
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch dashboard statistics'
    })
  }
})
