
import { IAction } from '../actions'

export const RESET_STORE = 'app/RESET_STORE'
export const SET_ADMIN_MODE = 'app/SET_ADMIN_MODE'
export const SET_NORMAL_MODE = 'app/SET_NORMAL_MODE'
export const SET_ACCEPT_COOKIES = 'app/SET_ACCEPT_COOKIES'

// Actions

export const setAdminMode = (): IAction => ({
  type: SET_ADMIN_MODE,
})

export const setNormalMode = (): IAction => ({
  type: SET_NORMAL_MODE,
})

export const setAcceptCookies = (value: boolean): IAction => ({
  type: SET_ACCEPT_COOKIES,
  payload: value,
})

// Reducers

const INITIAL_STATE = {
  isAdminMode: false,
  acceptCookies: true,
}

const appReducer = (state = INITIAL_STATE, action: IAction) => {
  switch (action.type) {
    case SET_ADMIN_MODE:
      return {
        ...state,
        isAdminMode: true,
      }
    case SET_NORMAL_MODE:
      return {
        ...state,
        isAdminMode: false,
      }
    case SET_ACCEPT_COOKIES:
      return {
        ...state,
        acceptCookies: action.payload
      }
    case RESET_STORE:
      return INITIAL_STATE
    default:
      return state
  }
}

export default appReducer
