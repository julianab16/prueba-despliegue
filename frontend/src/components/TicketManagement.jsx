"use client"

import "./TicketManagement.css" // Asegúrate de crear este archivo para estilos personalizados

const TicketManagement = () => {
  return (
    <div className="ticket-management-container">
      {/* Panel izquierdo: Puntos de atención */}
      <div className="attention-points-panel">
        <div className="attention-points-header">
          <h3>Puntos de Atención</h3>
          <button className="new-attention-point-btn">
            + {/* Icono de más */}
          </button>
        </div>
        <div className="attention-points-grid">
          {/* Ejemplo de puntos de atención */}
          <div className="attention-point">Punto 1</div>
          <div className="attention-point">Punto 2</div>
          <div className="attention-point">Punto 3</div>
          <div className="attention-point">Punto 4</div>
        </div>
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