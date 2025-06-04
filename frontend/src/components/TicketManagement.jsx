"use client"
import AttentionPointsGrid from "./AttentionPointsGrid"

const TicketManagement = () => {
  return (
    <div className="ticket-management-container">
      {/* Panel izquierdo: Puntos de atención */}
      <div className="attention-points-panel">
        <div className="attention-points-header">
          <h3>Puntos de Atención</h3>
        </div>
        <AttentionPointsGrid />
      </div>

      {/* Panel derecho: Lista de tickets */}
      <div className="tickets-panel">
        <h3>Tickets</h3>
        <ul className="tickets-list">
          {/* Ejemplo de tickets */}
          <li className="ticket-item">Ticket 1</li>
          <li className="ticket-item">Ticket 2</li>
          <li className="ticket-item">Ticket 3</li>
        </ul>
      </div>
    </div>
  )
}

export default TicketManagement