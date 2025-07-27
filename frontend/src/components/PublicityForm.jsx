"use client"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicityService } from "../services/api";

const PublicityForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    start_date: "",
    end_date: "",
    is_active: true
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      await publicityService.create(formDataToSend);
      navigate("/publicity");
    } catch (err) {
      setError("Error al crear la publicidad");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <h2>Crear Publicidad</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Contenido</label>
          <textarea
            id="content"
            name="content"
            className="form-control"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="start_date">Fecha de inicio</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            className="form-control"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="end_date">Fecha de fin</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            className="form-control"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Imagen</label>
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        {preview && (
          <div className="form-group">
            <label>Vista previa</label>
            <img
              src={preview}
              alt="Vista previa"
              style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
            />
          </div>
        )}
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />{" "}
            Activo
          </label>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/publicity")}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublicityForm;