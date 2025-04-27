import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useSearchStore = defineStore('search', () => {
  const searchQuery = ref('')
  function setSearchQuery(query) {
    searchQuery.value = query
  }
  return {
    searchQuery,
    setSearchQuery,
  }
})
