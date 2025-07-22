
"use client"

import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"
import { FiLogOut } from "react-icons/fi"

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth()
  const [infoOpen, setInfoOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setInfoOpen(false)
  }, [location.pathname])

  const handleLogout = async () => {
    await logout()
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src="/brand.png" alt="Qline" style={{ height: "55px", verticalAlign: "middle" }} />
      </Link>

      {isAuthenticated ? (
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          {user?.role !== "CLIENTE" && <Link to="/">Gestion de tickets</Link>}
          {/* {user?.role == "ADMINISTRADOR" && <Link to="/attention-points">Lista PA</Link>} */}
          {/* {user?.role == "ADMINISTRADOR" && <Link to="/users">Usuarios</Link>} */}
          <div
            className="dropdown"
            onMouseEnter={() => setInfoOpen(true)}
            onMouseLeave={() => setInfoOpen(false)}
          >
            <span
              className="navbar-link dropdown-toggle"
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              Listas ▾
            </span>
            <div className={`dropdown-menu${infoOpen ? " open" : ""}`}>
              {user?.role === "ADMINISTRADOR" && (
                <Link className="dropdown-item" to="/users">
                  Usuarios
                </Link>
              )}
              {user?.role === "ADMINISTRADOR" && (
                <Link className="dropdown-item" to="/attention-points">
                  Puntos de atención
                </Link>
              )}
            </div>
          </div>

          <button onClick={handleLogout} className="btn btn-tertiary logout-btn" title="Cerrar sesión">
            <FiLogOut size={32} style={{ margin: " 0 0.5rem 0 0.5rem" }} />
            <span className="logout-text">Cerrar sesión</span>
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
