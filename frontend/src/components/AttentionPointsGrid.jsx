"use client"

import { useState, useEffect } from "react";
import { attentionPointService, ticketService } from "../services/api"; 
import { FaUnlink } from "react-icons/fa"; 

const AttentionPointsGrid = ({ onTicketAssigned }) => {  
  const [attentionPoints, setAttentionPoints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [dragOverId, setDragOverId] = useState(null);
  const [assignedTickets, setAssignedTickets] = useState({});
  const [hoveredTicket, setHoveredTicket] = useState(null) 

  useEffect(() => {
      const fetchAttentionPoints = async () => {
          try {
              const response = await attentionPointService.getAll();
              setAttentionPoints(response.data);
              
              // Initialize assignedTickets based on response
              const assignedTicketsData = {};
              response.data.forEach(point => {
                  if (!point.availability && point.current_ticket) {
                      assignedTicketsData[point.attention_point_id] = point.current_ticket;
                  }
              });
              setAssignedTickets(assignedTicketsData);
              
          } catch (err) {
              setError("Error al cargar los puntos de atención");
              console.error(err);
          } finally {
              setLoading(false);
          }
      };

      fetchAttentionPoints();
  }, []);


  const handleDragOver = (e, id) => {
    e.preventDefault();
    setDragOverId(id);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = async (e, pointId) => {
      e.preventDefault();
      setDragOverId(null);
      const ticketId = e.dataTransfer.getData("ticketId");

      if (!window.confirm(`¿Desea asignar el ticket ${ticketId} al punto de atención ${pointId}?`)) {
          return;
      }
      
      try {
          const response = await ticketService.assignToPoint(ticketId, pointId);
            
            if (response.status === 200) {
              setAttentionPoints(prev => 
                  prev.map(point => 
                      point.attention_point_id === pointId 
                          ? { ...point, availability: false }
                          : point
                  )
              );
                
              setAssignedTickets(prev => ({
                  ...prev,
                  [pointId]: ticketId
              }));
              
              if (onTicketAssigned) {
                  onTicketAssigned(ticketId);
              }
          }
          
      } catch (error) {
          console.error("Error al asignar ticket:", error);
          alert("Error al asignar el ticket");
      }
  };

  if (loading) {
    return <div>Cargando puntos de atención...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  const handleCloseTicket = async (ticketId, pointId) => {
    // Confirmar la acción
    if (!window.confirm(`¿Desea cerrar el ticket ${ticketId}?`)) {
      return;
    }
    
    try {
      const response = await ticketService.unassignTicket(ticketId);
      
      if (response.status === 200) {
        // Actualizar estado local
        setAttentionPoints(prev => 
          prev.map(point => 
            point.attention_point_id === pointId 
              ? { ...point, availability: true }
              : point
          )
        );
        
        // Eliminar de tickets asignados
        setAssignedTickets(prev => {
          const newAssigned = { ...prev };
          delete newAssigned[pointId];
          return newAssigned;
        });
      }
    } catch (error) {
      console.error("Error al cerrar el ticket:", error);
      alert("Error al cerrar el ticket");
    }
  };

  return (
    <div className="attention-points-grid">
      {attentionPoints.length === 0 ? (
        <div>No hay puntos de atención registrados</div>
      ) : (
        attentionPoints.map((point) => (
          <div 
            key={point.attention_point_id}
            className={`attention-point${dragOverId === point.attention_point_id ? " attention-point-dragover" : ""}`}
            onDragOver={(e) => handleDragOver(e, point.attention_point_id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, point.attention_point_id)}     
          >     
            {/* Parte superior: ID del punto de atención */}
            <div className="attention-point-id">
              {point.attention_point_id}
            </div>

            <div 
              className={`attention-point-slot ${point.availability ? "slot-available" : "slot-occupied"}`}
              onMouseEnter={() => !point.availability && setHoveredTicket(point.attention_point_id)}
              onMouseLeave={() => setHoveredTicket(null)}
            >
              <div className={`ticket-content ${hoveredTicket === point.attention_point_id ? "showing-button" : ""}`}>
                {point.availability 
                  ? "Disponible" 
                  : assignedTickets[point.attention_point_id] 
                    ? `Ticket ${assignedTickets[point.attention_point_id]}` 
                    : "Cargando..."
                }
              </div>
              
              {!point.availability && (
                <button 
                  className={`close-ticket-btn ${hoveredTicket === point.attention_point_id ? "visible" : ""}`}
                  onClick={() => handleCloseTicket(assignedTickets[point.attention_point_id], point.attention_point_id)}
                  title="Finalizar atención"
                >
                  <FaUnlink size={20} />
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default AttentionPointsGrid