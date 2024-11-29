import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const body = await readBody(event)

  // Validate required fields
  if (!body.name || !body.email || !body.message) {
    throw createError({
      statusCode: 400,
      message: 'All fields are required'
    })
  }

  // Insert into inquiries table
  const { data, error } = await client
    .from('inquiries')
    .insert({
      name: body.name,
      email: body.email,
      message: body.message,
      status: 'new',
      created_at: new Date().toISOString(),
      phone: body.phone || null,
      service: body.service || null
    })
    .select()
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }

  return {
    success: true,
    data
  }
})
