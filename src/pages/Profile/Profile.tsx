import { useEffect, useRef, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchUserProfile } from '../../redux/features/slices/authSlice';
import ProfileForm from '../../components/Profile/ProfileForm';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import { User } from '../../interfaces/User';

const Profile = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const hasFetchedProfile = useRef(false);

  useEffect(() => {
    if (!user && !hasFetchedProfile.current) {
      dispatch(fetchUserProfile());
      hasFetchedProfile.current = true;
    }
  }, [dispatch, user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedUser: User) => {
    console.log('Saving user:', updatedUser);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
              setIsEditing={setIsEditing}
            />
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;
