import { iframe as setIframe } from '@lyufudi/dove-utils'
import dominit from '@src/dominit'
import iframeContentHandler from '@src/contentDocument'
import {setIframeHeight, display, hide, setSubNav, adaptContentIframe} from '@src/functions'
import getVendor from '@src/vendor'
import dovepay_css from '@lyufudi/dove-utils/assets/styles/dovepay.css'

getVendor()
document.write(`<link type="text/css" rel="stylesheet" href="${dovepay_css}">`)
window.addEventListener('DOMContentLoaded', main)

function main() {
  try {
    dominit()
    setSubNav()
    adaptContentIframe()
    const iframe = document.querySelector('#content_opr')
    setIframeHeight(iframe)
    window.addEventListener('resize', () => setIframeHeight(iframe))
    setIframe(iframe, iframeContentHandler, {show: display, hide: hide})
  } catch(e) {
    console.error('页面框架main.js处理失败', e.stack)
  }
}