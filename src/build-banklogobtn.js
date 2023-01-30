import bankInfo from '@src/bank-info'

function buildBankLogoButton(iframe) {
  const rootDoc = iframe.contentDocument

  /* 首先检查dove-banklogo*/
  const targetButtonSpan = rootDoc.querySelectorAll('.dove-banklogo')
  if (targetButtonSpan.length > 0) {
    targetButtonSpan.forEach(function(span) {
      let svgPath
      try {
        if (span.title) {
          bankInfo.some(function(info) {
            const reg = new RegExp(info.regExp)
            if (reg.test(span.title)) {
              svgPath = info.logo
              return true
            }
          })
        }
        else {
          bankInfo.some(function(info) {
            const reg = new RegExp(info.name)
            if (reg.test(span.getAttribute('class'))) {
              svgPath = info.logo
              return true
            }
          })
        }
        if (!svgPath) {
          return
        }
        span.style.backgroundImage = `url(${svgPath})`
      } catch(error) {
        console.error(error)
      }
    })
  }

  /* 然后检查td */
  const targetTds = rootDoc.querySelectorAll('form td[valign=middle][align=left]')
  if (targetTds.length > 0) {
    targetTds.forEach(function(targetTd) {
      try {
        const targetTdText = targetTd.innerText
        const btnTitle = targetTdText
        let svgPath, 
        // bankName, 
        cardType = '', cardNumber = ''
        let superScriptText

        bankInfo.some(function(info) {
          const reg = new RegExp(info.regExp)
          if (reg.test(targetTdText)) {
            svgPath = info.logo
            // bankName = reg.exec(targetTdText)[0]
            return true
          }
        })

        if (!svgPath) {
          return
        }

        if (/((?:借记)|(?:储蓄))卡/.test(targetTdText)) {
          cardType = '储蓄卡'
        }
        if ((/((?:信用)|(?:贷记))卡/).test(targetTdText)) {
          cardType = '信用卡'
        }
        if (/\d{4,}/.test(targetTdText)) {
          const rawData = /\d{4,}/.exec(targetTdText)[0]
          cardNumber = `**${rawData.substring(rawData.length - 4)}`
        }
        if (/企业/.test(targetTdText)) {
          superScriptText = '企业'
        }

        let logoBtn = document.createElement('button')
        logoBtn.classList.add('uk-button')
        logoBtn.classList.add('uk-button-default')
        logoBtn.setAttribute('type', 'button')
        let logoSpan = document.createElement('span')
        logoSpan.classList.add('dove-banklogo')
        logoSpan.setAttribute('data-content', '银行和机构logo')
        logoSpan.setAttribute('title', btnTitle)
        logoSpan.style.backgroundImage = `url(${svgPath})`
        let cardTypeSpan = document.createElement('span')
        cardTypeSpan.innerText = cardType
        let cardNumberSpan = document.createElement('span')
        cardNumberSpan.innerText = cardNumber
        logoBtn.appendChild(logoSpan)
        logoBtn.appendChild(cardTypeSpan)
        logoBtn.appendChild(cardNumberSpan)

        targetTd.innerHTML = ''
        targetTd.appendChild(logoBtn)

        if (superScriptText) {
          let superScriptSpan = document.createElement('span')
          superScriptSpan.classList.add('uk-badge', 'dove-superscript')
          superScriptSpan.innerText = superScriptText
          targetTd.appendChild(superScriptSpan)
        }

      } catch (error) {
        console.error(error.stack)
      }
    })
  }

  /* 更改title */
  const titleSpanList = rootDoc.querySelectorAll('.dove-banklogo')
  if (titleSpanList.length > 0) {
    titleSpanList.forEach(function(titleSpan) {
      const title = titleSpan.getAttribute('title')
      if (title) {
        const newTitle = title.replace(/贷记卡/,'信用卡').replace(/借记卡/,'储蓄卡')
        titleSpan.setAttribute('title', newTitle)
      }
    })
  }
}

export default buildBankLogoButton