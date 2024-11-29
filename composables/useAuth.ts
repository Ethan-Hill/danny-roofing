import { serverSupabaseClient } from '#supabase/server'
import type { H3Event } from 'h3'

export const useAuth = async (event: H3Event) => {
  const client = await serverSupabaseClient(event);
  const user = useSupabaseUser()
  const router = useRouter()

  const signIn = async (email: string, password: string) => {
    const { error } = await client.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return router.push('/admin')
  }

  const signOut = async () => {
    const { error } = await client.auth.signOut()
    if (error) throw error
    return router.push('/admin/login')
  }

  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    signIn,
    signOut,
    isAuthenticated
  }
}