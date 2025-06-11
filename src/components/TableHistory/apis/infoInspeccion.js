import axios from 'axios'
import { getAuthHeaders } from '../../FormClient/apis/auth'

const API_BASE_URL = 'http://localhost:8000/api/v1'

// Función para obtener información de una inspección (GET)
export const infoInspeccion = async (inspeccionId) => {
    try {
        // Obtener headers con token de autenticación
        const headers = await getAuthHeaders()
        console.log('Headers enviados:', headers)
        
        // ✅ Realizar petición GET correctamente (sin datos, solo headers)
        const response = await axios.get(
            `${API_BASE_URL}/inspecciones/${inspeccionId}/`,
            { headers } // ✅ Headers como segundo parámetro en objeto config
        )
        
        console.log('Respuesta recibida:', response.data)
        return response.data
        
    } catch (error) {
        console.error('Error al obtener información de inspección:', error)
        
        // Manejo específico de errores
        if (error.response) {
            const status = error.response.status
            const message = error.response.data?.message || error.response.data?.detail || 'Error del servidor'
            console.error(`Error ${status}:`, message)
            throw new Error(`Error ${status}: ${message}`)
            
        } else if (error.request) {
            console.error('Error de conexión:', error.request)
            throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.')
        } else {
            console.error('Error inesperado:', error.message)
            throw new Error('Error inesperado: ' + error.message)
        }
    }
}