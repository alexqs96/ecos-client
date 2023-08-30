// pagina de inicio de registro, queda implementar react hook form para validar errores

export default function SignUp() {
  async function handleSubmit(e) {
    e.preventDefault()
    const signUpButton = document.querySelector(".authForm button[type='submit']")

    signUpButton.textContent = "Cargando..."
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
          name: e.target.name.value,
          surname: e.target.surname.value
        })
      })
      const resText = await res.text()

      if (res.ok) {
        location.replace("/ingresar")
      }
      
      document.querySelector("#server_msg").textContent = resText ? resText : ''
    } catch (error) {
      console.error(error);
    }
    signUpButton.textContent = "Unirme"
  }

  return (
    <main>
      <form
        className="authForm"
        onSubmit={(e) => handleSubmit(e)}
      >
        <p>Unite a Huertar</p>
        <label htmlFor="username">Usuario</label>
        <input type="text" name="username" id="username" placeholder="Usuario" />

        <label htmlFor="password">Password</label>
        <input type="text" name="password" id="password" placeholder="Contraseña" />

        <label htmlFor="name">Nombre</label>
        <input type="text" name="name" id="name" placeholder="Nombre" />

        <label htmlFor="surname">Apellido</label>
        <input type="text" name="surname" id="surname" placeholder="Apellido" />

        <button type="submit">Unirme</button>
      </form>
      <p id="server_msg"></p>
    </main>
  )
}
