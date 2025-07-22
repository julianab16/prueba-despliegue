"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { userService } from "../services/api"
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { MdEdit,MdDelete} from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";
import '../index.css';


const UserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [filtro, setFiltro] = useState("")

  const fetchUsers = async () => {
   const usuariosFiltrados = users.filter(user =>
     user.first_name.toLowerCase().includes(filtro.toLowerCase()) ||
      user.dni.toLowerCase().includes(filtro.toLowerCase())
)
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
      // Refresh the user list
      fetchUsers()

      // Clear success message after 3 seconds
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

  return (
    <div>
      <div
        className="header-actions"
        style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}
      >
        <h2 style={{ color: "black" }}>Lista de Usuarios</h2>
        <Link to="/users/new" className="btn btn-primary">
          Nuevo Usuario
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

<input
  type="text"
  placeholder="Busca por nombre o cédula"
  className="search-bar"
/>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>DNI</th>
              <th>Teléfono</th>
              <th>Rol</th> {/* Nueva columna para el rol */}
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.dni}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.role}</td>
                  <td className="action-buttons">
                    <Link to={`/users/edit/${user.id}`} className="icon-button edit-icon" title="Editar">
                      <BsPencilSquare/>
                    </Link>
                    <button
                    type="button"
                    onClick={() => handleDelete(user.id)} className="icon-button delete-icon" title="Eliminar">
                      <MdDelete/>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList