export interface IState {
  user: IUser
  popUp: IPostOrUpdateMethod
}

interface IPostOrUpdateMethod {
  showPopUp: boolean
  method: 'POST' | 'PUT' | undefined
}

interface IUser {
  user: any | undefined
  userLoginState: string
  userIdToken: string | undefined
}

export interface IAction {
  type: string
  payload: {
    //user
    user?: any
    userIdToken?: string
    userLoginState?: string
    //popup
    method?: 'POST' | 'PUT' | undefined
  }
}

export interface IPost {
  id: number
  title: string
  body: string
}
