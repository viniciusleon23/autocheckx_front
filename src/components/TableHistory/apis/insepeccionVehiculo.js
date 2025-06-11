import axios from 'axios'
import { getAuthHeaders } from '../../FormClient/apis/auth'

const API_BASE_URL = 'http://localhost:8000/api/v1'

// Función para actualizar una inspección (PATCH)
export const actualizarInspeccion = async (inspeccionId, datosInspeccion) => {
    try {
        // Obtener headers con token de autenticación
        const headers = await getAuthHeaders()
        
        // Realizar petición PATCH para actualizar la inspección
        const response = await axios.patch(
            `${API_BASE_URL}/inspecciones/${inspeccionId}/`,
            datosInspeccion,
            { headers }
        )
        
        return response.data
    } catch (error) {
        console.error('Error al actualizar inspección:', error)
        
        // Manejo específico de errores
        if (error.response) {
            const status = error.response.status
            const message = error.response.data?.message || error.response.data?.detail || 'Error del servidor'
            throw new Error(`Error ${status}: ${message}`)
            
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.')
        } else {
            throw new Error('Error inesperado: ' + error.message)
        }
    }
}
