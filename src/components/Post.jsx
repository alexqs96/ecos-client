import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/utils';
import { Children } from 'react';
import FormComments from './FormComments';
import { useSelector } from 'react-redux';
import { useGetPostsQuery } from '../redux/features/postsApi';

// este es el cuerpo de cada Post, el cual contiene
// seccion para acciones como like comentar y compartir

// estas acciones no estan implementadas todavia, queda pasarlo a redux para poder
// manejar el estado de carga y errores

// utiliza refetch para hacer dinamico el renderizado de las acciones
// esto podria mejorarse para mejorar ese renderizado especifico, por el momento lo dejo para la primera demo

const Post = ({data}) => {
  const user = useSelector((state) => state.user);
  const { refetch } = useGetPostsQuery()

  const handleLikes = async () => {
    try {
      if (!user) {
        return location.replace("/ingresar")
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/likes`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data._id
        })
      })

      const text = await res.text()
      
      if (res.status === 200) {
        console.log(text);
        refetch()
      }
      else
      {
        console.log(text);
      }

    } catch (error) {
      console.log("Error al likear: "+error);
    }
  }

  if (!data) {
    return null
  }

  return (
    <article className="post" data-post-id={data?._id}>
      
      <section>
        <Link to={"/"+data?.creator?.username}>
          <img className='profilePic' src='/img/default_profile.png' alt={"@" + data?.creator?.username + " Foto de perfil"} />
        </Link>
        <div>
          <Link to={"/"+data?.creator?.username}>@{data?.creator?.username}</Link>
          <small title={formatDate(data?.createdAt, false)}>{formatDate(data?.createdAt, true)}</small>
        </div>
      </section>
      
      <p>{data?.content}</p>

      {
        data?.images[0]?
        <img src={data?.images[0]} alt={"@" + data?.creator?.username + " Foto que publico"} />
        :
        null
      }
      
      <section>
        <button className='pressable' onClick={() => handleLikes()}>{(data?.likes)?.length > 0? (data?.likes)?.length+" " : null} {data?.likes? (data?.likes)?.includes(user?.username)? "Te Gusta" : "Dar me gusta" : "Dar me gusta"}</button>

        <button className='pressable' onClick={() => {
          const getSection = document.querySelector(`[data-post-id="${data?._id}"] [data-post-comments="true"]`)
          if (getSection.style.display === "none") {
            getSection.style.display = "flex"
          }
          else
          {
            getSection.style.display = "none"
          }
        }}>{(data?.comments)?.length > 0? (data?.comments)?.length+" " : null}Comentarios</button>

        <button className='pressable'>Compartir</button>
      </section>

      <section style={{display: "none"}} data-post-comments="true" className='comments'>
      <FormComments postId={data?._id} />
      {
        data?.comments?.length?
        <section className='col'>
        {
          Children.toArray(
          data?.comments.map(e => (
            <div className='row'>
            <Link to={"/"+e.creator?.username}><img className='picProfile' src='/img/default_profile.png' alt={"@" + e?.creator?.username + " Foto de perfil"} /></Link>
            <div>
              <Link to={"/"+e.creator?.username}>@{e.creator?.username}</Link>
              <p>{e.content}</p>
            </div>
            </div>
          )))
        }
        </section>
        :
        <p>No hay comentarios</p>
      }
      </section>
    </article>
  )
}

Post.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    creator: PropTypes.shape({
      username: PropTypes.string,
    }),
    content: PropTypes.string,
    images: PropTypes.array,
    likes: PropTypes.array,
    comments: PropTypes.array,
    createdAt: PropTypes.string
  }),
};

export default Post