import Images from './images'
import * as Dimens from './Dimens'
import * as Constants from './Constants'
import * as Enums from './Enums'
import * as Colors from './Colors'
import * as Fonts from './Fonts'
import Styles from './Styles'
import I18n from 'i18n-js'
import Locales from './locales'

import { getLocales } from 'react-native-localize'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import moonConfig from './selection.json'
const Icon = createIconSetFromIcoMoon(moonConfig, '', 'Icomoon.ttf')

I18n.fallbacks = true
I18n.locale = getLocales()?.[0]?.languageTag
I18n.translations = Locales

const R = {
  Images,
  Dimens,
  Constants,
  Enums,
  Colors,
  Styles,
  Fonts,
  Icon,
  I18n,
}

export default R
