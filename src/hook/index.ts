import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

export function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export function useDidUpdateEffect(fn: EffectCallback, inputs?: DependencyList) {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) {
      return fn()
    }
    didMountRef.current = true
  }, inputs)
}
