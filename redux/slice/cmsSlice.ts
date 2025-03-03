import { AxiosInstance } from "../api/axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  listState: [],
  editData: [],
};

export const list = createAsyncThunk("list", async () => {
  try {
    let response = await AxiosInstance.get(`/get/product`);
    return response?.data;
  } catch (error) {
    console.error("API Error:", error);
  }
});

export const createProduct = createAsyncThunk("create", async (formData) => {
  try {
    let response = await AxiosInstance.post(`/user/create/product`, formData);
    let result = response?.data;
    return result;
  } catch (error) {
    console.error("API Error:", error);
  }
});

export const edit = createAsyncThunk("edit", async (id: string) => {
  try {
    let response = await AxiosInstance.get(`/get/product/${id}`);
    return response.data.product; 
  } catch (error) {
    console.error("Edit API Error:", error);
    throw error;
  }
});



export const updateProduct = createAsyncThunk("updateproduct", async ({ id, dataEdit }) => {
  try {
    let response = await AxiosInstance.put(`/update/product/${id}`, dataEdit);
    return response.data.product; // ✅ Ensure returning correct product
  } catch (error) {
    console.error("Update API Error:", error);
    throw error;
  }
});


export const deleteProduct = createAsyncThunk("delete", async (id) => {
  let response = await AxiosInstance.delete(`/delete/product/${id}`);
  let result = response?.data;
  return result;
});



export const cmsSlice = createSlice({
  name: "cms",
  initialState: {
    listState: [],
    editData: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(list.fulfilled, (state, { payload }) => {
        if (payload?.status === true) {
          state.listState = payload;
        }
      })

      // create product
      .addCase(createProduct.pending, (state, { payload }) => {})
      .addCase(createProduct.fulfilled, (state, { payload }) => {})
      .addCase(createProduct.rejected, (state, { payload }) => {})


      // edit product
      .addCase(edit.pending, (state) => {
        state.editData = null; 
      })
      .addCase(edit.fulfilled, (state, { payload }) => {
        if (payload) {
          state.editData = payload; 
        } else {
          state.editData = null;
        }
      })
      
      .addCase(edit.rejected, (state) => {
        state.editData = null;
      })

      // update product
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.listState = state.listState.map((item: any) =>
          item._id === payload._id ? payload : item
        );
      });
      
  },
});

export default cmsSlice.reducer;



// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { AxiosInstance } from "../api/axios";

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   category: string;
// }

// interface CmsState {
//   listState: Product[];
//   editData: Product | null;
// }

// const initialState: CmsState = {
//   listState: [],
//   editData: null,
// };

// // Fetch product list
// export const list = createAsyncThunk("list", async (_, { rejectWithValue }) => {
//   try {
//     let response = await AxiosInstance.get(`/get/product`);
//     return response?.data?.product.map((item: any) => ({
//       id: item._id, 
//       name: item.name,
//       price: item.price,
//       description: item.description,
//       category: item.category,
//     })) || [];
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data || "Failed to fetch products");
//   }
// });

// // Fetch product details for editing
// export const edit = createAsyncThunk("edit", async (id: string, { rejectWithValue }) => {
//   try {
//     let response = await AxiosInstance.get(`/get/product/${id}`);
//     const item = response?.data?.product;
//     return item
//       ? {
//           id: item._id, // Normalize _id to id
//           name: item.name,
//           price: item.price,
//           description: item.description,
//           category: item.category,
//         }
//       : null;
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data || "Failed to fetch product details");
//   }
// });

// // Update product details
// export const updateProduct = createAsyncThunk(
//   "updateProduct",
//   async ({ id, dataEdit }: { id: string; dataEdit: Partial<Product> }, { rejectWithValue }) => {
//     try {
//       const response = await AxiosInstance.put(`/update/product/${id}`, dataEdit);
//       const updatedItem = response.data;
//       return {
//         id: updatedItem._id, 
//         name: updatedItem.name,
//         price: updatedItem.price,
//         description: updatedItem.description,
//         category: updatedItem.category,
//       };
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Product update failed");
//     }
//   }
// );

// export const cmsSlice = createSlice({
//   name: "cms",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch product list
//       .addCase(list.fulfilled, (state, { payload }) => {
//         state.listState = payload;
//       })

//       // Fetch single product for editing
//       .addCase(edit.fulfilled, (state, { payload }) => {
//         state.editData = payload;
//       })
//       .addCase(edit.rejected, (state) => {
//         state.editData = null;
//       })

//       // Update product
//       .addCase(updateProduct.fulfilled, (state, { payload }) => {
//         state.listState = state.listState.map((item) =>
//           item.id === payload.id ? payload : item
//         );
//       });
//   },
// });

// export default cmsSlice.reducer;
