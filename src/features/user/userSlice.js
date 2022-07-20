import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchRestfulUserById} from './userAPI';


//status: 'idle' | 'loading' | 'failed';
const initialState = {
  entities: [],
  status: 'idle',
  error: undefined
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchUserById = createAsyncThunk(
  'user/fetchUserById', 
  async (userId, thunkAPI) => {
    console.log('llamando => '+userId)
  const response = await fetchRestfulUserById(userId);
  return response;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        console.log('loading')
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        console.log('idle')
        console.log("id => "+action.payload?.id)
        state.status = 'idle';
        state.error = undefined;
        state.entities = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action)=>{
        console.log('rejected')
        console.log('message ==> '+action.error?.message)
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

//export const {increment, decrement, incrementByAmount} = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user.entities;
export const selectUserFetchStatus = (state) => state.user.status; 
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
