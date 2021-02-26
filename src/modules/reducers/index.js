import { combineReducers } from 'redux'

import { TokenReducer } from './Token__Reducer'
import { ToggleModalReducer } from './ToggleModal__Reducer'
import { ModalDefaultReducer } from './ModalDefault__Reducer'
import { PackageReducer } from './Package__Reducer'

export const rootReducers = combineReducers({
    TokenReducer,
    ToggleModalReducer,
    ModalDefaultReducer,
    PackageReducer
})