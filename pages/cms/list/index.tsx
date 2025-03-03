import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { list, deleteProduct } from "@/redux/slice/cmsSlice";
import Link from "next/link";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ListPage() {
  const dispatch = useDispatch();
  const { listState } = useSelector((state: any) => state.cms);
  const [loading, setLoading] = useState<string | null>(null); 

  useEffect(() => {
    dispatch(list());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(id); // Show loading spinner on delete button
      try {
        await dispatch(deleteProduct(id)).unwrap(); // Ensure successful deletion
        dispatch(list()); // Re-fetch updated product list
      } catch (error) {
        console.error("Failed to delete product:", error);
      } finally {
        setLoading(null); // Remove loading state after deletion
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Typography variant="h3" gutterBottom align="center" fontWeight="bold">
          🛒 Product List
        </Typography>
        <Grid container spacing={3}>
          {listState?.product?.length > 0 ? (
            listState.product.map((item: any) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card
                  sx={{
                    minHeight: 240,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center", // Center content
                    boxShadow: 4,
                    borderRadius: 3,
                    transition: "0.3s",
                    background:
                      "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
                    ":hover": { boxShadow: 8, transform: "scale(1.05)" },
                    position: "relative",
                    padding: 2,
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {item.name}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="secondary">
                      ${item.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {item.description}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="text.primary" mt={1}>
                      📦 {item.category}
                    </Typography>
                  </CardContent>

                  <Box mt={2} display="flex" justifyContent="space-between" width="100%">
                    <Link href={`/cms/list/${item._id}`} passHref>
                      <Button variant="contained" color="primary" disabled={loading === item._id}>
                        {loading === item._id ? <CircularProgress size={24} color="inherit" /> : "Edit"}
                      </Button>
                    </Link>
                    <IconButton
                      onClick={() => handleDelete(item._id)}
                      color="error"
                      disabled={loading === item._id}
                    >
                      {loading === item._id ? <CircularProgress size={24} color="inherit" /> : <DeleteIcon />}
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" color="text.secondary" align="center" width="100%" mt={3}>
              No products available.
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
