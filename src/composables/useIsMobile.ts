import { onMounted, ref } from 'vue'
import responsiveObserve from '~/utils/responsiveObserve'

export default function useIsMobile() {
  const isMobile = ref(false)

  onMounted(() => {
    responsiveObserve.subscribe((screens) => {
      if (screens.md)
        isMobile.value = true

      else
        isMobile.value = false
    })
  })

  return isMobile
}
