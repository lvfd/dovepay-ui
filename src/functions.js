import { show as mgrShow, hide as mgrHide } from '@lyufudi/dove-utils/functions'
import BrowserDetector from 'browser-dtector'
const browser = new BrowserDetector(window.navigator.userAgent).parseUserAgent()

export var hideDropdown = () => {
  try {
    hide(document.querySelector('.uk-subnav'))
  } catch(e) {
    console.error('隐藏下拉菜单失败', e.stack)    
  }
  function hide(nav) {
    if (!nav) return
    const nodelist = nav.querySelectorAll('div[class*="dropdown"]');
    if (nodelist.length === 0) return;
    for (var i = 0; i < nodelist.length; i++) {
      UIkit.dropdown(nodelist[i]).hide(false);
    }
  }
}

export function setIframeHeight(iframe) {
  try {
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const menu = document.querySelector('#my_menu')
    const headerh = header? window.getComputedStyle(header).getPropertyValue('height'): 0
    const footerh = footer? window.getComputedStyle(footer).getPropertyValue('height'): 0
    const menuh = menu? window.getComputedStyle(menu).getPropertyValue('height'): 0
    const minHeight = parseInt(window.innerHeight) - parseInt(headerh) - parseInt(footerh) - parseInt(menuh)
    const icd = iframe.contentDocument
    const body = icd.body
    const html = icd.querySelector('html')
    const bodyh = body? window.getComputedStyle(body).getPropertyValue('height'): 0
    const htmlh = html? window.getComputedStyle(html).getPropertyValue('height'): 0
    const height = Math.max(parseInt(bodyh), parseInt(htmlh), minHeight)
    iframe.style.height = `${height}px`
    // console.log('----------------------->', height, bodyh, htmlh )
    return height
  } catch(e) {
    console.error('设置iframe高度失败', e.stack)
  }
}

export function display(iframe) {
  hideDropdown()
  if (!browser.isIE) {
    overlay('hide')
  }
  mgrShow(iframe)
}

export function hide(iframe) {
  try {
    if (!browser.isIE) {
      overlay('show', {transparent: true})
    }
    mgrHide(iframe)
  } catch(e) {
    console.error('隐藏iframe失败', e.stack)    
  }
}

function overlay (show, config/*{html: '<h1>loading</h1>', transparent: false}, iframe: '#iframeId'*/) {
  try {

    const html = config && config.html? config.html + '<span class="sr-only">加载中...</span>': '<div uk-spinner></div><span class="sr-only">加载中...</span>'
    const rootDocument = config && config.iframe? config.iframe.contentDocument: document
    const transparent = config && config.transparent === false? false: true
    const body = rootDocument.querySelector('body')
    const main = rootDocument.querySelector('main')
    const parentNode = main? main: body

    // /* dovePay项目存在zindex问题的nodelist */
    const nodelistCannotCover = rootDocument.querySelectorAll('.gblMHeader .nav ul li, .gblMHeader .nav ul li.dropdown a')

    /* 显示遮罩 */
    if (/^show/.test(show)) {

      if (rootDocument.querySelector('#loadingOverlay')) {
        return
      }

      /* 解决dovePay项目zindex问题 */
      if (nodelistCannotCover && nodelistCannotCover.length > 0) {
        nodelistCannotCover.forEach(function(nodeCannotCover) {
          nodeCannotCover.style.zIndex = 0
        })
      }

      /* parentNode隐藏滚动条 */
      parentNode.style.overflow = 'hidden'

      /* 建立遮罩层并添加 */
      const div = rootDocument.createElement('div')
      div.setAttribute('id', 'loadingOverlay')
      div.style.position = 'fixed'
      div.classList.add('uk-position-cover', 'uk-overlay', 'uk-flex', 'uk-flex-center', 'uk-flex-middle')
      if (transparent) {
        div.classList.add('uk-overlay-default')
      } else {
        div.style.backgroundColor = '#F4F6F6'
      }
      div.innerHTML = html
      parentNode.appendChild(div)

    }

    /* 隐藏遮罩 */
    if (/^hide/.test(show)) {

      const div = rootDocument.querySelectorAll('#loadingOverlay');
      if (div.length === 0) {
        return
      }
      
      /* 还原dovePay项目zindex */
      if (nodelistCannotCover && nodelistCannotCover.length > 0) {
        nodelistCannotCover.forEach(function(nodeCannotCover) {
          nodeCannotCover.style.zIndex = 2
        })
      }

      /* parentNode隐藏滚动条 */
      parentNode.style.overflow = 'initial'
      
      for (var i = 0; i < div.length; i++) {
        div[i].parentNode.removeChild(div[i]);
      }

    }
  } catch (e) {
    console.error(`遮罩层${show}操作失败`, e.stack)
  }
}

export function setSubNav() {
  try {
    if (browser.isIE) return
    UIkit.util.on('#my_menu div[uk-dropdown]', 'beforeshow', setActiveStyle)
    UIkit.util.on('#my_menu div[uk-dropdown]', 'hidden', removeActiveStyle)
  } catch(e) {
    console.error('绑定UIkit事件失败', e.stack)
  }
  function setActiveStyle(e) {
    const li = e.srcElement.parentElement
    if (!li) return
    li.classList.add('active')
  }
  function removeActiveStyle(e) {
    const li = e.srcElement.parentElement
    if (!li) return
    li.classList.remove('active')
  }
}

export var filter = (iframe, idArray/*, parameters*/) => {
  try {
    if (!iframe || !idArray) throw new Error('缺少参数')
    const id = iframe.contentDocument.body.id
    if (id) {
      return idArray.some((bodyId) => id === bodyId)
    }
  } catch(e) {
    console.error('定位iframe的href时出错', e.stack)
  }
}

export var catalog = [
  {jsp: 'accountsRecConfirm', id: 'accountsRecConfirmUi'},
  {jsp: 'accountsRecConfirmMessage', id: 'accountsRecConfirmMessage'},
  {jsp: 'accountsRecFastSuc', id: 'accountsRecFastSuc'},
  {jsp: 'accountsRecharge', id: 'accountsRechargeUi'},
  {jsp: 'accountsRecSucSuggest', id: 'accountsRecSucSuggest'},
  {jsp: 'accountsRecSuggest_AllBank', id: 'accountsRecSuggest_AllBank'},
  {jsp: 'addFastCard', id: 'addFastCardUi'},
  {jsp: 'rechargeError', id: 'rechargeError'},
  {jsp: 'exceptionPage', id: 'exceptionPage'},
  {jsp: 'rightByUserWeb', id: 'rightByUserWeb'},
]

export function init_step(progress, configArray) {
  if (!progress) return;
  var value = progress.value? progress.value: 0;
  var addvalue = configArray[0];
  var max = configArray[1]? configArray[1]: progress.max;
  var time = time? time: 1000;
  progress.max = max;
  progress.value = value + addvalue;
}

export function initModalShower(root) {
  var nodelist = root.querySelectorAll('*[data-showmodal]');
  if (nodelist.length < 1) return;
  for (var i = 0; i < nodelist.length; i++) {
    var node = nodelist[i];
    node.addEventListener('click', function(e) {
      var showid = this.getAttribute('data-showmodal');
      e.preventDefault();
      UIkit.modal(document.getElementById(showid)).show();
    });
  }
}

export function init_btn_countdown(config) {
  config.button.setAttribute('disabled', 'disabled');
  config.button.classList.remove('uk-button-secondary');
  var count = parseInt(config.count)*1000;   //控制发送按钮时间
  var showingCount = count;//显示倒计时数字
  var tik = setInterval(time, 1000);
  config.button.querySelector('.text').innerText = '秒后' + config.textDisable;
  config.button.querySelector('.count').innerText = config.count;
  setTimeout(reset, count);
  function time() {
    showingCount = showingCount - 1000; 
    config.button.querySelector('.count').innerText = showingCount/1000;
  }
  function reset() {
    config.button.removeAttribute('disabled');
    config.button.classList.add('uk-button-secondary');
    config.button.querySelector('.count').innerText = '';
    config.button.querySelector('.text').innerText = config.text;
    showingCount = count;
    clearTimeout(tik);
  }
}
// 执行根据内容高度决定iframe(uikit-modal)高度
export function adaptContentIframe(root) {
  var iframes = root? root.querySelectorAll('iframe[dp-adaptcontent]'):document.querySelectorAll('iframe[dp-adaptcontent]');
  if (iframes.length < 1) {
    return
  }
  for (var i = 0; i < iframes.length; i++) {
    var iframe = iframes[i];
    iframe.onload = resize;
  }
  function resize() {
    try {
      var wrap = this.parentElement;
      if (wrap.tagName.toLowerCase() === 'div') {
        wrap.style.overflow = 'auto';
        wrap.style.width = '100%';
      }
      var wrapPadding = parseInt(getComputedStyle(this).getPropertyValue('padding-top')) +
                        parseInt(getComputedStyle(this).getPropertyValue('padding-bottom'));
      this.style.width = 'inherit'
      const contentHeight = this.contentDocument.body.offsetHeight
      let finalHeight = parseInt(contentHeight + wrapPadding)
      const footDialog = this.contentDocument.querySelector('.foot.dialog')
      if (footDialog) {
        finalHeight += parseInt(window.getComputedStyle(footDialog).getPropertyValue('margin-bottom'))
      }
      this.style.height = finalHeight + 'px'
    } catch (e) {
      if (console) console.error(e);
    }
  }
}

