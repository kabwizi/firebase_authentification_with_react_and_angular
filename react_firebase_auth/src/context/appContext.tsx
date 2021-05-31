import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import app from '../firebase/firebase'
import {
  FETCH_USER_NO_USER,
  FETCH_USER_SUCESS,
  HIDE_POP_UP,
  SHOW_POP_UP,
  USER_LOGIN,
  USER_NOT_LOGIN,
  USER_WAITING
} from './actions'
import { IAction, IState } from './model'

const myContext =
  React.createContext<
    { state: IState; dispatch: React.Dispatch<IAction> } | undefined
  >(undefined)

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case FETCH_USER_SUCESS:
      return {
        ...state,
        user: {
          userLoginState: USER_LOGIN,
          user: action.payload.user!,
          userIdToken: action.payload.userIdToken!
        }
      }
    case FETCH_USER_NO_USER:
      return {
        ...state,
        user: {
          userLoginState: USER_NOT_LOGIN,
          user: action.payload.user!,
          userIdToken: action.payload.userIdToken!
        }
      }
    case SHOW_POP_UP:
      return {
        ...state,
        popUp: { method: action.payload.method, showPopUp: true }
      }
    case HIDE_POP_UP:
      return {
        ...state,
        popUp: { method: undefined, showPopUp: false }
      }
    default:
      return state
  }
}

const initialState: IState = {
  popUp: { method: undefined, showPopUp: false },
  user: {
    user: undefined,
    userLoginState: USER_WAITING,
    userIdToken: undefined
  }
}

function AppContext({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(
    () =>
      app.auth().onAuthStateChanged(async (user) => {
        if (user) {
          //retrieve the token of the currently logged in user
          const userIdToken = await user.getIdToken()
          dispatch({
            type: FETCH_USER_SUCESS,
            payload: { user: user, userIdToken: userIdToken }
          })
          /*
          configure axios so that it adds to all
          our requests to the server the token of
          the user currently connected
           */
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + userIdToken
        } else {
          dispatch({
            type: FETCH_USER_NO_USER,
            payload: { user: undefined, userIdToken: undefined }
          })
        }
      }),
    []
  )

  return (
    <myContext.Provider value={{ state: state, dispatch }}>
      {children}
    </myContext.Provider>
  )
}

export const useAppData = () => {
  return useContext(myContext)
}

export default AppContext
