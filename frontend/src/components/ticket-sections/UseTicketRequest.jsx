import { useState } from "react"
import { userService, ticketService } from "../../services/api"

export function useTicketRequest() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    dni: "",
    prioridad: false,
  })

  // Cambia el valor de retorno cuando el usuario no existe
  const pedirTicket = async ({ dni, prioridad }) => {
    setError("")
    setSuccess("")
    setLoading(true)
    try {
      if (!/^\d{7,10}$/.test(dni)) {
        setError("No es un número de documento válido")
        setLoading(false)
        return "invalid_dni"
      }
      const userRes = await userService.getByDni(dni)
      const user = userRes.data[0]
      console.log("Usuario encontrado:", user)
      if (!user) {
        setError("Usuario no encontrado")
        setLoading(false)
        return "user_not_found"
      }
      const ticketRes = await ticketService.create({
              user: user.id,
              priority: prioridad ? "high" : "low",
              status: 'open',           // o el valor por defecto que acepte tu modelo
      })
      setSuccess("Ticket creado exitosamente")
      setLoading(false)
      return {
        status: "success",
        user,
        ticket: ticketRes.data,
      }
    } catch (err) {
      setError("Error al crear el ticket")
      console.error(err.response ? err.response.data : err)
      setLoading(false)
      return "error"
    }
  }

  return { pedirTicket, error, success, loading, setError, setSuccess }
}