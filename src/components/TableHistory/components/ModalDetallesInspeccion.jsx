import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import { 
  BatteryFull, 
  TripOrigin, 
  CalendarToday, 
  CheckCircle,
  Lightbulb,
  Build
} from '@mui/icons-material';
import { infoInspeccion } from '../apis/infoInspeccion';

const ModalDetallesInspeccion = ({ open, onClose, vehiculo }) => {
  const [detallesInspeccion, setDetallesInspeccion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarDetalles = async () => {
    if (!vehiculo?.inspeccion_id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const datos = await infoInspeccion(vehiculo.inspeccion_id);
      setDetallesInspeccion(datos);
      
    } catch (error) {
      console.error('Error al cargar detalles:', error);
      setError(error.message || 'Error al cargar los detalles de la inspección');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && vehiculo) {
      cargarDetalles();
    }
  }, [open, vehiculo]);

  const formatearFecha = (fecha) => {
    if (!fecha) return 'No disponible';
    return fecha;
  };

  const obtenerIcono = (campo) => {
    if (campo.includes('bateria') || campo.includes('carga')) return <BatteryFull color="primary" />;
    if (campo.includes('llanta') || campo.includes('presion')) return <TripOrigin color="primary" />;
    if (campo.includes('luz') || campo.includes('luces')) return <Lightbulb color="primary" />;
    if (campo.includes('fecha')) return <CalendarToday color="primary" />;
    return <Build color="primary" />;
  };

  const formatearNombreCampo = (campo) => {
    const nombres = {
      'marca': 'Marca del Vehículo',
      'fecha_servicio': 'Fecha de Servicio',
      'carga_bateria': 'Carga de Batería',
      'presion_llanta_uno': 'Presión Llanta Delantera Izquierda',
      'presion_llanta_dos': 'Presión Llanta Delantera Derecha',
      'presion_llanta_tres': 'Presión Llanta Trasera Izquierda',
      'presion_llanta_cuatro': 'Presión Llanta Trasera Derecha',
      'luces_frontales': 'Luces Frontales',
      'luces_posteriores': 'Luces Posteriores',
      'nivel_aceite': 'Nivel de Aceite',
      'estatus': 'Estado de la Inspección'
    };
    return nombres[campo] || campo.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatearValor = (campo, valor) => {
    if (valor === null || valor === undefined) return null;
    
    if (campo.includes('fecha')) {
      return formatearFecha(valor);
    }
    if (campo.includes('bateria') || campo.includes('carga')) {
      return `${valor}%`;
    }
    if (campo.includes('presion') || campo.includes('llanta')) {
      return `${valor} PSI`;
    }
    if (campo === 'estatus') {
      return (
        <Chip 
          label={valor} 
          color="success" 
          variant="outlined"
          icon={<CheckCircle />}
          size="small"
        />
      );
    }
    return valor.toString();
  };

  const handleClose = () => {
    setDetallesInspeccion(null);
    setError(null);
    onClose();
  };

  if (!vehiculo) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ pb: 1, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6" component="div">
          Detalles de Inspección Completada
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          {vehiculo.marca} {vehiculo.modelo} {vehiculo.año} - Placa: {vehiculo.placa}
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          Propietario: {vehiculo.cliente?.nombre} {vehiculo.cliente?.apellido_paterno}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Cargando detalles de la inspección...</Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {detallesInspeccion && !loading && (
          <Box>
            <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Información General
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Marca
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {detallesInspeccion.marca}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Fecha de Servicio
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {formatearFecha(detallesInspeccion.fecha_servicio)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Estado
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {formatearValor('estatus', detallesInspeccion.estatus)}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Typography variant="h6" gutterBottom color="primary">
              Detalles Técnicos de la Inspección
            </Typography>
            
            <Grid container spacing={2}>
              {Object.entries(detallesInspeccion).map(([campo, valor]) => {
                if (
                  valor === null || 
                  valor === undefined || 
                  campo === 'vehiculo' || 
                  campo === 'marca' || 
                  campo === 'fecha_servicio' || 
                  campo === 'estatus'
                ) {
                  return null;
                }

                return (
                  <Grid item xs={12} sm={6} key={campo}>
                    <Card sx={{ height: '100%', border: '1px solid', borderColor: 'grey.200' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Box sx={{ color: 'primary.main', mb: 1 }}>
                          {obtenerIcono(campo)}
                        </Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {formatearNombreCampo(campo)}
                        </Typography>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          {formatearValor(campo, valor)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            {Object.entries(detallesInspeccion).filter(([campo, valor]) => 
              valor !== null && 
              valor !== undefined && 
              campo !== 'vehiculo' && 
              campo !== 'marca' && 
              campo !== 'fecha_servicio' && 
              campo !== 'estatus'
            ).length === 0 && (
              <Alert severity="info" sx={{ mt: 2 }}>
                No hay datos técnicos adicionales registrados para esta inspección.
              </Alert>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={handleClose} 
          variant="contained"
          color="primary"
          fullWidth
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDetallesInspeccion;