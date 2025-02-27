import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { verifyCrud } from "@/redux/slice/authSlice";



const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  otp: yup
    .string()
    .required("OTP is required"),
});

export default function Verify() {
  const dispatch = useDispatch();
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

    const data = {
      email: data1.email,
      otp: data1.otp,
    };

    try {
      await dispatch(verifyCrud(data));
    } catch (error) {
      console.error("Verification failed", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Verify OTP
        </Typography>
        <Typography variant="body1" textAlign="center" mb={2}>
          Enter your registered email and the OTP sent to you.
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
            type="text"
          />
          <TextField
            fullWidth
            label="OTP"
            {...register("otp")}
            error={!!errors.otp}
            helperText={errors.otp?.message}
            margin="normal"
            variant="outlined"
            type="text"
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
              "Verify"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
