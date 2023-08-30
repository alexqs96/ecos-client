// pagina de inicio de sesion, queda implementar react hook form para validar errores

export default function SignIn() {
  async function handleSubmit(e) {
    e.preventDefault()
    const submitButton = document.querySelector(".authForm button[type='submit']")

    submitButton.textContent = "Ingresando.."
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value
        })
      })
      const resText = await res.text()

      if (res.ok) {
        location.replace("/")
      }
      document.querySelector("#server_msg").textContent = resText || ''
    } catch (error) {
      console.error(error);
    }
    submitButton.textContent = "Ingresar"
  }

  const invitedMode = () => {
    document.querySelector("#username").value = "invitado"
    document.querySelector("#password").value = "invitado"

    document.querySelector(".authForm button[type='submit']").click()
  }

  return (
    <main>
      <form
        className="authForm"
        onSubmit={(e) => handleSubmit(e)}
      >
        <p>Bienvenido</p>
        <label htmlFor="username">Usuario</label>
        <input type="text" name="username" id="username" placeholder="Usuario" />

        <label htmlFor="password">Contraseña</label>
        <input type="text" name="password" id="password" placeholder="Contraseña" />
        
        <button type="submit">Ingresar</button>
      </form>

      <button className="demo" onClick={invitedMode}>Ingresar como Invitado</button>
      <p id="server_msg"></p>
    </main>
  )
}
