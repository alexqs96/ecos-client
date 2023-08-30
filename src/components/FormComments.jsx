import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { useGetPostsQuery } from '../redux/features/postsApi';

// esto forma parte del componente de Post pero lo separe por que vi que se volvio un poco extenso
// realiza la misma accion de refetch lo cual se podria mejorar a futuro
// valida si el usuario esta logueado para realizar el comentario, sino te redirecciona al login
// valida que el comentario no se encuentre vacio, quedaria mejorar la ui/ux
// por el momento marca el borde en rojo pero podria mejorarse
// quedaria implementar subida de imagenes

const FormComments = ({postId}) => {
  const user = useSelector((state) => state.user);
  const { refetch } = useGetPostsQuery()
  /**
   * Handles the form POST request to create a new comment
   */

    async function handleSubmit(e) {
      e.preventDefault()

      if (!user) {
        return location.replace("/ingresar")
      }

      if (!e.target.content.value) {
        document.querySelector(`[data-post-id='${postId}'] .formInline`).style.borderColor = "#ff0000"
          
        setTimeout(() => {
          document.querySelector(`[data-post-id='${postId}'] .formInline`).style.borderColor = "currentColor"
        }, 1500);
        
        return null
      }
      
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/comments`, {
          method: "POST",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: postId,
            content: e.target.content.value,
            image: ""
          })
        })
        


        const statusText = await res.text()
  
        console.log("POST Request: "+statusText);
  
        if (res.status === 200) {
          refetch()
          document.querySelector(`[data-post-id='${postId}'] .formInline input`).value = ""
        }
        else
        {
          document.querySelector(`[data-post-id='${postId}'] .formInline`).style.borderColor = "#ff0000"
          
          setTimeout(() => {
            document.querySelector(`[data-post-id='${postId}'] .formInline`).style.borderColor = "currentColor"
          }, 1500);
        }
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <form className='formInline' onSubmit={(e) => handleSubmit(e)}>
      <input type='text' name='content' placeholder='Escribi un comentario...'/>
      <button type='submit'>Comentar</button>
    </form>
  )
}

FormComments.propTypes = {
  postId: PropTypes.string
}


export default FormComments