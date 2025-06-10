import axios from 'axios'
import { getAuthHeaders } from '../../FormClient/apis/auth'

const API_BASE_URL = 'http://localhost:8000/api/v1'

// Función para obtener vehículos pendientes
export const getVehiculosPendientes = async () => {
    try {
        // Obtener headers con token de autenticación
        const headers = await getAuthHeaders()
        
        // Realizar petición GET simple - el backend ya filtra automáticamente
        const response = await axios.get(
            `${API_BASE_URL}/vehiculos/`,
            { headers }
        )
        
        return response.data
    } catch (error) {
        console.error('Error al obtener vehículos pendientes:', error)
        
        // Manejo específico de errores
        if (error.response) {
            // El servidor respondió con un error
            const status = error.response.status
            const message = error.response.data?.message || error.response.data?.detail || 'Error del servidor'
            throw new Error(`Error ${status}: ${message}`)
            
        } else if (error.request) {
            // La petición se hizo pero no se recibió respuesta
            throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.')
        } else {
            // Algo más salió mal
            throw new Error('Error inesperado: ' + error.message)
        }
    }
}