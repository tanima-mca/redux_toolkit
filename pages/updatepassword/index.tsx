// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store"; // Import the correct type
// import { useForm, SubmitHandler } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import {
//   Container,
//   TextField,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Typography,
//   Box,
//   CircularProgress,
// } from "@mui/material";
// import { updatePassCrud } from "@/redux/slice/authSlice";
// import toast from "react-hot-toast";

// // Validation Schema
// const schema = yup.object().shape({
//   password: yup.string().min(3, "Password must be at least 3 characters").required("Password is required"),
// });

// export default function UpdatePassword() {
//   const dispatch = useDispatch<AppDispatch>();
//   const [passwordType, setPasswordType] = useState<"password" | "text">("password");
//   const [loading, setLoading] = useState<boolean>(false);

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const user_id = localStorage.getItem("user_id");

//       if (!user_id) {
//         toast.error("User ID not found! Please log in again.");
//         return;
//       }

//       const formData = { user_id, password: data.password };
//       const response = await dispatch(updatePassCrud(formData)).unwrap();

//       toast.success(response?.message || "Password updated successfully!");
//     } catch (error: any) {
//       toast.error(error?.message || "Failed to update password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
//         <Typography variant="h4" gutterBottom>
//           Update Password
//         </Typography>
//         <Typography variant="body1" textAlign="center" mb={2}>
//           Enter your new password to update your account.
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
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
//                 onClick={() => setPasswordType((prev) => (prev === "password" ? "text" : "password"))}
//               />
//             }
//             label="Show Password"
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2 }}
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : "Update Password"}
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// }

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
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
  Grid,
} from "@mui/material";
import { updatePassCrud } from "@/redux/slice/authSlice";
import toast from "react-hot-toast";

// Validation Schema
const schema = yup.object().shape({
  oldPassword: yup.string().required("Previous password is required"),
  password: yup
    .string()
    .min(3, "Password must be at least 3 characters")
    .required("New password is required"),
});

export default function UpdatePassword() {
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user_id = localStorage.getItem("user_id");

      if (!user_id) {
        toast.error("User ID not found! Please log in again.");
        return;
      }

      const formData = {
        user_id,
        oldPassword: data.oldPassword,
        password: data.password,
      };
      const response = await dispatch(updatePassCrud(formData)).unwrap();

      toast.success(response?.message || "Password updated successfully!", {
        duration: 3000,
      });
      reset(); // Reset form after success
    } catch (error: any) {
      toast.error(error?.message || "Failed to update password", {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={5}
        p={4}
        borderRadius={3}
        boxShadow={3}
        sx={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Update Password
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          mb={2}
          sx={{ color: "#555" }}
        >
          Enter your previous and new password to update your account.
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <Grid container spacing={2}>
            {/* Previous Password */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Previous Password"
                {...register("oldPassword")}
                type={passwordType}
                error={!!errors.oldPassword}
                helperText={errors.oldPassword?.message}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            {/* New Password */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                {...register("password")}
                type={passwordType}
                error={!!errors.password}
                helperText={errors.password?.message}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            {/* Show Password Checkbox */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={() =>
                      setPasswordType((prev) =>
                        prev === "password" ? "text" : "password"
                      )
                    }
                  />
                }
                label="Show Password"
              />
            </Grid>

            {/* Update Password Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{
                  fontWeight: "bold",
                  background: "#1e88e5",
                  ":hover": { background: "#1565c0" },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Update Password"
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
