import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import R from '../../resource'

interface FloatBgProps extends SvgProps {
  color?: string
  width?: number
  height?: number
  borderWidth?: number
}

export default function FloatBg({
  color = '#FFFFFF',
  width,
  height,
  borderWidth,
  ...props
}: FloatBgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 75 61" {...props}>
      <Path
        d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
        fill={color}
        stroke={R.Colors.Border}
        strokeWidth={(borderWidth ?? 0).toString()}
      />
    </Svg>
  )
}
