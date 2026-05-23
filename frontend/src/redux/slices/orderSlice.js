import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	status: "idle",
};

const orderSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		setOrders: (state, action) => {
			state.items = action.payload;
		},
	},
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
