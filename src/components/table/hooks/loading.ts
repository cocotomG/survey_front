
export function useLoading() {
  const loadingRef = ref(false)

  function setLoading(loading: boolean) {
    loadingRef.value = loading
  }

  const getLoading = computed(() => unref(loadingRef))

  return {
    setLoading,
    getLoading,
  }
}
