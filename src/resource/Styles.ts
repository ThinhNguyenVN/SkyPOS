import { StyleSheet } from 'react-native'
import * as Colors from './Colors'
import * as Fonts from './Fonts'
import * as Dimens from './Dimens'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ContentBackground,
    paddingTop: Dimens.MarginLarge,
  },

  scrollContainer: {
    paddingBottom: Dimens.TabBarHeight + Dimens.MarginLarge,
    backgroundColor: Colors.ContentBackground,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bold: {
    fontFamily: Fonts.Bold,
  },
  paddingTop: {
    paddingTop: 16,
  },
  space: {
    height: 16,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  rowWrap: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },

  imgIcon: {
    width: 24,
    height: 24,
  },
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    color: '#323F4B',
  },
  h2: {
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 30,
    color: '#323F4B',
  },
  h3: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    color: '#323F4B',
  },

  h4Bold: {
    fontFamily: Fonts.Bold,
    fontSize: 16,
    fontWeight: '700',
    color: '#323F4B',
  },
  h4: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#323F4B',
  },
  h5: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7B8794',
  },
  textDisable: {
    color: Colors.Disabled,
  },
  subText: {
    color: '#7B8794',
    fontWeight: '500',
    marginRight: 5,
  },

  listItem: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.Border,
  },

  topBarItem: {
    borderColor: '#7B8794',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  tabTitleSelected: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: Colors.TextColorSelected,
    textAlign: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
  tabTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: Colors.TextColor,
    paddingTop: 0,
  },
  tabContent: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  tabIndicator: {
    backgroundColor: '#323F4B',
    height: 4,
    marginBottom: -2,
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 55,
    left: 16,
    zIndex: 2,
  },
  lineWithoutMarginHorizontal: {
    marginVertical: 16,
  },
  disabled: {
    opacity: 0.4,
  },

  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: { fontSize: 5, marginRight: 8 },
  notificationText: {
    color: '#093269',
    fontSize: 14,
  },
  button: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  margin16: {
    height: 16,
  },
  margin24: {
    height: 24,
  },
  margin32: {
    height: 32,
  },
  dotSmall: {
    fontSize: 4,
    paddingHorizontal: 5,
    color: '#616161',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 32,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    paddingTop: 16,
    backgroundColor: Colors.ContentBackground,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },

  error: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.Red,
  },
})

export default styles