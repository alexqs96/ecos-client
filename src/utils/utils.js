//convierte la imagen a base64

export async function getImageFile (file) {
  try {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        resolve(reader.result);
      };
  
      reader.onerror = () => {
        reject(new Error('Error al leer la imagen'));
      };
  
      if (file) {
        reader.readAsDataURL(file);
      } else {
        reject(new Error('Error al cargar la imagen'));
      }
    }); 
  } catch (error) {
    return ""
  }
}

//para arreglar, la idea es que parsee los timestamps y que por que params se pueda elegir el estilo de la fecha/hora

export function formatDate(dateString, short) {
  const date = new Date(dateString)
  const today = new Date()

  if (short) {
    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth()) {
      const hour = date.toLocaleTimeString("es-ES", { hour: 'numeric' })
      const hourNow = today.toLocaleTimeString("es-ES", { hour: 'numeric' })

      return "hace "+(hourNow-hour)+" horas"
    } else {
      return date.toLocaleDateString("es-ES", { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' })+"."
    }
  }

  return date.toLocaleDateString("es-ES", { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})+"."
}