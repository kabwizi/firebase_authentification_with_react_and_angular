import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { SHOW_POP_UP } from '../context/actions'
import { useAppData } from '../context/appContext'
import axios from 'axios'

function Home() {
  const history = useHistory()
  const appState = useAppData()
  const [PostId, setPostId] = useState<number>(1)
  const [deleteId, setDeleteId] = useState<number>(1)
  let [showMiniPopUp, setShowMiniPopUp] = useState(false)
  let [deletedError, setDeletedError] = useState()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMiniPopUp(false)
    }, 3000)
    return () => {
      clearInterval(timer)
    }
  }, [showMiniPopUp])

  async function handleDeletPost() {
    try {
      await axios({
        method: 'DELETE',
        url: 'http://localhost:5000/posts/' + deleteId
      })
      setShowMiniPopUp(true)
      setDeletedError(undefined)
    } catch (error) {
      setDeletedError(error.message)
    }
  }

  return (
    <div>
      <h2 className='text-5xl font-black'>
        Welcom {appState?.state.user.user.email}
      </h2>
      <div className='mt-16 space-y-4'>
        <Link to='/preview' className='method-wrapper'>
          <div className='bg-green-500 method-name'>Get</div>
          <div className='p-5'>/post</div>
        </Link>
        <div
          onClick={(e) => {
            if ((e.target as HTMLDivElement).nodeName === 'DIV') {
              history.push(`/preview/${PostId}`)
            }
          }}
          className='method-wrapper'
        >
          <div className='bg-green-500 method-name'>Get</div>
          <div className='w-full flex justify-between items-center pr-5'>
            <div className='p-5'>/post/:id</div>
            <input
              className='border-2 w-16 h-10 pl-2'
              type='number'
              value={PostId}
              onChange={(e) => {
                if (Number(e.target.value) > 0) {
                  setPostId(Number(e.target.value))
                }
              }}
            />
          </div>
        </div>
        <div
          className='method-wrapper'
          onClick={() =>
            appState?.dispatch({
              type: SHOW_POP_UP,
              payload: { method: 'POST' }
            })
          }
        >
          <div className='bg-blue-500 method-name'>Post</div>
          <div className='p-5'>/post</div>
        </div>
        <div
          className='method-wrapper'
          onClick={() =>
            appState?.dispatch({
              type: SHOW_POP_UP,
              payload: { method: 'PUT' }
            })
          }
        >
          <div className='bg-yellow-500 method-name'>Put</div>
          <div className='p-5'>/post</div>
        </div>
        <div className='method-wrapper'>
          <div className='bg-red-500 method-name'>Delete</div>
          <div className='w-full flex justify-between items-center '>
            <div className='p-5 flex-1'>/post/:id</div>
            {showMiniPopUp ? (
              <p className='text-green-400 text-xs mr-4'>Deleted</p>
            ) : null}
            {deletedError ? (
              <p className='text-red-400 text-xs mr-4'>{deletedError}</p>
            ) : null}
            <input
              className='border-2 w-16 h-10 pl-2'
              type='number'
              value={deleteId}
              onChange={(e) => {
                if (Number(e.target.value) > 0) {
                  setDeleteId(Number(e.target.value))
                }
              }}
            />
            <div
              onClick={() => handleDeletPost()}
              className='bg-red-500 hover:bg-red-400 mx-5 py-2 px-4 text-white rounded-lg shadow-md'
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
