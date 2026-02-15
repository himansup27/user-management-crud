import React from 'react';
import { Grid, Typography, Box, Paper } from '@mui/material';
import { User } from '../types/user';
import UserCard from './UserCard';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 6,
          textAlign: 'center',
          backgroundColor: 'grey.50',
          border: '2px dashed',
          borderColor: 'grey.300',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No users found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click the "Add User" button to create your first user
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        All Users ({users.length})
      </Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard user={user} onEdit={onEdit} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserList;
