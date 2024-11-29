import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data, error } = await client
    .from('services')
    .select('id, title, description, icon')
    .order('title')

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }

  return data || []
})
