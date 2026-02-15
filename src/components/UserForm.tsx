import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { User } from '../types/user';
import { formFieldsConfig } from '../config/formConfig';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: User) => void;
  initialData?: User | null;
  mode: 'create' | 'edit';
}

const UserForm: React.FC<UserFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  mode,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: initialData || {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    },
  });

  React.useEffect(() => {
    if (open) {
      reset(initialData || {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
      });
    }
  }, [open, initialData, reset]);

  const handleFormSubmit = (data: User) => {
    onSubmit(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {mode === 'create' ? 'Add New User' : 'Edit User'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          {formFieldsConfig.map((field) => (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              rules={{
                required: field.validation.required
                  ? `${field.label} is required`
                  : false,
                pattern: field.validation.pattern
                  ? {
                      value: field.validation.pattern,
                      message: field.validation.message || 'Invalid format',
                    }
                  : undefined,
                minLength: field.validation.minLength
                  ? {
                      value: field.validation.minLength,
                      message: field.validation.message || `Minimum ${field.validation.minLength} characters`,
                    }
                  : undefined,
                maxLength: field.validation.maxLength
                  ? {
                      value: field.validation.maxLength,
                      message: field.validation.message || `Maximum ${field.validation.maxLength} characters`,
                    }
                  : undefined,
              }}
              render={({ field: controllerField }) => (
                <TextField
                  {...controllerField}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  fullWidth
                  margin="normal"
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                  multiline={field.multiline}
                  rows={field.multiline ? 3 : 1}
                  required={field.validation.required}
                />
              )}
            />
          ))}
          
          {Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Please fix the errors above before submitting
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          variant="contained"
          color="primary"
        >
          {mode === 'create' ? 'Create' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
