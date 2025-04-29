import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UtilsState {
    device?: { mode: "mobile" | "tablet" | "desktop", width: number, height: number };
}

const initialState: UtilsState = {
    device: undefined,
} as UtilsState;

export const utilsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        detectDevice: (_state, action: PayloadAction<any>) => {
            return { ..._state, device: action.payload }
        }
    },
})

export const { detectDevice } = utilsSlice.actions;
export default utilsSlice.reducer;