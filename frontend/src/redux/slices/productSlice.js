import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	status: "idle",
	error: null,
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts: (state, action) => {
			state.items = action.payload;
		},
	},
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
