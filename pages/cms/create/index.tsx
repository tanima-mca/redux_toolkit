import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";
import { createProduct } from "@/redux/slice/cmsSlice";

// Yup schema for validation
const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
});

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await dispatch(createProduct(data)).unwrap();
      toast.success("Product created successfully!");
      reset(); // ✅ Reset form after successful creation
    } catch (error) {
      console.error("Product creation failed", error);
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Toaster position="top-right" reverseOrder={false} />
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: "100%" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
            Create Product
          </Typography>
          <Typography variant="body1" textAlign="center" mb={3}>
            Provide product details below to add a new item.
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
            <TextField
              fullWidth
              label="Product Name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Price"
              {...register("price")}
              error={!!errors.price}
              helperText={errors.price?.message}
              margin="normal"
              variant="outlined"
              type="number"
            />
            <TextField
              fullWidth
              label="Description"
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
              margin="normal"
              variant="outlined"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Category"
              {...register("category")}
              error={!!errors.category}
              helperText={errors.category?.message}
              margin="normal"
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: "bold",
                backgroundColor: "#1976D2",
                ":hover": { backgroundColor: "#125CA1" },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Create Product"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateProduct;
