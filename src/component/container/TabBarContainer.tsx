import React, { useMemo } from 'react'
import { Pressable, View, StyleSheet, Animated, ViewStyle, StyleProp } from 'react-native'
import {
  useNavigationBuilder,
  TabRouter,
  TabActions,
  createNavigatorFactory,
  DefaultNavigatorOptions,
  ParamListBase,
  TabNavigationState,
  TabRouterOptions,
} from '@react-navigation/native'
import FloatBg from '@view/FloatBg'
import FastImage from 'react-native-fast-image'

import R from '@resource'
import { AppText, AppTabView, AppTouchable } from '@uikit'
import { usePrevious } from '@hook/index'
import HeaderView, { LeftButton, RightButton } from '@view/HeaderView'

type ItemProps = {
  title?: string
  icon?: string
  selected?: boolean
  onPress: () => void
  state?: any
  image?: number
}

const styles = StyleSheet.create({
  floatButtonView: {
    position: 'relative',
    width: 100,
    alignItems: 'center',
  },
  title: {
    fontFamily: R.Fonts.Regular,
    color: R.Colors.Icon,
    fontSize: 12,
    lineHeight: 15,
    paddingTop: 10,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: R.Colors.TabBarBackground,
    height: 80,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: R.Colors.Border,
    zIndex: 2,
  },
  tabbarContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  overlayBottomView: {
    backgroundColor: R.Colors.TabBarBackground,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
  },
})

type TabNavigationConfig = {
  tabBarStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
}

type TabNavigationOptions = {
  tabBarLabel?: string
  icon?: string
}

type TabNavigationEventMap = {
  tabPress: {
    data: { isAlreadyFocused: boolean }
    canPreventDefault: true
  }
}

type TabbarContainerProps = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap
> &
  TabRouterOptions &
  TabNavigationConfig

const AbsoluteButton = (props: ItemProps): JSX.Element => {
  return (
    <View
      style={{
        position: 'absolute',
        top: R.Dimens.IsRatioEqualOrSmallerThanNormal ? -85 : -90,
        right: 0,
      }}
    >
      <AppTouchable
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: R.Dimens.TabBarHeight,
          height: R.Dimens.TabBarHeight,
        }}
        onPress={props.onPress}
      >
        <FastImage style={{ width: 80, height: 80 }} source={props.image} />
      </AppTouchable>
    </View>
  )
}

const FloatButton = (props: ItemProps): JSX.Element => {
  const bgSize = R.Dimens.IsRatioEqualOrSmallerThanNormal
    ? R.Dimens.TabBarHeight + 20
    : R.Dimens.TabBarHeight + 4
  return (
    <View style={styles.floatButtonView} pointerEvents="box-none">
      <FloatBg
        color={R.Colors.TabBarBackground}
        width={bgSize}
        height={bgSize}
        borderWidth={StyleSheet.hairlineWidth}
        style={{
          position: 'absolute',
          top: R.Dimens.IsRatioEqualOrSmallerThanNormal ? 0 : 8.5,
          left: -1,
        }}
      />
      <AppTouchable
        style={{
          top: -20,
          justifyContent: 'center',
          alignItems: 'center',
          width: R.Dimens.TabBarHeight,
          height: R.Dimens.TabBarHeight + 20,
        }}
        onPress={props.onPress}
      >
        <FastImage style={{ width: 80, height: 80 }} source={props.image} />
        <AppText
          style={[
            styles.title,
            {
              top: -7,
            },
          ]}
        >
          {props?.title}
        </AppText>
      </AppTouchable>
    </View>
  )
}

const TabBarItem = ({ title, icon, selected, onPress, state }: ItemProps): JSX.Element => {
  const color = selected ? R.Colors.TabBarSelected : R.Colors.Icon
  return (
    <Pressable key={`TabbarItem-${state.key}`} onPress={onPress} style={styles.item}>
      <R.Icon name={icon ?? ''} color={color} size={24} />
      <AppText style={[styles.title, { color, fontWeight: selected ? '700' : '400' }]}>
        {title}
      </AppText>
    </Pressable>
  )
}

function TabBarContainer({
  initialRouteName,
  children,
  screenOptions,
  tabBarStyle,
  contentStyle,
}: TabbarContainerProps) {
  const { state, navigation, descriptors, NavigationContent } = useNavigationBuilder(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  })

  const previousRouteIndex = usePrevious(state.index)

  const selectedRoute = useMemo(() => {
    if (state.routes?.length > state.index) {
      return state.routes?.[state.index]
    }
    return null
  }, [state.index])

  return (
    <NavigationContent>
      <HeaderView
        title={selectedRoute?.name}
        right={() => (
          <RightButton
            icon={'message-circle'}
            onPress={() => {
              console.log('PRESS MESSAGE')
            }}
          />
        )}
        left={() => (
          <LeftButton
            icon={'menu'}
            onPress={() => {
              console.log('PRESS MENU')
            }}
          />
        )}
      />
      <View style={[{ flex: 1 }, contentStyle]}>
        {state.routes.map((route, i) => {
          let direction: 'left' | 'right' = 'right'

          if (i > (previousRouteIndex ?? 0)) {
            direction = 'right'
          } else {
            direction = 'left'
          }

          return (
            <AppTabView
              key={`tabContainerView-${i}`}
              selected={i === state.index}
              direction={direction}
              disableAnim={previousRouteIndex === state.index}
            >
              {descriptors[route.key].render()}
            </AppTabView>
          )
        })}
      </View>
      <View style={[styles.tabbarContent, tabBarStyle]}>
        {state.routes.map((route, index) => {
          if (R.Enums.MAIN_TABS.includes(route.name as keyof typeof R.Enums.TABS)) {
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              })
              // @ts-ignore
              if (!event.defaultPrevented) {
                navigation.dispatch({
                  ...TabActions.jumpTo(route.name),
                  target: state.key,
                })
              }
            }
            if (route.name === R.Enums.TABS.AddOrder) {
              const button = {
                image: R.Images.btn_add_order,
                onPress: () => {
                  navigation.navigate('AddOrderScreen')
                },
                title: '',
              }
              if (R.Enums.MAIN_TABS.length > 5) {
                return (
                  <AbsoluteButton key={state.key} image={button.image} onPress={button.onPress} />
                )
              }
              return (
                <FloatButton
                  key={state.key}
                  title={button.title}
                  selected={index === state.index}
                  image={button.image}
                  onPress={button.onPress}
                />
              )
            }
            return (
              <TabBarItem
                key={`item-${route.key}`}
                state={state}
                title={descriptors[route.key]?.options?.tabBarLabel || route.name}
                onPress={onPress}
                icon={descriptors[route.key].options?.icon}
                selected={index === state.index}
              />
            )
          }
          return null
        })}
        <View style={styles.overlayBottomView} />
      </View>
    </NavigationContent>
  )
}

export const createTabBarNavigator = createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap,
  typeof TabBarContainer
>(TabBarContainer)
