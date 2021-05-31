import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IPost } from '../context/model'
import axios from 'axios'

function Preview() {
  const params: { id: string } = useParams()
  const [posts, setPosts] = useState<[IPost] | undefined>()

  //retrieve posts from the server
  useEffect(() => {
    async function getPosts() {
      const postsFound = await axios.request<IPost>({
        method: 'GET',
        url: `http://localhost:5000/posts${params.id ? '/' + params.id : ''}`
      })
      setPosts([postsFound.data])
    }
    getPosts()
  }, [params.id])

  return (
    <div
      className='px-5 font-semibold'
      dangerouslySetInnerHTML={createMarkup(posts)}
    ></div>
  )
}
function createMarkup(posts: [IPost] | undefined) {
  return {
    __html: posts
      ? posts
          ?.map((post) =>
            JSON.stringify(post, undefined, 2).replace(
              /\n( *)/g,
              function (match, p1) {
                return '<br>' + '&nbsp;'.repeat(p1.length)
              }
            )
          )
          .toString()
      : 'wait...'
  }
}
export default Preview
