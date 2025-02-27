import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { loginCrud } from "@/redux/slice/authSlice";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(3, "Password must be at least 3 characters").required("Password is required"),
});

export default function Login() {
  const dispatch = useDispatch(); 
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data1) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await dispatch(loginCrud(data1)).unwrap();
      console.log(response, "response");

      if (response?.user.id) {
        localStorage.setItem("user_id", response.user.id);
        localStorage.setItem("user_token", response.token);
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Login Page
        </Typography>
        <Typography variant="body1" textAlign="center" mb={2}>
          Login using your registered email and password.
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <TextField
            fullWidth
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            {...register("password")}
            type={passwordType}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                onClick={() =>
                  setPasswordType((prev) => (prev === "password" ? "text" : "password"))
                }
              />
            }
            label="Show Password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
