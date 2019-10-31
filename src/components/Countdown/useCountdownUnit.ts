import {Key, useState, useMemo} from 'react'
import {PartialBy} from '../../utils'

export type TCountdownUnit = {
  name: string
  key: Key
  value: number
}

type partialKeys =
  | 'key'
  | 'value'
export type useCountdownUnitParams = PartialBy<TCountdownUnit, partialKeys>
export type TSetCountdownUnitParams = Partial<TCountdownUnit>
export type TSetCountdownUnit = (params: TSetCountdownUnitParams) => void

function useCountdownUnit(params: useCountdownUnitParams): [TCountdownUnit, TSetCountdownUnit] {
  const {
    name,
    key = name,
    value = 0,
    ...restParams
  } = params

  const [state, setState] = useState<TCountdownUnit>({
    name,
    key,
    value,
    ...restParams,
  })

  const setCountdownUnit = useMemo<TSetCountdownUnit>(() => partialState => setState({
    ...state,
    ...Object.fromEntries(Object.entries(partialState).filter(([_, value]) => value !== undefined)),
  }), [state])

  return [state, setCountdownUnit]
}

export default useCountdownUnit
