import { Children, useEffect, useState } from "react"
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
const socket = io(import.meta.env.VITE_SOCKET_URL);

// A revisar, posiblemente se use para la seccion de chats, no esta terminado
// valida si el usuario esta logueado y manda su usuario al server
// para agregarlo a una lista de usuarios online

const FriendsOnline = () => {
  const user = useSelector((state) => state.user);
  const [userList, setUserList] = useState([])

  useEffect(() => {
    if (user) {
      socket.emit("connected", user?.username)
    }
  }, [user])

  useEffect(() => {
    socket.on('usersOnline', (users) => {
      setUserList(users)
    })
  }, [socket])
  

  return (
    <>
    <small>usuarios online: </small>
    <div>
    {
      Children.toArray(
        userList.map(e => (
          <p>{e === user?.username? e+" (Vos)" : e}</p>
        ))
      )
    }
    </div>
    </>
  )
}

export default FriendsOnline