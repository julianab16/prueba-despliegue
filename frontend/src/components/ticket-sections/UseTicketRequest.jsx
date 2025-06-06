import { useState } from "react"
import { api } from "../../services/api"

export function useTicketRequest() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

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
      const userRes = await api.get(`/api/users/by_dni/?dni=${dni}`)
      const user = userRes.data[0]
      if (!user) {
        setError("Usuario no encontrado")
        setLoading(false)
        return "user_not_found"
      }
      await api.post("/api/tickets/", {
        title: "Ticket automático",
        description: "Ticket generado desde la web",
        user: user.id,
        priority: prioridad ? "high" : "low",
        content: "Default content",
      })
      setSuccess("Ticket creado exitosamente")
      setLoading(false)
      return "success"
    } catch (err) {
      setError("Error al crear el ticket")
      setLoading(false)
      return "error"
    }
  }

  return { pedirTicket, error, success, loading, setError, setSuccess }
}