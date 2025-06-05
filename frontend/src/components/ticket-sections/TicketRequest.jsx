import { useState, useEffect } from "react"
import { userService, ticketService} from "../../services/api"

const TicketRequest = () => {
  const [showOptions, setShowOptions] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    dni: "",
    prioridad: false,
    punto_atencion: "", // nuevo campo

  })
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const response = await userService.getByDni(formData.dni)
      if (response.data && response.data.length > 0) {
        // El usuario existe, puedes continuar con el flujo normal
        const user = response.data[0]
        setSuccess("Usuario encontrado, procesando solicitud...")
        
        await ticketService.create({
        user: user.id,
        priority: formData.prioridad ? "high" : "low",
        status: 'open',           // o el valor por defecto que acepte tu modelo
      })
      } else {
        // El usuario NO existe, muestra las opciones
        setShowOptions(true)
      }
    } catch (err) {
      setError("Error al buscar el usuario")
      setShowOptions(false)
      console.error(err.response ? err.response.data : err)

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ticket-request-center">
      <div className="form-container">
        <h2 className="form-title">Solicitar Ticket</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="dni">Cédula</label>
            <input
              type="number"
              id="dni"
              name="dni"
              className="form-control"
              value={formData.dni}
              onChange={handleChange}
              placeholder="Ingrese su cédula"
              required
              disabled={loading}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="prioridad">
              ¿Tiene alguna discapacidad?
            </label>
            <input
              type="checkbox"
              id="prioridad"
              name="prioridad"
              checked={formData.prioridad}
              onChange={handleChange}
              disabled={loading}
            />
          </div> */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Enviando..." : "Pedir ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TicketRequest

// const TicketRequest = () => {
//   const [formData, setFormData] = useState({
//     dni: "",
//     prioridad: false,
//   })
//   const [showOptions, setShowOptions] = useState(false)

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     //Aqui por defecto se muestran las opciones cuando no está registrado
//     setShowOptions(true)
//   }

//   const handleGuest = () => {
//     alert(`Ticket solicitado como invitado para la cédula: ${formData.dni}${formData.prioridad ? " (prioridad)" : ""}`)
//     setShowOptions(false)
//   }

//   const handleRegister = () => {
//     alert("Redirigiendo a registro...")
//     setShowOptions(false)
//   }

//   const handleCorrectDni = () => {
//     setShowOptions(false)
//     setFormData((prev) => ({
//       ...prev,
//       dni: formData.dni,
//     }))
//   }

//   return (
//     <div className="ticket-request-center">
//       <div className="form-container">
//         <h2 className="form-title">Solicitar Ticket</h2>
//         {!showOptions ? (
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="dni">Cédula</label>
//               <input
//                 type="number"
//                 id="dni"
//                 name="dni"
//                 className="form-control"
//                 value={formData.dni}
//                 onChange={handleChange}
//                 placeholder="Ingrese su cédula"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="prioridad">
//                 ¿Tiene alguna discapacidad?
//               </label>
//               <input
//                 type="checkbox"
//                 id="prioridad"
//                 name="prioridad"
//                 checked={formData.prioridad}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-actions">
//               <button type="submit" className="btn btn-primary">
//                 Pedir ticket
//               </button>
//             </div>
//           </form>
//         ) : (
//           <div className="ticket-options">
//             <p>
//               La cédula <strong>{formData.dni}</strong> no está registrada, regístrate para poder pedir un ticket
//             </p>
//             <button className="btn btn-secondary" onClick={handleGuest}>
//               Pedir ticket como invitado
//             </button>
//             <button className="btn btn-secondary" onClick={handleRegister}>
//               Registrarme
//             </button>
//             <button className="btn btn-secondary" onClick={handleCorrectDni}>
//               Corregir cédula
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default TicketRequest