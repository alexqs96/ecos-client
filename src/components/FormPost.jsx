import { useState } from 'react'
import { RxImage } from 'react-icons/rx'
import { getImageFile } from '../utils/utils'
import { useSelector } from 'react-redux'

// este form es para que el usuario publique posts
// esta incompleto falta integrarlo con redux
// se puede subir solo una foto, queda extenderlo para subir varias fotos
// queda mejorar el ui/ux de validaciones de campos o fallas del servidor

// detalles extras que podrian cambiar o mejorar

// cuenta con un handleSize para el input, esto cambia el tamaño del input en relacion al texto

const FormPost = () => {
  const user = useSelector((state) => state.user);
  const [image, setImage] = useState("")

  /**
   * cambia el tamaño del input segun el texto, dentro de heightLimitInPX se debe especificar la altura maxima
   */

  function handleResizeInput(e) {
    const lengthMin = 30
    const heightLimitInPX = 160

    if (e.target.value.length < 30) {
      e.target.style.height = "auto"
    } else if (e.target.scrollHeight > lengthMin && e.target.scrollHeight <= heightLimitInPX) {
      e.target.style.height = e.target.scrollHeight + "px"
    }

    return null
  }

  /**
   * maneja la subida del post al servidor
   */

  async function handleSubmit(e) {
    const sendButton = document.querySelector(".formPost button[type='submit']")
    sendButton.textContent = "Publicando"
    e.preventDefault()
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: e.target.content.value,
          image
        })
      })
      
      const statusText = await res.text()

      console.log("POST Request: "+statusText);

      if (res.status === 200) {
        sendButton.textContent = "Publicado 🥳"

        setTimeout(() => {
          //implementar context para evitar esto
          location.reload()
        }, 500);
      }
      else
      {
        sendButton.textContent = statusText
        document.querySelector(".formPost").style.borderColor = "#ff0000"
        
        setTimeout(() => {
          document.querySelector(".formPost").style.borderColor = "currentColor"  
          sendButton.textContent = "Publicar"
        }, 1500);
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * maneja la eliminacion de imagenes y setea en null el valor del input para que se vuelva a subir otra imagen
   */

  function removeImage(){
    setImage("")
    document.querySelector(".formPost input[type=file]").value = null
  }

  /**
   * maneja la conversion de la imagen a base64 para poder mostrarla al usuario y mandar ese valor al servidor
   */

  async function handleUpload(e){
    setImage(await getImageFile(e))
  }

  // valida si el usuario no se encuentra logueado para evitar renderizar el form

  if (!user) {
    return null
  }

  return (
    <>
    {
      user?.username?
      <div className="formPost">
        <img src='/img/default_profile.png' alt={"Foto de perfil"} />
        <form onSubmit={(e) => handleSubmit(e)}>
          <textarea
            className='softScrollbar'
            type="text"
            name="content"
            placeholder="Aa"
            onChange={(e) => handleResizeInput(e)}
          />
          {
            image ?
              <div className='postImage'>
                <button onClick={() => removeImage()}>X</button>
                <img src={image} alt="post image" />
              </div>
              :
              null
          }
          <div>
            <input type="file" accept="image/*" id="upload" hidden onChange={e => handleUpload(e.target.files[0])} />
            <label htmlFor="upload"><RxImage size={20} /></label>
            <button className='pressable' type="submit">Publicar</button>
          </div>
        </form>
      </div>
      :
      null
    }
    </>
  )
}

export default FormPost