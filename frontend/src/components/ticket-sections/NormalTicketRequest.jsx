import React, { useState } from "react"
import { useTicketRequest } from "./UseTicketRequest"
import { userService } from "../../services/api"


const NormalTicketRequest = () => {
  const [formData, setFormData] = useState({
    dni: "",
    prioridad: false,
  })
  const { pedirTicket, error, success, loading, setError, setSuccess } = useTicketRequest()
  const [showOptions, setShowOptions] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await pedirTicket(formData)
    if (result === "success") {
      setFormData({ dni: "", prioridad: false })
      setShowOptions(false)
    } else if (result === "user_not_found") {
      setShowOptions(true)
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

export default NormalTicketRequest