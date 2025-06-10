import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { CircularProgress, Box, Alert } from '@mui/material';
import { getVehiculosPendientes } from '../apis/vehiculosPendientes'

const TableAll = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        button:"verificar",
        headerName: "Verificar",
        with:120
    }
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
    <Paper sx={{ 
      height: 400, 
      width: '100%',
      overflow: 'hidden',
      // Estilos para el estatus
      '& .status-approved': {
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        color: '#2e7d32',
        fontWeight: 'bold',
      },
      '& .status-rejected': {
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        color: '#d32f2f',
        fontWeight: 'bold',
      },
      '& .status-pending': {
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        color: '#f57c00',
        fontWeight: 'bold',
      },
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default TableAll;