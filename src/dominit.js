import Logo from '@lyufudi/dove-utils/assets/images/dovepay.svg'

export default function() {
  try {
    init.logo()
  } catch(e) {
    console.error('页面初始化失败', e, e.stack)
  }
}

const init = {
  logo: () => {
    try {
      document.querySelectorAll('.uk-logo').forEach(el => {
        el.innerHTML = ''
        const img = document.createElement('img')
        img.src = Logo
        el.appendChild(img)
      })
    } catch(e) {
      console.error(e, e.stack)
    }
  }
}