import { useEffect, useRef, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchUserProfile, updateUserProfile } from '../../redux/features/slices/authSlice';
import { showAlert } from '../../redux/features/slices/alertSlice';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileForm from '../../components/Profile/ProfileForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import { User } from '../../interfaces/User';

const Profile = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false); 
  const hasFetchedProfile = useRef(false);

  useEffect(() => {
    if (!user && !hasFetchedProfile.current) {
      setLoading(true);
      dispatch(fetchUserProfile()).finally(() => setLoading(false));
      hasFetchedProfile.current = true;
    }
  }, [dispatch, user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedUser: Partial<User>) => {
    setLoading(true);
    try {
      const { name, phone, country, birthday } = updatedUser;
      const filteredUser: Partial<User> = { name, phone, country, birthday };

      await dispatch(updateUserProfile(filteredUser)).unwrap();
      await dispatch(fetchUserProfile());
      setIsEditing(false);

      dispatch(showAlert({ severity: 'success', text: 'Perfil actualizado correctamente' }));
    } catch (error) {
      dispatch(showAlert({ severity: 'error', text: 'Error al actualizar el perfil' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {loading ? (
        <LoadingSpinner centered={true} />
      ) : (
        <>
          <Typography variant="h5" sx={{ mt: 3, fontWeight: 'bold' }}>
            Profile
          </Typography>
          <Paper
            elevation={3}
            sx={{
              boxShadow: "0px 0px 27px -23px rgba(0,0,0,0.75)",
              borderRadius: "30px",
              flexGrow: 1,
              overflowY: "auto",
              padding: 3,
              mx: "auto",
              mt: 2,
            }}
          >
            {user && (
              <>
                <ProfileHeader onEdit={handleEdit} />
                <ProfileForm 
                  user={user} 
                  onSave={handleSave}  
                  isEditing={isEditing} 
                />
              </>
            )}
          </Paper>
        </>
      )}
    </Box>
  );
};

export default Profile;
