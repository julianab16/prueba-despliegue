
"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Sistema de Usuarios
      </Link>

      {isAuthenticated ? (
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          {user?.role !== "CLIENTE" && <Link to="/">Puntos de atencion</Link>}
          {user?.role == "ADMINISTRADOR" && <Link to="/users">Usuarios</Link>}
          <button onClick={handleLogout} className="btn btn-secondary">
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className="navbar-links">
          <Link to="/login">Iniciar Sesión</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
