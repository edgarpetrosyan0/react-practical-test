import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Device  {
    mode: "mobile" | "tablet" | "desktop",
    width: number,
    height: number
}
export interface UtilsState {
    device?: Device;
    isAuthenticated: boolean | null,
}

const initialState: UtilsState = {
    device: undefined,
    isAuthenticated: null,

} as UtilsState;

export const utilsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        
        detectDevice: (_state, action: PayloadAction<Device>) => {
            return { ..._state, device: action.payload }
        },

        setAuthentication: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
    },
})

export const { detectDevice, setAuthentication } = utilsSlice.actions;
export default utilsSlice.reducer;