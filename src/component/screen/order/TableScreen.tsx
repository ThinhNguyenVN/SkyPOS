import { View, StyleSheet } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { AppText } from '@uikit'
import R from '@resource'
import { useGetTableCategoryList } from '@hook/useTable'
import { FlashList } from '@shopify/flash-list'
import { ITable, ITableCategory } from '@modal'
import TableItemView from '@view/order/TableItemView'

const styles = StyleSheet.create({
  container: {
    ...R.Styles.scrollContainer,
    paddingBottom: 200,
  },
  header: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: R.Colors.LightGray,
  },
  headerText: {
    ...R.Styles.h3,
  },
})

interface SectionType extends ITable {
  type?: 'category' | 'table'
  data?: ITable | ITableCategory
}

export default function TableScreen() {
  const { data: tableCategories } = useGetTableCategoryList()

  const sections = useMemo(() => {
    const arr: SectionType[] = []
    if (tableCategories?.length) {
      tableCategories?.forEach((category) => {
        arr.push({
          type: 'category',
          data: category,
        } as SectionType)

        if (category.tables?.length) {
          category.tables?.forEach((i) => {
            arr.push(i)
          })
        }
      })
    }

    return arr
  }, [tableCategories])

  const stickyHeaderIndices = sections
    ?.map((item, index) => {
      if (item.type === 'category') {
        return index
      } else {
        return null
      }
    })
    .filter((item) => item !== null) as number[]

  return (
    <FlashList
      data={sections}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
        if (item.type === 'category') {
          return (
            <View style={styles.header}>
              <AppText style={styles.headerText}>{item?.data?.name}</AppText>
            </View>
          )
        } else {
          return <TableItemView item={item} />
        }
      }}
      stickyHeaderIndices={stickyHeaderIndices}
      getItemType={(item) => {
        return item.type === 'category' ? 'sectionHeader' : 'row'
      }}
      estimatedItemSize={100}
    />
  )
}
