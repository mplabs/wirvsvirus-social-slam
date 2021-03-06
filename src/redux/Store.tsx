import {
  Middleware,
  AnyAction,
  PreloadedState,
  compose,
  applyMiddleware,
  createStore,
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Dispatch } from 'react'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { reducer } from './Reducer'
import { saga } from './Saga'
import { ActionProp } from '../TypeUtils'

// export type LocalState = ReturnType<typeof reducer>
export type LocalState = {
  auth?: string
}

const STORAGE_NAME = 'slamStorage'
const STORAGE_EXPIRE = 'updatedAt'
const STORAGE_VERSION = 'slamStorageVersion'
const STORAGE_VERSION_NUMBER = '1'
const STORAGE_EXPIRY_TIME = 3 * (60 * 60 * 1000)

const setStorage = (key: string, value: string | object): void => {
  if (typeof value !== 'string') value = JSON.stringify(value)
  localStorage.setItem(key, value)
}

const getStorage = (key: string): string | null => {
  return localStorage.getItem(key)
}

const localStorageMiddleware: Middleware = ({ getState }) => {
  const core = (next: Dispatch<AnyAction>) => (action: any) => {
    const result = next(action)
    const now = new Date().getTime()
    const state = getState()
    const newState = {}

    for (let [key, value] of Object.entries(state)) {
      const newReducer = {}
      for (let [subKey, subValue] of Object.entries(value)) {
        newReducer[subKey] = subValue
      }
      newState[key] = newReducer
    }

    setStorage(STORAGE_NAME, newState)
    setStorage(STORAGE_EXPIRE, now.toString())
    setStorage(STORAGE_VERSION, STORAGE_VERSION_NUMBER)

    return result
  }

  return core
}

const hydrateStore = (): PreloadedState<LocalState> => {
  let localState: LocalState = {}
  const updatedAt = getStorage(STORAGE_EXPIRE)
  const storageVersion = getStorage(STORAGE_VERSION)
  const now = new Date().getTime()
  const expiryTime =
    STORAGE_EXPIRY_TIME + (updatedAt ? parseInt(updatedAt, 10) : 0)
  const isExpired = expiryTime < now

  if (isExpired || storageVersion !== STORAGE_VERSION_NUMBER) {
    setStorage(STORAGE_NAME, localState)
    return localState
  }

  const localStateJson = getStorage(STORAGE_NAME)

  if (localStateJson) {
    try {
      localState = JSON.parse(localStateJson)
    } catch (e) {
      setStorage(STORAGE_NAME, localState)
    }
  }

  return localState
}

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = composeWithDevTools({})
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware, localStorageMiddleware)
)

export const store = createStore(reducer, hydrateStore(), enhancer)

sagaMiddleware.run(saga)

export const action = (props: ActionProp) => store.dispatch(props)
