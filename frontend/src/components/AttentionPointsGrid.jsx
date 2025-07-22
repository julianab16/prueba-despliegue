"use client"

import { useState, useEffect } from "react"
import { attentionPointService } from "../services/api"

const AttentionPointsGrid = () => {
  const [attentionPoints, setAttentionPoints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [dragOverId, setDragOverId] = useState(null);

  useEffect(() => {
    const fetchAttentionPoints = async () => {
      try {
        const response = await attentionPointService.getAll()
        setAttentionPoints(response.data)
      } catch (err) {
        setError("Error al cargar los puntos de atención")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAttentionPoints()
  }, [])


  const handleDragOver = (e, id) => {
    e.preventDefault();
    setDragOverId(id);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (e, id) => {
  e.preventDefault();
  setDragOverId(null);
  const ticketId = e.dataTransfer.getData("ticketId");
  // aqui se pone la logica para asignar ticket a PA
  };  

  if (loading) {
    return <div>Cargando puntos de atención...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

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
            {point.attention_point_id} - {point.availability ? "Disponible" : "Ocupado"}
          </div>
        ))
      )}
    </div>
  )
}

export default AttentionPointsGrid