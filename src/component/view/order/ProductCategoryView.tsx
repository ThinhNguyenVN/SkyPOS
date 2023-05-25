import { View, StyleSheet } from 'react-native'
import React from 'react'
import R from '@resource'
import { makeStyles } from '@rneui/base'
import { useGetProductCategories } from '@hook/useProduct'
import { AppImage, AppText, AppTouchable } from '@uikit'
import { ScrollView } from 'react-native-gesture-handler'

const useStyles = makeStyles(() => {
  const itemSize =
    Math.floor((R.Dimens.MaxWidth - R.Dimens.MarginMedium * 2) / 4) -
    R.Dimens.MarginMedium +
    Math.floor(R.Dimens.MarginMedium / 4)

  return {
    container: {
      width: R.Dimens.MaxWidth,
      height: R.Dimens.MaxHeight,
      backgroundColor: R.Colors.ContentBackground,
      borderRightColor: R.Colors.Border,
      borderRightWidth: StyleSheet.hairlineWidth,
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingLeft: R.Dimens.MarginMedium,
    },
    scrollContainer: {
      paddingBottom: 32,
    },
    category: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: R.Dimens.MarginMedium,
      marginRight: R.Dimens.MarginMedium,
      width: itemSize,
    },
    categoryImage: {
      width: itemSize,
      height: itemSize,
    },
    categoryText: {
      ...R.Styles.h5,
      paddingTop: 8,
    },
  }
})

export default function ProductCategoryView() {
  const styles = useStyles()
  const { data: categories } = useGetProductCategories()

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {categories?.map((category) => {
          return (
            <AppTouchable style={styles.category} key={`categori-${category.id}`}>
              <AppImage url={category.image} style={styles.categoryImage} showDefault />
              <AppText text={category.name} allowFontScaling style={styles.categoryText} />
            </AppTouchable>
          )
        })}
      </View>
    </ScrollView>
  )
}
