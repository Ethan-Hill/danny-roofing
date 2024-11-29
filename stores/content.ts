import { defineStore } from 'pinia'
import { useSupabaseClient } from '#imports'

// Define an interface for your inquiries
interface Inquiry {
  id: number;
  [key: string]: any;
}

export const useContentStore = defineStore('content', {
  state: () => ({
    pages: [] as any[],
    services: [] as any[],
    inquiries: [] as Inquiry[]
  }),
  
  actions: {
    async fetchPages() {
      const client = useSupabaseClient()
      const { data, error } = await client
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      this.pages = data || []
    },

    async fetchServices() {
      const client = useSupabaseClient()
      const { data, error } = await client
        .from('services')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      this.services = data || []
    },

    async fetchInquiries() {
      const client = useSupabaseClient()
      const { data, error } = await client
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      this.inquiries = data || []
    },

    updateInquiry(updatedInquiry: Inquiry) {
      const index = this.inquiries.findIndex(i => i.id === updatedInquiry.id)
      if (index !== -1) {
        this.inquiries[index] = updatedInquiry
      }
    },

    updateInquiryStatus(inquiryId: number, status: string) {
      const index = this.inquiries.findIndex(i => i.id === inquiryId)
      if (index !== -1) {
        this.inquiries[index] = {
          ...this.inquiries[index],
          status
        }
      }
    }
  }
})
