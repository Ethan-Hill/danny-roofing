export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const { auth } = useSupabaseClient()

  if (!user.value && to.path.startsWith('/admin')) {
    return navigateTo('/admin/login')
  }
})