import React, { useState } from "react"

const TicketRequest = () => {
  const [formData, setFormData] = useState({
    dni: "",
    prioridad: false,
  })
  const [showOptions, setShowOptions] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //Aqui por defecto se muestran las opciones cuando no está registrado
    setShowOptions(true)
  }

  const handleGuest = () => {
    alert(`Ticket solicitado como invitado para la cédula: ${formData.dni}${formData.prioridad ? " (prioridad)" : ""}`)
    setShowOptions(false)
  }

  const handleRegister = () => {
    alert("Redirigiendo a registro...")
    setShowOptions(false)
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="prioridad">
                ¿Tiene alguna discapacidad?
              </label>
              <input
                type="checkbox"
                id="prioridad"
                name="prioridad"
                checked={formData.prioridad}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Pedir ticket
              </button>
            </div>
          </form>
        ) : (
          <div className="ticket-options">
            <p>
              La cédula <strong>{formData.dni}</strong> no está registrada, regístrate para poder pedir un ticket
            </p>
            <button className="btn btn-secondary" onClick={handleGuest}>
              Pedir ticket como invitado
            </button>
            <button className="btn btn-secondary" onClick={handleRegister}>
              Registrarme
            </button>
            <button className="btn btn-secondary" onClick={handleCorrectDni}>
              Corregir cédula
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TicketRequest