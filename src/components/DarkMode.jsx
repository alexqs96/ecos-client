import {RxMoon, RxSun, RxDesktop } from 'react-icons/rx'

const DarkMode = () => {
  
  /**
 * Maneja el cambio de tema de la pagina
 * para estilar en modo oscuro solo se debe crear una clase nueva pero anteponiendo la clase .dark
 * por ejemplo: .dark header{ background-color: black }
 */

  function changeTheme(theme) {
    document.documentElement.classList.remove("light")
    document.documentElement.classList.remove("dark")

    switch (theme) {
      case 'dark':
        document.documentElement.classList.add('dark')
        localStorage.theme = "dark"
        break;
      case 'light':
        document.documentElement.classList.add('light')
        localStorage.theme = "light"
        break;
      default:
        document.documentElement.classList.add(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        localStorage.removeItem('theme')
        break;
    }
  }

  return (
    <>
      <button onClick={() => changeTheme('light')} aria-label="activar tema claro">
        <RxSun size={18} />
      </button>
      <button onClick={() => changeTheme('dark')} aria-label="activar tema oscuro">
        <RxMoon size={18} />
      </button>
      <button onClick={() => changeTheme('system')} aria-label="activar tema automatico">
        <RxDesktop size={18} />
      </button>
    </>
  )
}

export default DarkMode
