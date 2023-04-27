import Images from './images'
import * as Dimens from './Dimens'
import * as Constants from './Constants'
import * as Enums from './Enums'
import * as Colors from './Colors'
import * as Fonts from './Fonts'
import Styles from './Styles'

import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import moonConfig from './selection.json'
const Icon = createIconSetFromIcoMoon(moonConfig, '', 'Icomoon.ttf')

const R = {
  Images,
  Dimens,
  Constants,
  Enums,
  Colors,
  Styles,
  Fonts,
  Icon,
}

export default R
