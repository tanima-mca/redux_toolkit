import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";
import { verifyCrud } from "@/redux/slice/authSlice";

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  otp: yup.string().required("OTP is required"),
});

export default function Verify() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data1: { email: string; otp: string }) => {
    setLoading(true);

    try {
      await dispatch(verifyCrud(data1)).unwrap();
      toast.success("OTP Verified Successfully!");
      reset(); // Reset form fields
      setTimeout(() => {
        router.push("/login"); // Redirect to login page
      }, 1500);
    } catch (error) {
      toast.error("Verification failed. Please try again.");
      console.error("Verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5, textAlign: "center", borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          Verify OTP
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={2}>
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
          />
          <TextField
            fullWidth
            label="OTP"
            {...register("otp")}
            error={!!errors.otp}
            helperText={errors.otp?.message}
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Verify"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}


