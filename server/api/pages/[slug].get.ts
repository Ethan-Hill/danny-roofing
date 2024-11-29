import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { slug } = event.context.params || {}

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug parameter is required'
    })
  }

  const { data, error } = await client
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }

  if (!data) {
    throw createError({
      statusCode: 404,
      message: 'Page not found'
    })
  }

  return data
})
