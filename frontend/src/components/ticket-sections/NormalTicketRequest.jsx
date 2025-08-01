import { useState } from "react"
import { useTicketRequest } from "./UseTicketRequest"

const NormalTicketRequest = () => {
  const [formData, setFormData] = useState({
    dni: "",
    prioridad: false,
  })
  const {pedirTicket, error, loading} = useTicketRequest()
  const [showOptions, setShowOptions] = useState(false)
  const [ticketInfo, setTicketInfo] = useState(null)


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
    if (result && result.status === "success") {
      setTicketInfo({
        nombre: result.user.first_name,
        apellido: result.user.last_name,
        prioridad: result.ticket.priority,
        id_ticket: result.ticket.id_ticket,
        email: result.user.email,
      })
      setFormData({ dni: "", prioridad: false })
      setShowOptions(false)
    } else if (result === "user_not_found") {
      setShowOptions(true)
    }
  }

  const handleRegister = () => {
    window.location.href = `/ticket-req/new-user?dni=${formData.dni}`;
  }

  const handleCorrectDni = () => {
    setShowOptions(false)
  }

  return (
    <div className="ticket-request-center">
      <div className="form-container">
        <h2 className="form-title">Solicitar Ticket</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {ticketInfo ? (
          <div className="ticket-success-message">
            <p>
              Bienvenido <strong>{ticketInfo.nombre} {ticketInfo.apellido}</strong>, se ha solicitado un ticket<strong>{ticketInfo.prioridad === "high" ? " prioritario" : ""}</strong>.
            </p>
            <p>
              <strong>ID de su ticket:</strong> {ticketInfo.id_ticket}
            </p>
            <p>
              Puede realizar seguimiento de la cola de tickets ingresando al correo que le fue enviado{ticketInfo.email ? ` (${ticketInfo.email})` : ""}.
            </p>
            <div className="form-actions"> 
              <button className="btn btn-primary" onClick={() => setTicketInfo(null)}>
                Entendido
              </button>
            </div>
          </div>
        ) : !showOptions ? (
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

            <button className="btn btn-primary" onClick={handleRegister}>
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

export default NormalTicketRequest