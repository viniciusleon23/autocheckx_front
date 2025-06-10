import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api/v1'

// Credenciales para autenticación
const AUTH_CREDENTIALS = {
    username: "leonjose",
    password: "0s90$SUDDTMj"
}

// Función para obtener el token de autenticación
export const login = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login/`, AUTH_CREDENTIALS)
        const token = response.data.access || response.data.token || response.data.access_token
        
        if (!token) {
            throw new Error('No logro obtener el token')
        }
        console.log("este es el token de la peticion")
        return token
    } catch (error) {
        console.error('Error en login:', error)
        throw new Error('Error al autenticar: ' + (error.response?.data?.message || error.message))
    }
}

// Función para obtener headers con autenticación
export const getAuthHeaders = async () => {
    const token = await login()
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}