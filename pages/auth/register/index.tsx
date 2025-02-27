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
import { registerCrud } from "../../../redux/slice/authSlice";

// Define form validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)/,
      "Must contain at least one uppercase letter and one number"
    )
    .required("Password is required"),
});

// // Define form data types
// type FormValues = {
//   name: string;
//   email: string;
//   password: string;
// };

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data1: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await dispatch(registerCrud(data1)).unwrap();
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Register Page
        </Typography>
        <Typography variant="body1" textAlign="center" mb={2}>
          Create an account using your name, email, and password.
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <TextField
            fullWidth
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
            variant="outlined"
          />
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
                checked={passwordType === "text"}
                onChange={() =>
                  setPasswordType((prev) =>
                    prev === "password" ? "text" : "password"
                  )
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
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
