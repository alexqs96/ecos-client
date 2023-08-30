import { Link } from 'react-router-dom'

// pagina de error

const NotFound = () => {
  return (
    <main className='notfound'>
      <p>Oops</p>
      <p>Esta pagina no existe</p>
      <Link to="/" >Volver al Inicio</Link>
    </main>
  )
}

export default NotFound
