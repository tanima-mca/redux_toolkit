// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { useDispatch, useSelector } from "react-redux";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { Container, TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
// import { edit, updateProduct } from "@/redux/slice/cmsSlice";

// const schema = yup.object().shape({
//   name: yup.string().required("Product name is required"),
//   price: yup.number().typeError("Price must be a number").positive("Price must be positive").required("Price is required"),
//   description: yup.string().required("Description is required"),
//   category: yup.string().required("Category is required"),
// });

// export default function UpdateProduct() {
//   const router = useRouter();
//   const { slug } = router.query;
//   const id = slug as string;
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const { editData } = useSelector((state) => state.cms);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   // Fetch product details using slug
//   useEffect(() => {
//       dispatch(edit(id));
//   }, [dispatch, id]);

//   // Populate the form fields when editData is available
//   useEffect(() => {
//     if (editData) {
//       setValue("name", editData.name);
//       setValue("price", editData.price);
//       setValue("description", editData.description);
//       setValue("category", editData.category);
//     }
//   }, [editData, setValue]);

//   // Handle form submission for updating product details
//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       if (slug && typeof id === "string") {
//         await dispatch(updateProduct({ id, dataEdit: data })).unwrap();
//         router.push("/cms/list"); 
//       }
//     } catch (error) {
//       console.error("Product update failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
//         <Typography variant="h4" gutterBottom>
//           Edit Product
//         </Typography>
//         <Typography variant="body1" textAlign="center" mb={2}>
//           Edit your product details below.
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
//           <TextField fullWidth label="Product Name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} margin="normal" variant="outlined" />
//           <TextField fullWidth label="Price" {...register("price")} error={!!errors.price} helperText={errors.price?.message} margin="normal" variant="outlined" type="number" />
//           <TextField fullWidth label="Description" {...register("description")} error={!!errors.description} helperText={errors.description?.message} margin="normal" variant="outlined" />
//           <TextField fullWidth label="Category" {...register("category")} error={!!errors.category} helperText={errors.category?.message} margin="normal" variant="outlined" />
//           <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
//             {loading ? <CircularProgress size={24} color="inherit" /> : "Update Product"}
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// }


