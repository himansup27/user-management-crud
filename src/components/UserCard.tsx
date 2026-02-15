import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Chip,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { User } from '../types/user';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="div">
            {user.firstName} {user.lastName}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <EmailIcon sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
            {user.email}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PhoneIcon sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {user.phoneNumber}
          </Typography>
        </Box>

        {user.id && (
          <Chip
            label={`ID: ${user.id}`}
            size="small"
            sx={{ mt: 1 }}
            variant="outlined"
          />
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <Tooltip title="Edit user">
          <IconButton
            size="small"
            color="primary"
            onClick={() => onEdit(user)}
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete user">
          <IconButton
            size="small"
            color="error"
            onClick={() => user.id && onDelete(user.id)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default UserCard;
