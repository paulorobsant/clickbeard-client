
import { combineReducers } from 'redux'
import storage from 'redux-persist/es/storage'
import { IAction } from './actions'
import appReducer from './ducks/app'
import authReducer, { types as authTypes } from './ducks/auth'

const stateReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
})

const rootReducer = (state: any, action: IAction) => {
  if (action.type === authTypes.USER_LOGOUT) {
    storage.removeItem('persist:root')
    state = undefined
  }

  return stateReducer(state, action)
}

export default rootReducer
