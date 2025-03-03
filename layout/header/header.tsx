import React from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/redux/slice/authSlice";
import { useRouter } from "next/router";

export default function Header() {
  const dispatch = useDispatch();
  const { isToggle } = useSelector((state: any) => state.Auth);
  const router = useRouter();

  console.log(isToggle, "isToggle");
  const LogOut = () => {
    dispatch(logOut());
  
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2", boxShadow: 3 }}>
      <Toolbar>
        {/* Menu Icon */}
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        {/* Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          Product App
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link href="/updatepassword" passHref>
            <Button
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": { backgroundColor: "#5c6bc0" },
              }}
            >
              Update Password
            </Button>
          </Link>
          <Link href="/cms/create" passHref>
            <Button
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": { backgroundColor: "#66BB6A" },
              }}
            >
              Add Product
            </Button>
          </Link>
          <Link href="/cms/list" passHref>
            <Button
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": { backgroundColor: "#42A5F5" },
              }}
            >
              Product List
            </Button>
          </Link>
        </Box>
        {isToggle ? (
          <Link href="/auth/login" onClick={LogOut} passHref>
            LogOut
          </Link>
        ) : (
          <Link href="/auth/login" passHref>
            LogIn
          </Link>
        )}
        {/* Profile & Authentication */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link href="/auth/login" passHref>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
