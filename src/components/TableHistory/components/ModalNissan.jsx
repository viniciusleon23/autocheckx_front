import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import {actualizarInspeccion} from '../apis/insepeccionVehiculo'

const ModalNissan = ({ open, onClose, vehiculo }) => {
  const [formData, setFormData] = useState({
    luces_frontales: '',
    luces_posteriores: ''
  });

  const [errors, setErrors] = useState({});

  // Opciones para el estado de las luces
  const estadoLucesOpciones = [
    { value: 'Buen Estado', label: 'Buen Estado' },
    { value: 'Cambio Recomendado', label: 'Cambio Recomendado' },
    { value: 'Requiere Cambio', label: 'Requiere Cambio' }
  ];

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
    
    // Validar luces frontales
    if (!formData.luces_frontales) {
      newErrors.luces_frontales = 'El estado de las luces frontales es requerido';
    }

    // Validar luces posteriores
    if (!formData.luces_posteriores) {
      newErrors.luces_posteriores = 'El estado de las luces posteriores es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async() => {
    if (validateForm()) {
      
      const inspeccionData = {
        marca: vehiculo.marca,
        inspeccion_id:vehiculo.inspeccion_id,
        fecha_servicio: new Date().toISOString().split('T')[0],
        luces_frontales: formData.luces_frontales,
        luces_posteriores: formData.luces_posteriores,
        estatus: 'Verificado'
      };
      await actualizarInspeccion(vehiculo.inspeccion_id, inspeccionData);
      alert("Se realizo la verificacion correctamente")
      handleClose();
      window.location.reload();
    }
  };

  const handleClose = () => {
    setFormData({
      luces_frontales: '',
      luces_posteriores: ''
    });
    setErrors({});
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
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" component="div">
          Inspección Nissan - {vehiculo.modelo} {vehiculo.año}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Propietario: {vehiculo.cliente?.nombre} {vehiculo.cliente?.apellido_paterno}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Placa: {vehiculo.placa} | VIN: {vehiculo.vin}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Estado de las Luces */}
        <Box>
          <Typography variant="h6" gutterBottom color="primary">
            💡 Estado de las Luces
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl 
                fullWidth 
                variant="outlined"
                error={!!errors.luces_frontales}
              >
                <InputLabel>Luces Frontales</InputLabel>
                <Select
                  value={formData.luces_frontales}
                  onChange={(e) => handleChange('luces_frontales', e.target.value)}
                  label="Luces Frontales"
                >
                  {estadoLucesOpciones.map((opcion) => (
                    <MenuItem key={opcion.value} value={opcion.value}>
                      {opcion.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.luces_frontales || 'Seleccione el estado de las luces frontales'}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl 
                fullWidth 
                variant="outlined"
                error={!!errors.luces_posteriores}
              >
                <InputLabel>Luces Posteriores</InputLabel>
                <Select
                  value={formData.luces_posteriores}
                  onChange={(e) => handleChange('luces_posteriores', e.target.value)}
                  label="Luces Posteriores"
                >
                  {estadoLucesOpciones.map((opcion) => (
                    <MenuItem key={opcion.value} value={opcion.value}>
                      {opcion.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.luces_posteriores || 'Seleccione el estado de las luces posteriores'}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
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

export default ModalNissan;