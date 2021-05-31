import { Link } from 'react-router-dom'
import { logOut } from '../firebase/authMethode'
import { useAppData } from '../context/appContext'
import { USER_LOGIN, USER_NOT_LOGIN } from '../context/actions'

function Navigation() {
  const appState = useAppData()

  return (
    <nav className='shadow-lg flex justify-between items-center p-5'>
      <Link to='/' className='font-black text-3xl'>
        React Firebase Auth
      </Link>
      <div className='flex items-center gap-4 font-semibold'>
        <Link to='/home' className='btn-text'>
          Home
        </Link>
        {appState?.state.user.userLoginState === USER_NOT_LOGIN ? (
          <Link to='/' className='btn-text'>
            Login
          </Link>
        ) : null}

        {appState?.state.user.userLoginState === USER_LOGIN ? (
          <button onClick={() => logOut()} className='btn px-5'>
            Logout
          </button>
        ) : null}
      </div>
    </nav>
  )
}

export default Navigation
