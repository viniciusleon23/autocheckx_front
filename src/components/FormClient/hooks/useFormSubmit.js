import { useState } from 'react'
import { crearVehiculo } from '../apis/vehiculo'

export const useFormSubmit = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submitForm = async (data, reset) => {
        setIsSubmitting(true)
        try {
            // Transformar los datos al formato exacto que espera el backend
            const formattedData = {
                vin: data.vin,
                marca: data.marca,
                modelo: data.modelo || "No especificado", // Asegurar que existe
                año: parseInt(data.año), // ✅ Convertir a número
                placa: data.placas, // ✅ Cambiar "placas" a "placa"
                servicio: data.servicio,
                comentario: data.comentario || "",
                fecha_registro: data.fecha_registro,
                cliente: {
                    nombre: data.nombre,
                    apellido_paterno: data.apellido_paterno,
                    apellido_materno: data.apellido_materno,
                    telefono: data.telefono,
                    correo: data.correo
                }
            }

            console.log('Enviando datos al backend:', JSON.stringify(formattedData, null, 2))
            
            // Enviar datos al backend usando el servicio
            const response = await crearVehiculo(formattedData)
            
            console.log('Respuesta del servidor:', response)
            alert('¡Formulario enviado correctamente!')
            
            // Limpiar el formulario pero mantener la fecha de registro
            reset({
                fecha_registro: new Date().toISOString().split('T')[0]
            })
        } catch (error) {
            console.error('Error al enviar el formulario:', error)
            
            // Mostrar más detalles del error
            if (error.response?.data) {
                console.log('Detalles del error del servidor:', error.response.data)
                alert(`Error del servidor: ${JSON.stringify(error.response.data, null, 2)}`)
            } else {
                alert(`Error al enviar el formulario: ${error.message}`)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        submitForm,
        isSubmitting
    }
}