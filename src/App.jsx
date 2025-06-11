import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import FormClientPage from './components/FormClient/pages/FormClientPage'
import TableAllPage from './components/TableHistory/page/TableAllPage'

function App() {
  return (
    <Router>
        <Routes>
          
          {/* Ruta para el formulario de cliente */}
          <Route path="/" element={<FormClientPage />} />
          
          {/* Ruta para la tabla de inspecciones */}
          <Route path="/verificacion" element={<TableAllPage />} />
          
          {/* Ruta para 404 - página no encontrada */}
          <Route path="*" element={<Navigate to="/verificacion" replace />} />
        </Routes>
    </Router>
  )
}

export default App