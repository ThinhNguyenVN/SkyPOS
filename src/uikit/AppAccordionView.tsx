import { View, StyleSheet, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import R from '../resource'
import Accordion from 'react-native-collapsible/Accordion'
import AppText from './AppText'
import AppTouchable from './AppTouchable'

export type AppAccordionDataType = {
  title: string
  content: () => JSX.Element
}

type sectionType = {
  title: string
  content: () => JSX.Element
}

type AppAccordionViewProps = {
  data: AppAccordionDataType[]
  containerStyle?: ViewStyle
}

const PADDING = 16
const styles = StyleSheet.create({
  section: {
    // marginRight: PADDING,
    // marginHorizontal: PADDING,
    zIndex: 1,
  },
  accordionTouchable: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 8,
    alignItems: 'center',
  },
  title: {
    ...R.Styles.h4Bold,
  },
  content: {
    marginTop: PADDING,
  },
})

export default function AppAccordionView({ data, containerStyle }: AppAccordionViewProps) {
  const [activeSections, setActiveSections] = useState([])

  const renderAccordionView = () => {
    const renderAccordionHeader = (section: sectionType) => {
      return <AppText style={styles.title}>{section.title}</AppText>
    }

    const renderAccordionContent = (section: sectionType) => {
      return <View style={styles.content}>{section.content()}</View>
    }
    const updateSections = (actives: any) => {
      setActiveSections(actives)
    }

    const renderAccordionTouchable = (event: any) => {
      const expanded = event.accessibilityState?.expanded
      const icon = expanded ? 'chevron-up' : 'chevron-down'
      return (
        <View style={styles.section}>
          <AppTouchable style={styles.accordionTouchable} onPress={event.onPress}>
            {event.children}
            <R.Icon name={icon} size={24} color="#7B8794" />
          </AppTouchable>
        </View>
      )
    }

    return (
      <View style={containerStyle}>
        <Accordion
          activeSections={activeSections}
          sections={data}
          expandMultiple
          renderHeader={renderAccordionHeader}
          renderContent={renderAccordionContent}
          onChange={updateSections}
          touchableComponent={renderAccordionTouchable as never}
        />
      </View>
    )
  }
  return renderAccordionView()
}
