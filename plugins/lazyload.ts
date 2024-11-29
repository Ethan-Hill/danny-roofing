export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('lazy', {
    mounted(el) {
      function loadImage() {
        if (el.tagName === 'IMG') {
          const img = el
          const src = img.getAttribute('data-src')
          if (src) {
            img.setAttribute('src', src)
            img.removeAttribute('data-src')
          }
        } else {
          const backgroundImage = el.getAttribute('data-background')
          if (backgroundImage) {
            el.style.backgroundImage = `url(${backgroundImage})`
            el.removeAttribute('data-background')
          }
        }
      }

      function handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage()
            observer.unobserve(el)
          }
        })
      }

      const observer = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      })

      observer.observe(el)
    }
  })
})
