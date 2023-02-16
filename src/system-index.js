import chartJs from 'chart.js/dist/chart.min.js'
import BrowserDetector from 'browser-dtector'
const browser = new BrowserDetector(window.navigator.userAgent).parseUserAgent()

if (!browser.isIE) {
  document.write(`<script type="text/javascript" src="${chartJs}"></script>`)
  window.addEventListener('load', () => {
    try {
      const dataEl = document.querySelector('input#accountData')
      const ctx = document.querySelector('#accountDetails').getContext('2d')
      console.log('____________>sign2')
      Chart.defaults.font.size = 14
      return new Chart(ctx, config(dataEl))
    } catch(e) {
      console.error(e, e.stack)
    }  
  })
}

function config(el) {
  const data = el.dataset
  let theConfig = {
    type: 'bar',
    data: {
      labels: [data.sumAmtStrDisc, data.baseAmtDisc, data.otherBalanceDisc, 
        data.freezetotalDisc, data.jibenBalanceDisc, data.freezeBalanceDisc],
      datasets: [{
        data: [data.sumAmtStr, data.baseAmt, data.otherBalance, 
          data.freezetotal, data.jibenBalance, data.freezeBalance],
        backgroundColor: 'rgb(3, 78, 162)',
        borderColor: 'rgb(3, 78, 162)',
        // maxBarThickness: 100,
      }]
    },
    options: {
      aspectRatio: 4,
      indexAxis: 'y',
      interaction: {
        intersect: false,
        axis: 'y',
        mode: 'nearest'
      },
      // layout: {
      //   padding: 20
      // },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (item) => '￥' + item.parsed.x,
          }
        }
      },
      /*scales: {
        x: {
          position: 'top',
        },
      }*/
    }
  }
  return theConfig
}