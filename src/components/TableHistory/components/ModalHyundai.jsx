import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Grid
} from '@mui/material';
import {actualizarInspeccion} from '../apis/insepeccionVehiculo'

const ModalHyundai = ({ open, onClose, vehiculo }) => {
  const [formData, setFormData] = useState({
    carga_bateria: '',
    presion_llanta_uno: '',
    presion_llanta_dos: '',
    presion_llanta_tres: '',
    presion_llanta_cuatro: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validar carga de batería (0-100%)
    if (!formData.carga_bateria) {
      newErrors.carga_bateria = 'La carga de batería es requerida';
    } else if (formData.carga_bateria < 0 || formData.carga_bateria > 100) {
      newErrors.carga_bateria = 'La carga debe estar entre 0 y 100%';
    }

    // Validar presión de llantas
    const presionFields = [
      'presion_llanta_uno',
      'presion_llanta_dos', 
      'presion_llanta_tres',
      'presion_llanta_cuatro'
    ];

    presionFields.forEach((field, index) => {
      if (!formData[field]) {
        newErrors[field] = `La presión de la llanta ${index + 1} es requerida`;
      } else if (formData[field] < 0 || formData[field] > 60) {
        newErrors[field] = `La presión debe estar entre 0 y 60 PSI`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =async () => {
    if (validateForm()) {
      // Por ahora solo mostramos los datos en consola
      const inspeccionData = {
        vehiculo_id: vehiculo.id,
        inspeccion_id : vehiculo.inspeccion_id,
        marca: vehiculo.marca,
        fecha_servicio: new Date().toISOString().split('T')[0],
        carga_bateria: parseInt(formData.carga_bateria),
        presion_llanta_uno: parseFloat(formData.presion_llanta_uno),
        presion_llanta_dos: parseFloat(formData.presion_llanta_dos),
        presion_llanta_tres: parseFloat(formData.presion_llanta_tres),
        presion_llanta_cuatro: parseFloat(formData.presion_llanta_cuatro),
        estatus: 'Verificado'
      };
      
      console.log('Datos de inspección Hyundai:', inspeccionData);

      await actualizarInspeccion(vehiculo.inspeccion_id, inspeccionData);
      alert('¡Inspección de Hyundai guardada exitosamente!');
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      carga_bateria: '',
      presion_llanta_uno: '',
      presion_llanta_dos: '',
      presion_llanta_tres: '',
      presion_llanta_cuatro: ''
    });
    setErrors({});
    onClose();
  };

  if (!vehiculo) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" component="div">
          Inspección Hyundai - {vehiculo.modelo} {vehiculo.año}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Propietario: {vehiculo.cliente?.nombre} {vehiculo.cliente?.apellido_paterno}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Placa: {vehiculo.placa} | VIN: {vehiculo.vin}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* PRIMERA FILA: Carga de Batería */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom color="primary">
            🔋 Nivel de Carga de Batería
          </Typography>
          <TextField
            fullWidth
            label="Carga de Batería (%)"
            type="number"
            value={formData.carga_bateria}
            onChange={(e) => handleChange('carga_bateria', e.target.value)}
            error={!!errors.carga_bateria}
            helperText={errors.carga_bateria || 'Ingrese el porcentaje de carga (0-100%)'}
            inputProps={{ min: 0, max: 100 }}
            variant="outlined"
          />
        </Box>

        {/* SEGUNDA FILA: Título de llantas */}
        <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
          🛞 Presión de Llantas (PSI)
        </Typography>

        {/* TERCERA FILA: Las 4 llantas en una sola fila */}
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Delantera Izquierda"
              type="number"
              value={formData.presion_llanta_uno}
              onChange={(e) => handleChange('presion_llanta_uno', e.target.value)}
              error={!!errors.presion_llanta_uno}
              helperText={errors.presion_llanta_uno || 'PSI: 30-35'}
              inputProps={{ min: 0, max: 60, step: 0.1 }}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Delantera Derecha"
              type="number"
              value={formData.presion_llanta_dos}
              onChange={(e) => handleChange('presion_llanta_dos', e.target.value)}
              error={!!errors.presion_llanta_dos}
              helperText={errors.presion_llanta_dos || 'PSI: 30-35'}
              inputProps={{ min: 0, max: 60, step: 0.1 }}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Trasera Izquierda"
              type="number"
              value={formData.presion_llanta_tres}
              onChange={(e) => handleChange('presion_llanta_tres', e.target.value)}
              error={!!errors.presion_llanta_tres}
              helperText={errors.presion_llanta_tres || 'PSI: 30-35'}
              inputProps={{ min: 0, max: 60, step: 0.1 }}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Trasera Derecha"
              type="number"
              value={formData.presion_llanta_cuatro}
              onChange={(e) => handleChange('presion_llanta_cuatro', e.target.value)}
              error={!!errors.presion_llanta_cuatro}
              helperText={errors.presion_llanta_cuatro || 'PSI: 30-35'}
              inputProps={{ min: 0, max: 60, step: 0.1 }}
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={handleClose} 
          variant="outlined"
          color="inherit"
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          color="primary"
        >
          Guardar Inspección
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalHyundai;