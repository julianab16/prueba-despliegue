"use client"
import { useState, useEffect } from "react";
import { userService } from "../services/api";
import GenericList from "./GenericList";


const UserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [filtro, setFiltro] = useState("")

  const fetchUsers = async () => {
    try {
      const response = await userService.getAll()
      setUsers(response.data)
      setError("")
    } catch (err) {
      setError("Error al cargar los usuarios")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("¿Está seguro que desea eliminar este usuario?")) {
      return
    }

    try {
      await userService.delete(id)
      setSuccessMessage("Usuario eliminado con éxito")

      fetchUsers()

      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (err) {
      setError("Error al eliminar el usuario")
      console.error(err)
    }
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  const columns = [
    { key: "id", label: "ID" },
    { key: "username", label: "Usuario" },
    { key: "first_name", label: "Nombre" },
    { key: "last_name", label: "Apellido" },
    { key: "email", label: "Email" },
    { key: "dni", label: "DNI" },
    { key: "phone_number", label: "Teléfono" },
    { key: "role", label: "Rol" }
  ];

  return (
    <div>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
      <GenericList
        title="Lista de Usuarios"
        items={users}
        columns={columns}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        createRoute="/users/new"
        editRoute="/users/edit"
      />
    </div>
  );
};

export default UserList