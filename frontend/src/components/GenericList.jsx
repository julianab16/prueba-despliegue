"use client"

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const getItemId = (item) =>
  item.id_publicity ||
  item.id ||
  item.attention_point_id ||
  item.id_ticket ||
  item._id;

const GenericList = ({
  title,
  items,
  columns,
  loading,
  error,
  onDelete,
  createRoute,
  editRoute,
  onCreateClick,
  createButtonText = "Crear Nuevo",
  showActions = true,
  showSearch = true 
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter(item => {
    return columns.some(column => {
      const value = item[column.key];
      return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  const renderCell = (item, column) => {
    if (column.render) {
      return column.render(item);
    }
    
    const value = item[column.key];
    
    if (column.type === 'image' && value) {
      return <img src={value} alt={column.label} style={{ width: '100px', height: 'auto' }} />;
    }
    
    return value || '-';
  };

  const renderCreateButton = () => {
    if (onCreateClick) {
      return (
        <button onClick={onCreateClick} className="btn btn-primary create-button">
          <FaPlus /> {createButtonText}
        </button>
      );
    } else if (createRoute) {
      return (
        <Link to={createRoute} className="btn btn-primary create-button">
          <FaPlus /> {createButtonText}
        </Link>
      );
    }
    return null;
  };

  return (
    <div className="generic-list-container">
      {title && (
        <div className="list-header">
          <h2 className="list-title">{title}</h2>
          {renderCreateButton()}
        </div>
      )}

      {showSearch && (
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="loading-indicator">Cargando...</div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
                {showActions && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={getItemId(item)}>
                    {columns.map((column) => (
                      <td key={`${getItemId(item)}-${column.key}`}>
                        {renderCell(item, column)}
                      </td>
                    ))}
                    {showActions && (
                      <td>
                        <div className="action-buttons">
                          {editRoute && (
                            <Link
                              to={
                                typeof editRoute === "function"
                                  ? editRoute(item)
                                  : `${editRoute}/${getItemId(item)}`
                              }
                              className="icon-button edit-icon"
                              title="Editar"
                            >
                              <FaEdit />
                            </Link>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(getItemId(item))}
                              className="icon-button delete-icon"
                              title="Eliminar"
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + (showActions ? 1 : 0)}>
                    No hay elementos para mostrar
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GenericList;