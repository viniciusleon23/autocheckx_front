# AutocheckX - Sistema de Inspecciones Vehiculares

## 📋 Descripción

AutocheckX es un sistema para la gestión de inspecciones vehiculares, desarrollado con React + Vite y containerizado con Docker para facilitar el desarrollo y despliegue.

## 🚀 Características

- ✅ **Registro de Clientes:** Formulario completo para nuevos clientes y vehículos
- ✅ **Sistema de Verificación:** Módulo para verificaciones de vehículos
- ✅ **Gestión de Inspecciones:** Tabla interactiva para gestionar inspecciones pendientes
- ✅ **Navegación Intuitiva:** Navbar responsive con navegación entre módulos
- ✅ **Inspecciones por Marca:** Modales específicos para Hyundai, Mazda y Nissan
- ✅ **Interfaz Moderna:** Diseño responsivo con Tailwind CSS

## 🛠️ Tecnologías

- **Frontend:** React 18 + Vite
- **Estilos:** Tailwind CSS + Material-UI
- **Enrutamiento:** React Router Dom
- **Formularios:** React Hook Form
- **Containerización:** Docker + Docker Compose

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- [Docker](https://docs.docker.com/get-docker/) (versión 20.10 o superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (versión 2.0 o superior)
- [Git](https://git-scm.com/downloads)

### Verificar instalación:
```bash
docker --version
docker-compose --version
git --version
```

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone git@github.com:viniciusleon23/autocheckx_front.git
```

### 2. Levantar el proyecto con Docker
```bash
# O en segundo plano (detached mode)
docker-compose up -d --build
```

### 3. Acceder a la aplicación
Una vez que los contenedores estén corriendo:

- **Frontend:** http://localhost:5173
- **Estado de contenedores:** `docker-compose ps`

# 📁 Estructura del Proyecto AutocheckX

```
src/
├── 📂 assets/
├── 📂 components/
│   ├── 📂 FormClient/
│   │   ├── 📂 apis/
│   │   │   ├── 📄 auth.js
│   │   │   └── 📄 vehiculo.js
│   │   ├── 📂 components/
│   │   │   ├── ⚛️ FormClient.jsx
│   │   │   └── ⚛️ Helloworld.jsx
│   │   ├── 📂 hooks/
│   │   │   └── 📄 useFormSubmit.js
│   │   ├── 📂 img/
│   │   └── 📂 pages/
│   │       └── ⚛️ FormClientPage.jsx
│   └── 📂 TableHistory/
│       ├── 📂 apis/
│       │   ├── 📄 insepeccionVehiculo.js
│       │   ├── 📄 Inspeccion
│       │   └── 📄 vehiculosPendientes.js
│       ├── 📂 components/
│       │   ├── ⚛️ ModalHyundai.jsx
│       │   ├── ⚛️ ModalMazda.jsx
│       │   ├── ⚛️ ModalNissan.jsx
│       │   └── ⚛️ TableAll.jsx
│       ├── 📂 hooks/
│       ├── 📂 img/
│       │   └── 🖼️ servicio.png
│       └── 📂 page/
│           └── ⚛️ TableAllPage.jsx
├── 📂 ui/
├── ⚛️ Navbar.jsx
└── 📄 App.css
```

## 📋 Descripción de Componentes

### 🔧 FormClient Module
- **APIs**: Autenticación y gestión de vehículos
- **Components**: Formulario principal y componente de ejemplo
- **Hooks**: Hook personalizado para envío de formularios
- **Pages**: Página principal del formulario de cliente

### 📊 TableHistory Module  
- **APIs**: Gestión de inspecciones y vehículos pendientes
- **Components**: Modales específicos por marca y tabla principal
- **Pages**: Página principal de gestión de inspecciones

### 🧭 Navigation
- **Navbar**: Componente de navegación principal

### 🎨 Assets & UI
- **Assets**: Recursos estáticos
- **UI**: Componentes de interfaz de usuario
- **Styles**: Archivos CSS

## 🐳 Comandos de Docker

### Comandos básicos:
```bash


# Levantar en segundo plano
docker-compose up -d

# Parar servicios
docker-compose down

# Ver logs
docker-compose logs

```

## 🛠️ Desarrollo

### Modo desarrollo:
```bash
# Instalar dependencias localmente (opcional)
npm install

npm run dev

```


## 🌐 Rutas de la Aplicación

| Ruta | Descripción | Componente |
|------|-------------|------------|
| `/` | Registro de nuevos clientes | FormClientPage |
| `/verificacion` | Módulo de verificación | TableAllPage |

## 🔧 Solución de Problemas

### Problema: Puerto ocupado
```bash
# Verificar qué proceso usa el puerto 5173
lsof -i :5173

# Cambiar puerto en docker-compose.yml
ports:
  - "3000:5173"  # Usar puerto 3000 en host
```


### Problema: Permisos en Linux/Mac
```bash
# Dar permisos al directorio
sudo chown -R $USER:$USER .

# O ejecutar Docker con sudo
sudo docker-compose up
```

### Problema: Cambios no se reflejan
```bash
# Reconstruir contenedores
docker-compose down
docker-compose up --build
```


### Sin Docker (local):
```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

```
## 📞 Contacto

- **Proyecto:** AutocheckX
- **Desarrollador:** León José
- **Email:** josfleon23@gmail.com

---

## 📚 Recursos Adicionales

- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de React](https://reactjs.org/)
- [Documentación de Docker](https://docs.docker.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**¡AutocheckX! 🚗✨**