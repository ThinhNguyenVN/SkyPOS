import { DependencyList, EffectCallback, useCallback, useEffect, useRef, useState } from 'react'

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

export function useStateCallback<T>(
  initialState: T,
): [T, (state: T, cb?: (state: T) => void) => void] {
  const [state, setState] = useState(initialState)
  const cbRef = useRef<((state: T) => void) | undefined>(undefined) // init mutable ref container for callbacks

  const setStateCallback = useCallback((state: T, cb?: (state: T) => void) => {
    cbRef.current = cb // store current, passed callback in ref
    setState(state)
  }, []) // keep object reference stable, exactly like `useState`

  useEffect(() => {
    // cb.current is `undefined` on initial render,
    // so we only invoke callback on state *updates*
    if (cbRef.current) {
      cbRef.current(state)
      cbRef.current = undefined // reset callback after execution
    }
  }, [state])

  return [state, setStateCallback]
}
