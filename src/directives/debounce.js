const debounce = {
  // 传函数
    inserted: (el, binding) => {
      console.log(123)
      let timer
      el.addEventListener('click', () => {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          binding.value()
        }, 1000)
      })
    },
  }
  
  export default debounce