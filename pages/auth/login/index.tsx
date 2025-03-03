// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   Container,
//   TextField,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Typography,
//   Box,
//   CircularProgress,
//   Paper,
// } from "@mui/material";
// import { loginCrud } from "@/redux/slice/authSlice";

// const schema = yup.object().shape({
//   email: yup.string().email("Invalid email format").required("Email is required"),
//   password: yup.string().min(3, "Password must be at least 3 characters").required("Password is required"),
// });

// export default function Login() {
//   const dispatch = useDispatch();
//   const [passwordType, setPasswordType] = useState("password");
//   const [loading, setLoading] = useState(false);
  
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data1) => {
//     setLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       const response = await dispatch(loginCrud(data1)).unwrap();

//       if (response?.user.id) {
//         localStorage.setItem("user_id", response.user.id);
//         localStorage.setItem("user_token", response.token);
//         toast.success("Login Successful!");
//         reset();
//       }
//     } catch (error) {
//       toast.error("Login Failed. Please check your credentials.");
//       console.error("Login failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Toaster position="top-center" reverseOrder={false} />
//       <Paper elevation={6} sx={{ p: 4, borderRadius: 3, mt: 5, textAlign: "center" }}>
//         <Typography variant="h4" fontWeight={600} gutterBottom>
//           Login
//         </Typography>
//         <Typography variant="body1" mb={3}>
//           Welcome back! Please login to your account.
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
//           <TextField
//             fullWidth
//             label="Email"
//             {...register("email")}
//             error={!!errors.email}
//             helperText={errors.email?.message}
//             margin="normal"
//             variant="outlined"
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             {...register("password")}
//             type={passwordType}
//             error={!!errors.password}
//             helperText={errors.password?.message}
//             margin="normal"
//             variant="outlined"
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 onClick={() =>
//                   setPasswordType((prev) => (prev === "password" ? "text" : "password"))
//                 }
//               />
//             }
//             label="Show Password"
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2, bgcolor: "#1976d2", '&:hover': { bgcolor: "#1565c0" } }}
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }



import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import {
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";
import Link from "next/link";
import { loginCrud } from "@/redux/slice/authSlice";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(3, "Password must be at least 3 characters").required("Password is required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data1) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await dispatch(loginCrud(data1)).unwrap();

      if (response?.user.id) {
        localStorage.setItem("user_id", response.user.id);
        localStorage.setItem("user_token", response.token);
        toast.success("Login Successful!");
        router.push("/cms/list");
        reset();
      }
    } catch (error) {
      toast.error("Login Failed. Redirecting to Register...");
      console.error("Login failed", error);
      setTimeout(() => {
        router.push("/register");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Toaster position="top-center" reverseOrder={false} />
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, mt: 5, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Login
        </Typography>
        <Typography variant="body1" mb={3}>
          Welcome back! Please login to your account.
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
            sx={{ mt: 2, bgcolor: "#1976d2", '&:hover': { bgcolor: "#1565c0" } }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>

          {/* Register Redirection */}
          <Typography variant="body2" mt={2}>
            Don't have an account?{" "}
            <Link href="/auth/register" passHref style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>
              Register here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

