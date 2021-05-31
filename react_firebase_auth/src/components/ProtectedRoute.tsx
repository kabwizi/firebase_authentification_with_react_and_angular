import { Redirect, Route } from 'react-router-dom'
import { USER_LOGIN } from '../context/actions'
import { useAppData } from '../context/appContext'

function ProtectedRoute({
  children,
  path,
  ...rest
}: {
  children: JSX.Element
  path: string
  rest?: any
}) {
  const appState = useAppData()

  return (
    <Route
      {...rest}
      exact
      render={({ location }) =>
        appState && appState.state.user.userLoginState === USER_LOGIN ? (
          children
        ) : (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )
      }
    />
  )
}

export default ProtectedRoute
