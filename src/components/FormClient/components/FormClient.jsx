import React from 'react'
import { useForm } from 'react-hook-form'
import { useFormSubmit } from '../hooks/useFormSubmit'
import fondo from '../img/background.png'

const FormClient = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset 
    } = useForm()

    const { submitForm, isSubmitting } = useFormSubmit()

    const onSubmit = handleSubmit(async (data) => {
        await submitForm(data, reset)
    })

    return (
        // Contenedor principal con imagen de fondo
        <div 
            className="min-h-screen py-8 px-4"
            style={{
                backgroundImage: `url(${fondo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Overlay semi-transparente para mejorar legibilidad */}
            <div className="min-h-screen" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                
                <div className="max-w-4xl mx-auto p-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        AutocheckX!
                    </h2>
                    
                    <form onSubmit={onSubmit} className="space-y-6">
                        {/* Información Personal */}
                        <div className="bg-gray-50/90 p-4 rounded-lg backdrop-blur-sm">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Información Personal</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre *
                                    </label>
                                    <input 
                                        type="text"
                                        id="nombre"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.nombre ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        {...register("nombre", { 
                                            required: "El nombre es requerido",
                                            minLength: {
                                                value: 2,
                                                message: "El nombre debe tener al menos 2 caracteres"
                                            }
                                        })}
                                    />
                                    {errors.nombre && (
                                        <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="apellido_paterno" className="block text-sm font-medium text-gray-700 mb-1">
                                        Apellido Paterno *
                                    </label>
                                    <input 
                                        type="text"
                                        id="apellido_paterno"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.apellido_paterno ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        {...register("apellido_paterno", { 
                                            required: "El apellido paterno es requerido",
                                            minLength: {
                                                value: 2,
                                                message: "El apellido paterno debe tener al menos 2 caracteres"
                                            }
                                        })}
                                    />
                                    {errors.apellido_paterno && (
                                        <p className="text-red-500 text-xs mt-1">{errors.apellido_paterno.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="apellido_materno" className="block text-sm font-medium text-gray-700 mb-1">
                                        Apellido Materno *
                                    </label>
                                    <input 
                                        type="text"
                                        id="apellido_materno"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.apellido_materno ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        {...register("apellido_materno", { 
                                            required: "El apellido materno es requerido",
                                            minLength: {
                                                value: 2,
                                                message: "El apellido materno debe tener al menos 2 caracteres"
                                            }
                                        })}
                                    />
                                    {errors.apellido_materno && (
                                        <p className="text-red-500 text-xs mt-1">{errors.apellido_materno.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
                                        Correo Electrónico *
                                    </label>
                                    <input 
                                        type="email"
                                        id="correo"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.correo ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        {...register("correo", { 
                                            required: "El correo es requerido",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Ingresa un correo válido"
                                            }
                                        })}
                                    />
                                    {errors.correo && (
                                        <p className="text-red-500 text-xs mt-1">{errors.correo.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                                        Teléfono *
                                    </label>
                                    <input 
                                        type="tel"
                                        id="telefono"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.telefono ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        {...register("telefono", { 
                                            required: "El teléfono es requerido",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Ingresa un teléfono válido (10 dígitos)"
                                            }
                                        })}
                                    />
                                    {errors.telefono && (
                                        <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="fecha_registro" className="block text-sm font-medium text-gray-700 mb-1">
                                        Fecha de Registro
                                    </label>
                                    <input 
                                        type="date"
                                        id="fecha_registro"
                                        defaultValue={new Date().toISOString().split('T')[0]}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                                        {...register("fecha_registro")}
                                    />
                                    <p className="text-gray-500 text-xs mt-1">Se asigna automáticamente la fecha actual</p>
                                </div>
                            </div>
                        </div>

                        {/* Información del Vehículo */}
                        <div className="bg-gray-50/90 p-4 rounded-lg backdrop-blur-sm">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Información del Vehículo</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-1">
                                        VIN del Vehículo *
                                    </label>
                                    <input 
                                        type="text"
                                        id="vin"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.vin ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        {...register("vin", { 
                                            required: "El VIN es requerido",
                                            minLength: {
                                                value: 17,
                                                message: "El VIN debe tener exactamente 17 caracteres"
                                            },
                                            maxLength: {
                                                value: 17,
                                                message: "El VIN debe tener exactamente 17 caracteres"
                                            }
                                        })}
                                    />
                                    {errors.vin && (
                                        <p className="text-red-500 text-xs mt-1">{errors.vin.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-1">
                                        Marca *
                                    </label>
                                    <select 
                                        id="marca"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.marca ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        {...register("marca", { 
                                            required: "La marca es requerida"
                                        })}
                                    >
                                        <option value="">Selecciona una marca</option>
                                        <option value="Hyundai">Hyundai</option>
                                        <option value="Nissan">Nissan</option>
                                        <option value="Mazda">Mazda</option>
                                    </select>
                                    {errors.marca && (
                                        <p className="text-red-500 text-xs mt-1">{errors.marca.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="modelo" className="block text-sm font-medium text-gray-700 mb-1">
                                        Modelo *
                                    </label>
                                    <input 
                                        type="text"
                                        id="modelo"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.modelo ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        {...register("modelo", { 
                                            required: "El modelo es requerido",
                                            minLength: {
                                                value: 2,
                                                message: "El modelo debe tener al menos 2 caracteres"
                                            }
                                        })}
                                    />
                                    {errors.modelo && (
                                        <p className="text-red-500 text-xs mt-1">{errors.modelo.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="año" className="block text-sm font-medium text-gray-700 mb-1">
                                        Año del Vehículo *
                                    </label>
                                    <input 
                                        type="number"
                                        id="año"
                                        min="1900"
                                        max={new Date().getFullYear() + 1}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.año ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        {...register("año", { 
                                            required: "El año es requerido",
                                            min: {
                                                value: 1900,
                                                message: "El año debe ser mayor a 1900"
                                            },
                                            max: {
                                                value: new Date().getFullYear() + 1,
                                                message: `El año no puede ser mayor a ${new Date().getFullYear() + 1}`
                                            }
                                        })}
                                    />
                                    {errors.año && (
                                        <p className="text-red-500 text-xs mt-1">{errors.año.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="placas" className="block text-sm font-medium text-gray-700 mb-1">
                                        Placa *
                                    </label>
                                    <input 
                                        type="text"
                                        id="placas"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.placas ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        {...register("placas", { 
                                            required: "La placa es requerida"
                                        })}
                                    />
                                    {errors.placas && (
                                        <p className="text-red-500 text-xs mt-1">{errors.placas.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Información del Servicio */}
                        <div className="bg-gray-50/90 p-4 rounded-lg backdrop-blur-sm">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Información del Servicio</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 mb-1">
                                        Servicio a Realizar *
                                    </label>
                                    <input 
                                        type="text"
                                        id="servicio"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.servicio ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        {...register("servicio", { 
                                            required: "El servicio es requerido"
                                        })}
                                    />
                                    {errors.servicio && (
                                        <p className="text-red-500 text-xs mt-1">{errors.servicio.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="comentario" className="block text-sm font-medium text-gray-700 mb-1">
                                        Comentarios Generales
                                    </label>
                                    <textarea 
                                        id="comentario"
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Ingresa cualquier comentario adicional..."
                                        {...register("comentario")}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="flex justify-center space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="px-6 py-2 bg-gray-300/90 text-gray-700 rounded-md hover:bg-gray-400/90 transition duration-200 backdrop-blur-sm"
                            >
                                Limpiar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-blue-600/90 text-white rounded-md hover:bg-blue-700/90 disabled:bg-blue-300/90 transition duration-200 backdrop-blur-sm"
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar Formulario'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormClient