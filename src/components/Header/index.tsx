import { Typography, Grid, Divider, Box, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect } from "react";
import { fetchUserProfile } from "../../redux/features/slices/authSlice";
import { Role } from "../../interfaces/User";

const Header = ({ onDrawerToggle }: { onDrawerToggle: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, role } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  if (!user || !role) {
    return null;
  }

  const roleLabel = role === Role.ADMIN ? "Admin" : "User";

  return (
    <Box
      component="header"
      sx={{
        padding: { xs: 2, sm: 3 },
        width: "100%",
      }}
    >
      <Grid
        container
        alignItems="center"
        sx={{ justifyContent: "space-between" }}
      >
        <Grid item xs={9} sm={8} md={11}>
          <Typography variant="h6" component="h2">
            Hello, {user.name}
          </Typography>
        </Grid>
        <Grid
          item
          md={1}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              marginRight: 2,
            }}
          />
          <Box
            textAlign="center"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100px",
            }}
          >
            <Typography variant="subtitle1">{user.name}</Typography>
            <Typography variant="caption">{roleLabel}</Typography>
          </Box>
        </Grid>
        <Grid item sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={onDrawerToggle}
            sx={{ paddingRight: { xs: 2, sm: 0 } }}
          >
            <MenuIcon aria-hidden="true" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
