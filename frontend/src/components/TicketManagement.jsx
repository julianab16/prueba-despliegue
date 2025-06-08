"use client"
import "./TicketManagement.css";
import { useState, useEffect } from "react";
import AttentionPointsGrid from "./AttentionPointsGrid";
import { ticketService } from "../services/api"; // Importa el servicio de API


const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTickets = async () => {
    try {
      const response = await ticketService.getAll(); // Llama a la API
      console.log("Tickets obtenidos:", response.data); // Verifica los datos
      setTickets(response.data);
      setError("");
    } catch (err) {
      setError("Error al cargar los tickets");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) {
    return <div>Cargando tickets...</div>;
  }

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
        {error && <div className="alert alert-danger">{error}</div>}
        {tickets.length > 0 ? (
          <ul className="tickets-list">
            {tickets.map((ticket) => (
              <li key={ticket.id_ticket} className="ticket-item">
                Ticket {ticket.id_ticket} - {ticket.status}
                </li>
            ))}
          </ul>
        ) : (
          <p>No hay tickets por el momento.</p>
        )}
      </div>
    </div>
  );
};

export default TicketManagement;
