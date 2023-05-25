import { StyleSheet } from 'react-native'
import * as Colors from './Colors'
import * as Fonts from './Fonts'
import * as Dimens from './Dimens'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ContentBackground,
  },
  containerWithPadding: {
    flex: 1,
    backgroundColor: Colors.ContentBackground,
    padding: 16,
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
    color: Colors.TextColor,
  },
  h2: {
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 30,
    color: Colors.TextColor,
  },
  h3: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    color: Colors.TextColor,
  },

  h4Bold: {
    fontFamily: Fonts.Bold,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.TextColor,
  },
  h4: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: Colors.TextColor,
  },
  h5: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.TextColor,
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
    color: Colors.TextColor,
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
    color: Colors.Gray,
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
    borderColor: Colors.Border,
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
