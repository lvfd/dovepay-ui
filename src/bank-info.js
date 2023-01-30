import abc from '@lyufudi/dove-utils/assets/images/banklogo/abc.svg'
import boc from '@lyufudi/dove-utils/assets/images/banklogo/boc.svg'
import bos from '@lyufudi/dove-utils/assets/images/banklogo/bos.svg'
import ccb from '@lyufudi/dove-utils/assets/images/banklogo/ccb.svg'
import ceb from '@lyufudi/dove-utils/assets/images/banklogo/ceb.svg'
import citic from '@lyufudi/dove-utils/assets/images/banklogo/citic.svg'
import cmb from '@lyufudi/dove-utils/assets/images/banklogo/cmb.svg'
import cmbc from '@lyufudi/dove-utils/assets/images/banklogo/cmbc.svg'
import comm from '@lyufudi/dove-utils/assets/images/banklogo/comm.svg'
import czb from '@lyufudi/dove-utils/assets/images/banklogo/czb.svg'
import gdb from '@lyufudi/dove-utils/assets/images/banklogo/gdb.svg'
import glb from '@lyufudi/dove-utils/assets/images/banklogo/glb.svg'
import hzcb from '@lyufudi/dove-utils/assets/images/banklogo/hzcb.svg'
import icbc from '@lyufudi/dove-utils/assets/images/banklogo/icbc.svg'
import lzccb from '@lyufudi/dove-utils/assets/images/banklogo/lzccb.svg'
import nbcb from '@lyufudi/dove-utils/assets/images/banklogo/nbcb.svg'
import qdccb from '@lyufudi/dove-utils/assets/images/banklogo/qdccb.svg'
import spabank from '@lyufudi/dove-utils/assets/images/banklogo/spabank.svg'
import spdb from '@lyufudi/dove-utils/assets/images/banklogo/spdb.svg'
import znx from '@lyufudi/dove-utils/assets/images/banklogo/znx.svg'
import bob from '@lyufudi/dove-utils/assets/images/banklogo/bob.svg'
import cib from '@lyufudi/dove-utils/assets/images/banklogo/cib.svg'
import psbc from '@lyufudi/dove-utils/assets/images/banklogo/psbc.svg'

let info = [
  {name: 'abc', regExp: '(?:农行)|(?:农业银行)', logo: abc},
  {name: 'boc', regExp: '(?:中行)|(?:中国银行)', logo: boc},
  {name: 'bos', regExp: '上海银行', logo: bos},
  {name: 'ccb', regExp: '(?:建行)|(?:建设银行)', logo: ccb},
  {name: 'ceb', regExp: '光大(?:银行)?', logo: ceb},
  {name: 'citic', regExp: '中信(?:银行)?', logo: citic},
  {name: 'cmb', regExp: '招商银行', logo: cmb},
  {name: 'cmbc', regExp: '民生银行', logo: cmbc},
  {name: 'comm', regExp: '(?:交行)|(?:交通银行)', logo: comm},
  {name: 'czb', regExp: '浙商银行', logo: czb},
  {name: 'gdb', regExp: '广发(?:银行)?', logo: gdb},
  {name: 'glb', regExp: '桂林银行', logo: glb},
  {name: 'hzcb', regExp: '杭州银行', logo: hzcb},
  {name: 'icbc', regExp: '(?:工行)|(?:工商银行)', logo: icbc},
  {name: 'lzccb', regExp: '(?:柳州银行)|(?:柳江柳银村镇银行)', logo: lzccb},
  {name: 'nbcb', regExp: '宁波银行', logo: nbcb},
  {name: 'qdccb', regExp: '青岛银行', logo: qdccb},
  {name: 'spabank', regExp: '平安(?:银行)?', logo: spabank},
  {name: 'spdb', regExp: '浦发(?:银行)?', logo: spdb},
  {name: 'znx', regExp: '浙江农.*', logo: znx},
  {name: 'bob', regExp: '北京银行', logo: bob},
  {name: 'cib', regExp: '兴业银行', logo: cib},
  {name: 'psbc', regExp: '(?:邮储银行)|(?:邮政储蓄银行)', logo: psbc},
]

export default info