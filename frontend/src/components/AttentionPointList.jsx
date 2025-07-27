"use client"

import { useEffect, useState } from "react"
import { attentionPointService } from "../services/api"
import GenericList from "./GenericList";

const AttentionPointList = () => {
  const [puntos, setPuntos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const fetchAttentionPoints = async () => {
    try {
      const response = await attentionPointService.getAll();
      setPuntos(response.data);
      setError("");
    } catch (err) {
      setError("Error al cargar los puntos de atención");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttentionPoints();
  }, []);

  const handleCreateAttentionPoint = async () => {
    try {
      await attentionPointService.create({});
      setSuccessMessage("Punto de atención creado con éxito");
      fetchAttentionPoints();
      
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      setError("Error al crear el punto de atención");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Está seguro que desea eliminar este punto de atención?")) {
      return;
    }
    try {
      await attentionPointService.delete(id);
      setSuccessMessage("Punto de atención eliminado con éxito");
      setPuntos((prev) => prev.filter((p) => p.attention_point_id !== id));
      
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      setError("Error al eliminar el punto de atención");
      console.error(err);
    }
  };

  const columns = [
    { key: "attention_point_id", label: "ID" },
    { 
      key: "availability", 
      label: "Disponibilidad", 
      render: (item) => (item.availability ? "Disponible" : "Ocupado")
    }
  ];

  return (
    <div>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <GenericList
        title="Lista de Puntos de Atención" 
        items={puntos}
        columns={columns}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        showActions={true}
        onCreateClick={handleCreateAttentionPoint}
        // createButtonText="Nuevo punto de atención"
        showSearch={false}
      />
    </div>
  );
};

export default AttentionPointList;