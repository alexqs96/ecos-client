import { Children } from 'react'
import { useGetFriendsListQuery } from '../redux/features/usersApi';

// realiza un fetch de la lista de usuarios

export default function FriendsList() {
  const { data: friendsList, isLoading, error } = useGetFriendsListQuery();

  if (error) {
    return <p>Hubo un error al solicitar los usuarios.</p>
  }

  if (isLoading) {
    return <p>Cargando Lista...</p>
  }

  return (
    <>
    <small>nuevos usuarios: </small>
    {
      friendsList?
      Children.toArray(
        friendsList.map(e => (
          <p>@{e.username}</p>
        ))
      )
      :
      <p>No hay usuarios</p>
    }
    </>
  )
}