import axios from 'axios'
import { getAuthHeaders } from './auth'

const API_BASE_URL = 'http://localhost:8000/api/v1'

// Función para crear un nuevo vehículo/cliente
export const crearVehiculo = async (data) => {
    try {
        // Obtener headers con token de autenticación
        const headers = await getAuthHeaders()
        
        // Realizar petición POST con los datos del formulario
        const response = await axios.post(
            `${API_BASE_URL}/vehiculos/`,
            data,
            { headers }
        )
        
        return response.data
    } catch (error) {
        console.error('Error al crear vehículo:', error)
        
        // Manejo específico de errores
        if (error.response) {
            // El servidor respondió con un error
            const status = error.response.status
            const message = error.response.data?.message || error.response.data?.detail || 'Error del servidor'
            
        } else if (error.request) {
            // La petición se hizo pero no se recibió respuesta
            throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.')
        } else {
            // Algo más salió mal
            throw new Error('Error inesperado: ' + error.message)
        }
    }
}

