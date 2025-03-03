import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
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
  Card,
  CardContent,
} from "@mui/material";
import { edit, updateProduct } from "@/redux/slice/cmsSlice";

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

export default function UpdateProduct() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { editData, loading: fetchLoading } = useSelector((state: any) => state.cms);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Fetch product details when ID is available
  useEffect(() => {
    if (id) {
      dispatch(edit(id));
    }
  }, [dispatch, id]);

  // Populate form once data is available
  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      setValue("name", editData.name);
      setValue("price", editData.price);
      setValue("description", editData.description);
      setValue("category", editData.category);
    }
  }, [editData, setValue]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (id) {
        await dispatch(updateProduct({ id, dataEdit: data })).unwrap();
        router.push("/cms/list");
      }
    } catch (error) {
      console.error("Product update failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Card
          sx={{
            width: "100%",
            maxWidth: 500,
            boxShadow: 5,
            borderRadius: 3,
            padding: 3,
            background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              textAlign="center"
              fontWeight="bold"
              color="primary"
            >
              ✏️ Edit Product
            </Typography>

            {fetchLoading ? (
              <Box display="flex" justifyContent="center" mt={3}>
                <CircularProgress />
              </Box>
            ) : (
              <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
                <TextField
                  fullWidth
                  label="Product Name"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  margin="normal"
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
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
                  sx={{ borderRadius: 2 }}
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
                  sx={{ borderRadius: 2 }}
                />
                <TextField
                  fullWidth
                  label="Category"
                  {...register("category")}
                  error={!!errors.category}
                  helperText={errors.category?.message}
                  margin="normal"
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontSize: "1rem",
                    borderRadius: 2,
                    fontWeight: "bold",
                  }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Update Product"}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
