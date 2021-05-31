import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { USER_LOGIN } from '../context/actions'
import { useAppData } from '../context/appContext'
import {
  loginUserWithEmailAndPassword,
  sendResetPassword,
  signInWithGoogle
} from '../firebase/authMethode'

function Login() {
  const appState = useAppData()
  const history = useHistory()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState()
  const [resetPassword, setResetPassword] = useState(false)

  //login with email and password
  async function handleLogIn() {
    if (
      emailRef.current &&
      passwordRef.current &&
      emailRef.current.value.trim() !== '' &&
      passwordRef.current.value.trim() !== ''
    ) {
      try {
        await loginUserWithEmailAndPassword(
          emailRef.current.value.trim(),
          passwordRef.current.value.trim()
        )
      } catch (error) {
        setError(error.message)
      }
    }
  }

  //login with google
  async function handleSigninWithGoogle() {
    try {
      await signInWithGoogle()
    } catch (error) {
      setError(error.message)
    }
  }

  //reset password
  async function handleResetPassword() {
    if (emailRef.current && emailRef.current.value.trim() !== '') {
      try {
        await sendResetPassword(emailRef.current.value.trim())
        setResetPassword(true)
        setError(undefined)
      } catch (error) {
        setError(error.message)
      }
    }
  }

  //automatically redirect the logged-in user to the home page
  useEffect(() => {
    if (appState && appState.state.user.userLoginState === USER_LOGIN) {
      history.push('/home')
    }
  }, [history, appState])

  return (
    <div className='shadow-xl w-96 p-10 rounded-lg'>
      <h2 className='font-black text-6xl text-center'>LOGIN</h2>
      <div className='mt-8 flex flex-col gap-5'>
        {resetPassword ? (
          <div className='text-center bg-green-200 rounded-lg py-2'>
            An email has been sent to you at {emailRef.current?.value}
          </div>
        ) : null}
        {error ? (
          <div className='text-center bg-red-200 rounded-lg py-2'>{error}</div>
        ) : null}
        <div
          className='btn-text flex gap-5 justify-center font-semibold'
          onClick={() => handleSigninWithGoogle()}
        >
          <img src='google.svg' alt='google icon' height='20' width='20' />
          Login with Google
        </div>
        <hr />
        <label className='text-lg font-semibold'>
          Email <span className='text-red-500'>*</span>
          <br />
          <input
            ref={emailRef}
            className='shadow-md rounded-lg px-4 py-2 w-full'
            type='text'
            placeholder='Enter your e-mail'
          />
        </label>
        <label className='text-lg font-semibold'>
          Password <span className='text-red-500'>*</span>
          <br />
          <input
            ref={passwordRef}
            className='shadow-md rounded-lg px-4 py-2 w-full'
            type='password'
            placeholder='Enter your password'
          />
        </label>
        <button onClick={() => handleLogIn()} type='button' className='btn'>
          Login
        </button>
        <Link to='/signin' className='btn-text text-sm'>
          Sign in
        </Link>
        <p className='btn-text text-xs' onClick={() => handleResetPassword()}>
          Forgot password
        </p>
      </div>
    </div>
  )
}

export default Login
