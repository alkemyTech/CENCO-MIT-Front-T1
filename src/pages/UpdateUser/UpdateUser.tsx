import { useEffect, useRef, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchUserProfile, fetchUserProfileById, updateUserByAdmin } from '../../redux/features/slices/authSlice';
import { showAlert } from '../../redux/features/slices/alertSlice';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileForm from '../../components/Profile/ProfileForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import { User } from '../../interfaces/User';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const dispatch: AppDispatch = useDispatch();
    const { userById } = useSelector((state: RootState) => state.auth);

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const hasFetchedProfile = useRef(false);
    const { userID } = useParams<{ userID: string }>();
    const userIdDef = Number(userID);

    useEffect(() => {

        if (!userById && !hasFetchedProfile.current) {
            setLoading(true);
            dispatch(fetchUserProfileById(userIdDef)).finally(() => setLoading(false));
            hasFetchedProfile.current = true;
        }
    }, [dispatch, userById, userIdDef]);

    const handleEdit = () => {
        setIsEditing(true);
    };


    const handleSave = async (updatedUserById: Partial<User>) => {
        setLoading(true);
        try {

            const { name, phone, email } = updatedUserById;
            const filteredUser: Partial<User> = { name, phone, email };

            await dispatch(updateUserByAdmin({ id: userIdDef, filteredUser })).unwrap();
            await dispatch(fetchUserProfileById(userIdDef));
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
                        {userById && (
                            <>
                                <ProfileHeader onEdit={handleEdit} />
                                <ProfileForm
                                    user={userById}
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

export default UpdateUser;
