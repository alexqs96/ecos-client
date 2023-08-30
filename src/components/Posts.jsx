import { Children } from 'react'
import Post from './Post'
import { useGetPostsQuery } from '../redux/features/postsApi'

// realiza el fetch de los posts que se muestran en el home.

export default function Posts() {
  const { isLoading, error, data: posts } = useGetPostsQuery()

  if (error) {
    return <p>Hubo un error al solicitar los posts.</p>
  }

  if (isLoading) {
    return <p>Cargando Posts...</p>
  }

  return (
    <>
    {
    posts?
      Children.toArray(
        posts.map(post => (
          <Post data={post}/>
        ))
      )
    :
    <p>No hay posts</p>
    }
    </>
  )
}