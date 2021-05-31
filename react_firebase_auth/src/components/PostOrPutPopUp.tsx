import { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { HIDE_POP_UP } from '../context/actions'
import { useAppData } from '../context/appContext'
import axios from 'axios'

function PostOrPutPopUp() {
  const appState = useAppData()
  const idRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const [error, setError] = useState()
  const [success, setsuccess] = useState<string | undefined>()

  async function handleUpdatPost() {
    if (
      idRef.current &&
      titleRef.current &&
      bodyRef.current &&
      idRef.current.value.trim() !== '' &&
      titleRef.current.value.trim() !== '' &&
      bodyRef.current.value.trim() !== ''
    ) {
      try {
        await axios({
          method: 'PUT',
          url: 'http://localhost:5000/posts/' + idRef.current.value,
          data: {
            id: idRef.current.value.trim(),
            title: titleRef.current.value.trim(),
            body: bodyRef.current.value.trim()
          }
        })
        idRef.current.value = ''
        titleRef.current.value = ''
        bodyRef.current.value = ''
        setError(undefined)
        setsuccess('Your post has been updated')
      } catch (error) {
        setError(error.message)
        setsuccess(undefined)
      }
    }
  }
  async function handleAddPost() {
    if (
      titleRef.current &&
      bodyRef.current &&
      titleRef.current.value.trim() !== '' &&
      bodyRef.current.value.trim() !== ''
    ) {
      try {
        await axios({
          method: 'POST',
          url: 'http://localhost:5000/posts',
          data: {
            title: titleRef.current.value.trim(),
            body: bodyRef.current.value.trim()
          }
        })
        titleRef.current.value = ''
        bodyRef.current.value = ''
        setError(undefined)
        setsuccess('Your post has been added')
      } catch (error) {
        setError(error.message)
        setsuccess(undefined)
      }
    }
  }

  return ReactDOM.createPortal(
    <div
      className={`bg-black bg-opacity-10 inset-0  fixed flex justify-center items-center z-30 ${
        appState?.state.popUp.showPopUp
          ? 'opacity-100'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='bg-white w-96 px-10 pb-10 pt-5 shadow-2xl rounded-lg '>
        <p
          className='text-right text-red-500 font-bold cursor-pointer'
          onClick={() => {
            setError(undefined)
            setsuccess(undefined)
            appState?.dispatch({ type: HIDE_POP_UP, payload: {} })
          }}
        >
          Close
        </p>
        <h2 className='font-black text-6xl text-center'>
          {appState?.state.popUp.method}
        </h2>
        {success ? (
          <p className='bg-green-200 rounded-lg py-1 px-4 my-2 text-center'>
            {success} &#x1F60D;
          </p>
        ) : null}
        {error ? (
          <p className='bg-red-200 rounded-lg py-1 px-4 my-2 text-center'>
            {error} &#x1F62D;
          </p>
        ) : null}
        <div className='flex flex-col gap-4 '>
          {appState?.state.popUp.method === 'PUT' ? (
            <label className='text-lg font-semibold'>
              Id <span className='text-red-500'>*</span>
              <br />
              <input
                ref={idRef}
                className='shadow-md rounded-lg px-4 py-2 w-full'
                type='text'
                placeholder='Id of the post to modify'
              />
            </label>
          ) : null}
          <label className='text-lg font-semibold'>
            Title <span className='text-red-500'>*</span>
            <br />
            <input
              ref={titleRef}
              className='shadow-md rounded-lg px-4 py-2 w-full'
              type='text'
              placeholder='Enter the title'
            />
          </label>
          <label className='text-lg font-semibold'>
            Description <span className='text-red-500'>*</span>
            <br />
            <textarea
              ref={bodyRef}
              className='shadow-md rounded-lg px-4 py-2 w-full'
              placeholder='Enter the description'
              rows={4}
            ></textarea>
          </label>
          <button
            onClick={() =>
              appState?.state.popUp.method === 'POST'
                ? handleAddPost()
                : handleUpdatPost()
            }
            type='button'
            className='btn'
          >
            {appState?.state.popUp.method === 'POST'
              ? 'Post a new post'
              : 'Update the post'}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('post-or-update-pop-up')!
  )
}

export default PostOrPutPopUp
