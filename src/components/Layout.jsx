import DarkMode from "./DarkMode"
import { Link, Outlet } from 'react-router-dom'
import { io } from "socket.io-client";
import { useGetUserDataQuery, useLogOutMutation } from "../redux/features/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { useEffect } from "react";
const socket = io(import.meta.env.VITE_SOCKET_URL);

// aca se encuentra el cuerpo de toda la app
// se puede editar el header y footer y el main se vuelve dinamico

// en el header obtiene los datos del usuario para renderizarlo en el nav bar derecho
// si el usuario se encuentra logueado lo guarda en el estado de redux
// dentro del return del header solo utiliza los datos del estado de redux

const Header = () => {
  const dispatch = useDispatch()
  const [logOutMutation] = useLogOutMutation()
  const user = useSelector((state) => state.user);
  const { data, isLoading } = useGetUserDataQuery()
  
  useEffect(() => {
    if (!isLoading) {
      dispatch(setUser(data))
    }
  }, [isLoading])
  
  const handleLogOut = async () => {
    socket.emit('logout',user?.username),
    await logOutMutation(),
    dispatch(setUser(null))
  }

  return (
    <header>
      <Link to="/" className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48">
          <rect width="48" height="48" fill="none"/>
          <path fill="currentColor" d="M45.7,36.9c-3.8-6.4-12.3-12.7-18.6-15.2a12.8,12.8,0,0,0-3.4-1c-1.7-.2-2.5-1.4-2.2-2.5s.8-1.4,1.9-1.3c3,.4,7.7,2.3,12.2,5.2l.9.6.3.2,1.2.8a1,1,0,0,0,1.6-.9c-.6-4.7-2.1-9.4-6.5-12.4S21.2,8,14,9.2a80.6,80.6,0,0,1-9.7,1.3H3a.9.9,0,0,0-.9,1.3l.4,1.2c3.1,9.4,7.4,22.3,17.8,25.4a17.4,17.4,0,0,0,4.5.6A19.5,19.5,0,0,0,38,33.7,29.4,29.4,0,0,1,42.3,39,1.9,1.9,0,0,0,44,40a2.2,2.2,0,0,0,1.3-.4A2.1,2.1,0,0,0,45.7,36.9Z"/>
        </svg>
        Ecos
      </Link>

      <nav className="twoTone">
        <DarkMode/>
        {
          isLoading?
          null
          :
          user?.username?
          <>
            <Link to={`/${user?.username}`}>@{user?.username}</Link>
            <button onClick={handleLogOut}>Salir</button>
          </>
          :
          <div>
            <Link to="/ingresar">Ingresar</Link>
            <Link to="/unirme">Unirme</Link>
          </div>
        }
      </nav>
    </header>
  )
}

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}


export default Layout
