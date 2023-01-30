export default function() {
  try {
    var el = document.querySelector('#changeInfo[uk-modal]')
    if (!el) return
    UIkit.modal(el).show()
    bindReset()
    bindSubmit()
  } catch(e) {
    console.error('信息修改窗口初始化失败', e.stack)
  }
}

const data = () => {
  const input = document.querySelector('#changeInfoData')
  return input? input.dataset: null
}

const bindReset = () => {
  try {
    const cancel = document.querySelector('#dropRevise')
    cancel.addEventListener('click', () => {
      var pattern = data()? data().pattern: null
      if (pattern == 1)
          cleanPwdRecord("cleanLoginPwdRecord")
      if (pattern == 2)
          cleanPwdRecord("cleanPayPwdRecord")
      if (pattern == 3) {
          cleanPwdRecord("cleanLoginPwdRecord")
          cleanPwdRecord("cleanPayPwdRecord")
      }
    })
  } catch(e) {
    console.error('信息过期验证弹窗按钮绑定失败', e.stack)
  }
}

const cleanPwdRecord = (pwdtype) => {
  try {
    const userId = data()? data().userId: null
    const taccountid = data()? data().taccountid: null
    const ctx = data()? data().ctx: null
    $.ajax({
      type: "post",
      url: `${ctx}/logAction.do?m=${pwdtype}&userId=${userId}&taccountid=${taccountid}`,
      async: false,
      success: (res) => console.log('已重置', res),
      error: (e) => console.error('重置ajax失败', e.stack),
    })
  } catch(e) {
    console.error('重置失败', e.stack)
  }
}

const bindSubmit = () => {
  try {
    const pattern = data()? data().pattern: null
    const merty = data()? data().merty: null
    const ctx = data()? data().ctx: null
    const userId = data()? data().userId: null
    if (!ctx || !userId) throw new Error(`缺少参数: ctx=${ctx}, userId=${userId}`)
    let src
    if ((pattern == 1 || pattern == 3) && merty == 1) {
      src = `${ctx}/dovepayUserWebPayAction.do?m=pageRequestWithloguserid&functionName=individualUser/changeLoginPw&loguserid=${userId}`
      addListener('#shallRevise', src)
    }
    else if (pattern == 2 && merty == 1) {
      src = `${ctx}/dovepayUserWebPayAction.do?m=pageRequestWithloguserid&functionName=individualUser/modifyPayPwd&loguserid=${userId}`
      addListener('#shallRevise', src)
    }
    else if (pattern == 2 && merty == 0) {
      src = `${ctx}/dovepayUserWebPayAction.do?m=pageRequestWithloguserid&functionName=userController/changePayPwd&loguserid=${userId}`
      addListener('#shallRevise', src)
    }
    else if ((pattern == 1 || pattern == 3) && merty == 0) {
      src = `${ctx}/dovepayUserWebPayAction.do?m=pageRequestWithloguserid&functionName=userController/toChangeLoginPw&loguserid=${userId}`
      addListener('#shallRevise', src)
    }
    else {
      src = `${ctx}/protected/userAction.do?m=paypwdPage`
      addListener('#shallRevise', src)
    }
    const src1 = `${ctx}/dovepayUserWebPayAction.do?m=pageRequestWithloguserid&functionName=userController/updateEnterpriseInfoPre&loguserid=${userId}&uptype=licenseinfo`
    const src2 = `${ctx}/dovepayUserWebPayAction.do?m=pageRequestWithloguserid&functionName=userController/updateIndividualInfoPre&loguserid=${userId}&uptype=frinfo`
    const src3 = `${ctx}/dovepayUserWebPayAction.do?m=pageRequestWithloguserid&functionName=individualUser/updateIndividualInfoPre&loguserid=${userId}&uptype=idinfo`
    addListener('#shallRevise1', src1)
    addListener('#shallRevise2', src2)
    addListener('#shallRevise3', src3)
  } catch(e) {
    console.error('绑定提交修改按钮失败', e.stack)
  }
  function addListener(btnSelector, iframeSrc) {
    const btn = document.querySelector(btnSelector)
    if (!btn) return
    btn.addEventListener('click', () => {
      try {
        const el = document.querySelector('#changeInfo[uk-modal]')
        if (!el) return
        UIkit.modal(el).hide()
        document.getElementById('content_opr').src = iframeSrc
      } catch(e) {
        throw new Error(e)
      }
    })
  }
}