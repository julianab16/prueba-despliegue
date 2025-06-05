import React, { useState } from "react"
import { api } from "../../services/api"


const TicketRequest = () => {
  const [formData, setFormData] = useState({
    dni: "",
    prioridad: false,
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const validateForm = () => {
    // Usa la misma regex que el modelo de User en el backend
    if (!/^\d{7,10}$/.test(formData.dni)) {
      return "No es un número de documento válido"
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    try {
      // 1. Buscar usuario por cédula
      const userRes = await api.get(`/api/users/by_dni/?dni=${formData.dni}`)
      const user = userRes.data[0]
      if (!user) {
        setError("Usuario no encontrado")
        setLoading(false)
        setShowOptions(true) // Mostrar opciones si no se encuentra el usuario
        return
      }
      // 2. Crear ticket
      await api.post("/api/tickets/", {
        title: "Ticket automático",
        description: "Ticket generado desde la web",
        user: user.id,
        priority: formData.prioridad ? "high" : "low", // <-- aquí el cambio
        content: "Default content",
      })
      setSuccess("Ticket creado exitosamente")
      setFormData({ dni: "", prioridad: false })
    } catch (err) {
      setError("Error al crear el ticket")
    } finally {
      setLoading(false)
    }
  }

  const handleGuest = () => {
    alert(`Ticket solicitado como invitado para la cédula: ${formData.dni}`)
    setShowOptions(false)
  }

  const handleRegister = () => {
    window.location.href = `/ticket-req/new-user?dni=${formData.dni}`;
  }

  const handleCorrectDni = () => {
    setShowOptions(false)
    setFormData((prev) => ({
      ...prev,
      dni: formData.dni,
    }))
  }

  return (
    <div className="ticket-request-center">
      <div className="form-container">
        <h2 className="form-title">Solicitar Ticket</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        {!showOptions ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="dni">Cédula</label>
            <input
              type="number"
              id="dni"
              name="dni"
              className="form-control"
              value={formData.dni}
              onChange={handleChange}
              placeholder="Ingrese su cédula"
              required
              disabled={loading}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Enviando..." : "Pedir ticket"}
            </button>
          </div>
        </form>
        ) : (
          <div className="ticket-options">
            <p>
              La cédula <strong>{formData.dni}</strong> no está registrada, regístrate para poder pedir un ticket
            </p>

            <div className="form-actions"> 

              <button className="btn btn-secondary" onClick={handleGuest}>
                Pedir ticket como invitado
              </button>

              <button className="btn btn-secondary" onClick={handleCorrectDni}>
                Corregir cédula
              </button>

            </div>
            <button className="btn btn-primary" onClick={handleRegister}>
              Registrarme
            </button>            
          </div>
        )}
      </div>
    </div>
  )
}

export default TicketRequest