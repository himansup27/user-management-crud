import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  AppBar,
  Toolbar,
  CssBaseline,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import { User } from './types/user';
import { userService } from './services/api';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

type SnackbarState = {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info';
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users. Make sure the API server is running.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Create user
  const handleCreateUser = async (userData: User) => {
    try {
      await userService.createUser(userData);
      await fetchUsers();
      setFormOpen(false);
      showSnackbar('User created successfully!', 'success');
    } catch (err) {
      showSnackbar('Failed to create user', 'error');
      console.error('Error creating user:', err);
    }
  };

  // Update user
  const handleUpdateUser = async (userData: User) => {
    if (!selectedUser?.id) return;
    try {
      await userService.updateUser(selectedUser.id, userData);
      await fetchUsers();
      setFormOpen(false);
      setSelectedUser(null);
      showSnackbar('User updated successfully!', 'success');
    } catch (err) {
      showSnackbar('Failed to update user', 'error');
      console.error('Error updating user:', err);
    }
  };

  // Delete user
  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      await userService.deleteUser(userToDelete);
      await fetchUsers();
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      showSnackbar('User deleted successfully!', 'success');
    } catch (err) {
      showSnackbar('Failed to delete user', 'error');
      console.error('Error deleting user:', err);
    }
  };

  const openCreateForm = () => {
    setFormMode('create');
    setSelectedUser(null);
    setFormOpen(true);
  };

  const openEditForm = (user: User) => {
    setFormMode('edit');
    setSelectedUser(user);
    setFormOpen(true);
  };

  const openDeleteDialog = (id: number) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <PeopleIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Management System
          </Typography>
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={openCreateForm}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            Add User
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="400px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <UserList
            users={users}
            onEdit={openEditForm}
            onDelete={openDeleteDialog}
          />
        )}
      </Container>

      {/* Floating Action Button for mobile */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: { xs: 'flex', sm: 'none' },
        }}
        onClick={openCreateForm}
      >
        <AddIcon />
      </Fab>

      {/* User Form Dialog */}
      <UserForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={formMode === 'create' ? handleCreateUser : handleUpdateUser}
        initialData={selectedUser}
        mode={formMode}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
