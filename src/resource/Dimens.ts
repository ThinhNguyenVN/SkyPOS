import { Dimensions, Platform, StatusBar } from 'react-native'
import { hasDynamicIsland, hasNotch } from 'react-native-device-info'

export const Dimension = Dimensions.get('window')
export const ScreenWidth = Dimensions.get('screen').width
export const ScreenHeight = Dimensions.get('screen').height
export const StatusBarHeight = Platform.OS === 'ios' ? 20 : 24
export const MaxWidth = Dimension.width
export const MaxHeight = Dimension.height
export const IsSmallWidth = MaxWidth <= 360
export const IsSmallHeight = MaxHeight / MaxWidth <= 1.5
export const IsRatioEqualOrSmallerThanNormal = MaxHeight / MaxWidth <= 1.775
export const IsLongDevice = MaxHeight / MaxWidth >= 2
export const TopBarHeight = hasDynamicIsland() ? 95 : hasNotch() ? 90 : 80
export const TabBarHeight = IsRatioEqualOrSmallerThanNormal ? 80 : 96
export const ContentHeight = MaxHeight - TopBarHeight - TabBarHeight
export const BottomSheetMarginTop = (StatusBar.currentHeight || 0) + 68
export const BottomSheetDefaultHeight =
  MaxHeight - BottomSheetMarginTop - (Platform.OS === 'android' ? 180 : 200)

export const MarginTiny = IsSmallHeight ? 2 : 4
export const MarginSmall = IsSmallHeight ? 4 : 8
export const MarginRegular = IsSmallHeight ? 6 : 12
export const MarginMedium = IsSmallHeight ? 8 : 16
export const MarginLarge = IsSmallHeight ? 16 : 32
export const MarginPopup = 288

export const PaddingTiny = IsSmallHeight ? 2 : 4
export const PaddingSmall = IsSmallHeight ? 4 : 8
export const PaddingRegular = IsSmallHeight ? 6 : 12
export const PaddingMedium = IsSmallHeight ? 8 : 16
export const PaddingLarge = IsSmallHeight ? 16 : 32

export const DefaultFontSize = 16
export const DefaultLineHeight = 24

export const ButtonHeight = 52
export const MaterialItemWidth = (MaxWidth - 16) / 2 - 16
export const MaterialItemHeight = MaterialItemWidth + 68
export const ThumbnailWidth = 200
export const ItemWithByColumnNumber = (numberColumn: number) => {
  'worklet'
  return (MaxWidth - 16) / numberColumn - 16
}
