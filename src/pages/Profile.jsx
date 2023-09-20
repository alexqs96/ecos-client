import { Helmet } from 'react-helmet-async';
import { useGetProfileQuery } from '../redux/features/usersApi';
import { useParams } from 'react-router-dom';
import NotFound from './Error';
import { Children } from 'react';
import Post from '../components/Post';

// renderiza el perfil de cada usuario
// quedaria implementar la validacion del usuario que se encuentra logueado
// para mostrar mas opciones, esto se podria realizar usando el estado de redux

const Profile = () => {

  const {perfil} = useParams();
 
  const { isLoading, error, data: user } = useGetProfileQuery(perfil)
  
  if (isLoading) {
    return <p>Cargando Perfil...</p>
  }

  if (error) {
    return <NotFound />
  }

  return (
    <>
      <Helmet>
        <title>Perfil</title>
      </Helmet>
      <main>
        <h2>Perfil de {user.name}</h2>

        <h2>Mis Posts</h2>
        {
        user.posts?
          Children.toArray(
            user?.posts?.map(post => (
              <Post data={post}/>
            ))
          )
        :
        <p>No hay posts</p>
        }
      </main>
    </>
  )
}

export default Profile
