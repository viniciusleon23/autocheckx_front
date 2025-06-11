import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { CircularProgress, Box, Alert, Button } from '@mui/material';
import { getVehiculosPendientes } from '../apis/vehiculosPendientes';
import ModalHyundai from '../components/ModalHyundai'
import ModalMazda from '../components/ModalMazda'
import ModalNissan from '../components/ModalNissan'
import fondo from '../img/servicio.png'
const TableAll = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para los modales
  const [modalHyundaiOpen, setModalHyundaiOpen] = useState(false);
  const [modalMazdaOpen, setModalMazdaOpen] = useState(false);
  const [modalNissanOpen, setModalNissanOpen] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);

  const loadVehiculosPendientes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getVehiculosPendientes();
      
      const vehiculos = response.results || response;
      setRows(vehiculos);
      
    } catch (err) {
      console.error('Error al cargar vehículos pendientes:', err);
      setError(err.message || 'Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehiculosPendientes();
  }, []);

  const handleVerificar = (vehiculo) => {
    console.log('Verificando vehículo:', vehiculo);
    
    // Verificar si la inspección ya está realizada
    const estatusInspeccion = vehiculo.inspeccion_estatus?.toLowerCase();
    if (estatusInspeccion === 'verificado' || estatusInspeccion === 'Verificado') {
      alert('Esta inspección ya ha sido realizada y no puede modificarse.');
      return;
    }
    
    const marca = vehiculo.marca?.toLowerCase();
    
    // Verificar si la marca es Hyundai
    if (marca === 'hyundai') {
      setSelectedVehiculo(vehiculo);
      setModalHyundaiOpen(true);
    } 
    // Verificar si la marca es Mazda
    else if (marca === 'mazda') {
      setSelectedVehiculo(vehiculo);
      setModalMazdaOpen(true);
    } 
    // Verificar si la marca es Nissan
    else if (marca === 'nissan') {
      setSelectedVehiculo(vehiculo);
      setModalNissanOpen(true);
    } 
    // Para otras marcas, mostrar el alert como antes
    else {
      alert(`Verificando vehículo ID: ${vehiculo.id} - ${vehiculo.marca} ${vehiculo.modelo}`);
      // Aquí puedes agregar lógica para otras marcas
    }
  };

  const handleModalClose = () => {
    setModalHyundaiOpen(false);
    setModalMazdaOpen(false);
    setModalNissanOpen(false);
    setSelectedVehiculo(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, hideable: false },
    { 
      field: 'propietario', 
      headerName: 'Propietario', 
      width: 200,
      valueGetter: (value, row) => `${row.cliente?.nombre || ''} ${row.cliente?.apellido_paterno || ''} ${row.cliente?.apellido_materno || ''}`.trim(),
    },
    { 
      field: 'marca', 
      headerName: 'Marca', 
      width: 130
    },
    { 
      field: 'modelo', 
      headerName: 'Modelo', 
      width: 120
    },
    { 
      field: 'año', 
      headerName: 'Año', 
      width: 90
    },
    { 
      field: 'placa', 
      headerName: 'Placa', 
      width: 100
    },
    { 
      field: 'vin', 
      headerName: 'VIN', 
      width: 150
    },
    { 
      field: 'servicio', 
      headerName: 'Servicio', 
      width: 180
    },
    { 
      field: 'fecha_registro', 
      headerName: 'Fecha', 
      width: 130
    },
    { 
      field: 'inspeccion_estatus', 
      headerName: 'Estatus', 
      width: 120
    },
    {
      field: 'acciones',
      headerName: 'Acción',
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const marca = params.row.marca?.toLowerCase();
        const estatusInspeccion = params.row.inspeccion_estatus?.toLowerCase();
        const yaRealizada = estatusInspeccion === 'Verificado' || estatusInspeccion === 'verificado';
        
        let buttonColor = 'primary';
        let buttonText = 'Verificar';
        let disabled = false;
        
        // Si ya está realizada la inspección
        if (yaRealizada) {
          buttonColor = 'inherit';
          buttonText = 'Completada';
          disabled = true;
        } 
        // Si no está realizada, asignar colores por marca
        else if (marca === 'hyundai') {
          buttonColor = 'success';
          buttonText = 'Inspección';
        } else if (marca === 'mazda') {
          buttonColor = 'warning';
          buttonText = 'Inspección';
        } else if (marca === 'nissan') {
          buttonColor = 'info';
          buttonText = 'Inspección';
        }
        
        return (
          <Button
            variant={yaRealizada ? "outlined" : "contained"}
            color={buttonColor}
            size="small"
            disabled={disabled}
            onClick={() => handleVerificar(params.row)}
            sx={{
              opacity: yaRealizada ? 0.6 : 1,
              cursor: yaRealizada ? 'not-allowed' : 'pointer'
            }}
          >
            {buttonText}
          </Button>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  // Mostrar loading
  if (loading) {
    return (
      <Paper sx={{ 
        height: 400, 
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress />
          <span>Cargando vehículos pendientes...</span>
        </Box>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ 
        height: 400, 
        width: '100%',
        p: 2
      }}>
        <Alert 
          severity="error" 
          action={
            <button onClick={loadVehiculosPendientes}>
              Reintentar
            </button>
          }
        >
          {error}
        </Alert>
      </Paper>
    );
  }

  return (
    <>
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
        <Paper sx={{ 
        height: 400, 
        width: '100%',
        overflow: 'hidden',
      }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>

      {/* Modales de inspección */}
      <ModalHyundai
        open={modalHyundaiOpen}
        onClose={handleModalClose}
        vehiculo={selectedVehiculo}
        onInspeccionActualizada={loadVehiculosPendientes}
      />
      
      <ModalMazda
        open={modalMazdaOpen}
        onClose={handleModalClose}
        vehiculo={selectedVehiculo}
      />
      
      <ModalNissan
        open={modalNissanOpen}
        onClose={handleModalClose}
        vehiculo={selectedVehiculo}
      />
      </div>

    </>
  );
};

export default TableAll;