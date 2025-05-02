"use client"

import { useState, useEffect } from "react"
import { attentionPointService } from "../services/api"

const AttentionPointsGrid = () => {
  const [attentionPoints, setAttentionPoints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
          <div key={point.attention_point_id} className="attention-point">
            {point.attention_point_id} - {point.availability ? "Disponible" : "Ocupado"}
          </div>
        ))
      )}
    </div>
  )
}

export default AttentionPointsGrid