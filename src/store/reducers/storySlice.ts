import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { replace } from 'lodash';

// Define a type for the slice state
interface CounterState {
  value: any;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: [],
};

export const prevSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updatePreviousBlock: (state,action: PayloadAction<any>) => {
      state.value.push(action.payload);
    },
    removePreviousBlock: (state) => {
      state.value.pop();
    },
    replacePreviousBlocks:(state,action: PayloadAction<any>)=>
    {
      state.value = action.payload;
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const {updatePreviousBlock,removePreviousBlock,replacePreviousBlocks } = prevSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBlock = (state: RootState) => state.story.value;

export default prevSlice.reducer;
