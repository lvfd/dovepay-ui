import BrowserDetector from 'browser-dtector'
import uk_css_v2 from '@lyufudi/uikit-v2/dist/css/uikit.min.css'
import '@lyufudi/uikit-v2/dist/fonts/fontawesome-webfont.ttf'
import '@lyufudi/uikit-v2/dist/fonts/fontawesome-webfont.woff'
import '@lyufudi/uikit-v2/dist/fonts/fontawesome-webfont.woff2'
import '@lyufudi/uikit-v2/dist/fonts/FontAwesome.otf'
import uk_js_v2 from '@lyufudi/uikit-v2/dist/js/uikit.min.js'
import uk_css_lts from '@lyufudi/uikit/dist/css/uikit.dove-theme.min.css'
import uk_js_lts from '@lyufudi/uikit/dist/js/uikit.min.js'
import uk_icons_js_lts from '@lyufudi/uikit/dist/js/uikit-icons.min.js'
import jquery_v2 from 'jquery-v2'
import jquery_lts from 'jquery-lts'
import dom4 from 'dom4'
import showmodaldialog from 'showmodaldialog'
import { import as addDom } from '@lyufudi/dove-utils'
import dovepay_iframe_css from '@lyufudi/dove-utils/assets/styles/dovepay-iframe.css'

const browser = new BrowserDetector(window.navigator.userAgent).parseUserAgent()

export default (iframe) => {
  if (browser.isIE) {
    return iframe?
    Promise.all([
      addDom({url: uk_css_v2, type: 'link', root: iframe}),
      addDom({url: dovepay_iframe_css, type: 'link', root: iframe}),
      addDom({url: jquery_v2, type: 'script', root: iframe}),
      addDom({url: dom4, type: 'script', root: iframe})
    ])
    .then(() => addDom({url: uk_js_v2, type: 'script', root: iframe}))
    .catch(e => console.log(e))
    : document.write(`
      <link type="text/css" rel="stylesheet" href="${uk_css_v2}">
      <script type="text/javascript" src="${jquery_v2}"></script>
      <script type="text/javascript" src="${uk_js_v2}"></script>
      <script type="text/javascript" src="${dom4}"></script>
    `)
  }
  else {
    return iframe?
    Promise.all([
      addDom({url: uk_css_lts, type: 'link', root: iframe}),
      addDom({url: dovepay_iframe_css, type: 'link', root: iframe}),
      addDom({url: uk_js_lts, type: 'script', root: iframe}), 
      addDom({url: showmodaldialog, type: 'script', root: iframe})
    ])
    .then(() => addDom({url: uk_icons_js_lts, type: 'script', root: iframe}))
    .catch(e => console.log(e))
    : document.write(`
      <link type="text/css" rel="stylesheet" href="${uk_css_lts}">
      <script type="text/javascript" src="${jquery_lts}"></script>
      <script type="text/javascript" src="${uk_js_lts}"></script>
      <script type="text/javascript" src="${uk_icons_js_lts}"></script>
      <script type="text/javascript" src="${showmodaldialog}"></script>
    `)
  }
}