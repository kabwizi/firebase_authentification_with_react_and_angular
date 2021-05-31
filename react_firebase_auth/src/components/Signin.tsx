import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { USER_LOGIN } from '../context/actions'
import { useAppData } from '../context/appContext'
import { signinUserWithEmailAndPassword } from '../firebase/authMethode'

function Signin() {
  const history = useHistory()
  const appState = useAppData()
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState()

  async function handleSignIn() {
    if (
      firstNameRef.current &&
      lastNameRef.current &&
      emailRef.current &&
      passwordRef.current &&
      firstNameRef.current.value.trim() !== '' &&
      lastNameRef.current.value.trim() !== '' &&
      emailRef.current.value.trim() !== '' &&
      passwordRef.current.value.trim() !== ''
    ) {
      try {
        await signinUserWithEmailAndPassword(
          emailRef.current.value.trim(),
          passwordRef.current.value.trim()
        )
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
    <div className='shadow-xl p-10 rounded-lg'>
      <h2 className='font-black text-6xl text-center'>SIGN IN</h2>
      <div className='mt-8 flex flex-col gap-5'>
        {error ? (
          <div className='text-center bg-red-200 rounded-lg py-2'>{error}</div>
        ) : null}
        <div className='flex gap-8'>
          <label className='text-lg font-semibold flex-1'>
            First name <span className='text-red-500'>*</span>
            <br />
            <input
              ref={firstNameRef}
              className='shadow-md rounded-lg px-4 py-2 w-full'
              type='text'
              placeholder='Eg: Jhon'
            />
          </label>
          <label className='text-lg font-semibold flex-1'>
            Last name <span className='text-red-500'>*</span>
            <br />
            <input
              ref={lastNameRef}
              className='shadow-md rounded-lg px-4 py-2 w-full'
              type='text'
              placeholder='Eg: Doe'
            />
          </label>
        </div>
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
        <button onClick={() => handleSignIn()} type='button' className='btn'>
          Sign in
        </button>
        <Link to='/' className='btn-text text-sm'>
          Login
        </Link>
      </div>
    </div>
  )
}

export default Signin
