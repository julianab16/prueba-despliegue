"use client"
import { useState, useEffect } from "react";
import { publicityService } from "../services/api";
import GenericList from "./GenericList";

const PublicityList = () => {
  const [publicity, setPublicity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPublicity = async () => {
    try {
      const response = await publicityService.getAll();
      setPublicity(response.data);
      setError("");
    } catch (err) {
      setError("Error al cargar las publicidades");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicity();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro que desea eliminar esta publicidad?")) {
      try {
        await publicityService.delete(id);
        fetchPublicity();
      } catch (err) {
        setError("Error al eliminar la publicidad");
        console.error(err);
      }
    }
  };

  const columns = [
    { key: "id_publicity", label: "ID" },
    { 
      key: "image_url", 
      label: "Imagen", 
      type: "image",
      render: (item) => (
        <img 
          src={item.image_url} 
          alt="Publicidad" 
          style={{ width: '100px', height: 'auto' }} 
        />
      )
    }
  ];

  return (
    <GenericList
      title="Publicidades"
      items={publicity}
      columns={columns}
      loading={loading}
      error={error}
      onDelete={handleDelete}
      createRoute="/publicity/create"
      showSearch={false}
    />
  );
};

export default PublicityList;