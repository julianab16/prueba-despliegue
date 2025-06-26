// app/components/ListaPuntos.jsx
"use client"

import { useEffect, useState } from "react"
import { attentionPointService } from "../services/api"
import { Link } from "react-router-dom"
import { MdDelete } from "react-icons/md"

const AttentionPointList = () => {
  const [puntos, setPuntos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await attentionPointService.getAll()
        setPuntos(response.data)
      } catch (err) {
        console.error(err)
        setError("Error al cargar los puntos de atención")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCreateAttentionPoint = async () => {
    try {
      await attentionPointService.create({})
      const response = await attentionPointService.getAll()
      setPuntos(response.data)
    } catch (err) {
      setError("Error al crear el punto de atención")
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("¿Está seguro que desea eliminar este punto de atención?")) {
      return
    }
    try {
      await attentionPointService.delete(id)
      setPuntos((prev) => prev.filter((p) => p.attention_point_id !== id))
    } catch (err) {
      setError("Error al eliminar el punto de atención")
    }
  }

  if (loading) return <div>Cargando...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div>
      <div
        className="header-actions"
        style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}
      >
        <h2 style={{ color: "black" }}>Lista de Puntos de Atención</h2>
        <button className="btn btn-primary" onClick={handleCreateAttentionPoint}>
          Nuevo punto de atención
        </button>
      </div>

      <div className="table-container">
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Disponibilidad</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {puntos.map((punto) => (
                <tr key={punto.attention_point_id}>
                  <td>{punto.attention_point_id}</td>
                  <td>{punto.availability ? "Disponible" : "Ocupado"}</td>
                  <td className="action-buttons">
                    <button
                    type="button"
                    onClick={() => handleDelete(punto.attention_point_id)} className="icon-button delete-icon" title="Eliminar">
                      <MdDelete/>
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default AttentionPointList