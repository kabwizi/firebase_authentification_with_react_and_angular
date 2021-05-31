import Login from './components/Login'
import Navigation from './components/Navigation'
import Signin from './components/Signin'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import PreviewProtectedData from './components/Preview'
import PostOrPutPopUp from './components/PostOrPutPopUp'
import { useAppData } from './context/appContext'
import { USER_WAITING } from './context/actions'
import Preview from './components/Preview'
import PageNotFound from './components/404'

function App() {
  const appState = useAppData()
  return (
    <div>
      {appState?.state.user.userLoginState !== USER_WAITING ? (
        <div>
          <Router>
            <Navigation />
            <div className='w-full flex justify-center items-center my-10'>
              <Switch>
                <ProtectedRoute path='/previewProtectedData'>
                  <PreviewProtectedData />
                </ProtectedRoute>
                <ProtectedRoute path='/home'>
                  <Home />
                </ProtectedRoute>
                <Route path='/' exact>
                  <Login />
                </Route>
                <Route path='/signin'>
                  <Signin />
                </Route>
                <Route path='/preview/:id'>
                  <Preview />
                </Route>
                <Route path='/preview'>
                  <Preview />
                </Route>
                <Route path='*'>
                  <PageNotFound></PageNotFound>
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      ) : null}
      <PostOrPutPopUp />
    </div>
  )
}

export default App
