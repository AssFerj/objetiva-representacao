import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Receipt } from "@/types";

interface ReceiptState {
    receipts: Receipt[];
    loading: boolean;
    error: string | null;
}

const initialState: ReceiptState = {
    receipts: [],
    loading: false,
    error: null
};

export const fetchReceipts = createAsyncThunk(
    'receipts/fetchReceipts',
    async (userId: string) => {
        const response = await fetch(`/api/receipts/${userId}`);
        const data = await response.json();
        return data;
    }
);

export const addReceipt = createAsyncThunk(
    'receipts/addReceipt',
    async (receipt: Receipt) => {
        const response = await fetch('/api/receipts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(receipt),
        });
        const data = await response.json();
        return data;
    }
);

export const updateReceipt = createAsyncThunk(
    'receipts/updateReceipt',
    async (receipt: Receipt) => {
        const response = await fetch(`/api/receipts/${receipt.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(receipt),
        });
        const data = await response.json();
        return data;
    }
);

export const deleteReceipt = createAsyncThunk(
    'receipts/deleteReceipt',
    async (receiptId: string) => {
        const response = await fetch(`/api/receipts/${receiptId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    }
);

const receiptSlice = createSlice({
    name: 'receipts',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setReceipts: (state, action) => {
            state.receipts = action.payload;
        },
        clearReceipts: (state) => {
            state.receipts = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReceipts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReceipts.fulfilled, (state, action) => {
                state.loading = false;
                state.receipts = action.payload;
            })
            .addCase(fetchReceipts.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.payload as string;
            })
            .addCase(addReceipt.fulfilled, (state, action) => {
                state.receipts.push(action.payload);
            })
            .addCase(updateReceipt.fulfilled, (state, action) => {
                const index = state.receipts.findIndex(
                    (receipt) => receipt.id === action.payload.id
                );
                if (index !== -1) {
                    state.receipts[index] = action.payload;
                }
            })
            .addCase(deleteReceipt.fulfilled, (state, action) => {
                state.receipts = state.receipts.filter(
                    (receipt) => receipt.id !== action.payload.id
                );
            });
    }
});

export const { clearError, setReceipts, clearReceipts } = receiptSlice.actions;
export default receiptSlice.reducer;