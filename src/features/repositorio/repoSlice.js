import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { fetchRestfulReposByUserId } from './repoAPI';


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
export const fetchReposByUserId = createAsyncThunk(
  'repo/fetchReposByUserId', 
  async (userId, thunkAPI) => {
    console.log('llamando => '+userId)
  const response = await fetchRestfulReposByUserId(userId);
  return response;
});

export const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReposByUserId.pending, (state) => {
        console.log('loading')
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(fetchReposByUserId.fulfilled, (state, action) => {
        console.log('idle')
        console.log("length => "+action.payload?.length)
        state.status = 'idle';
        state.error = undefined;
        state.entities = action.payload;
      })
      .addCase(fetchReposByUserId.rejected, (state, action)=>{
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
export const selectRepos = (state) => state.repo.entities;
export const selectStatus = (state) => state.repo.status; 
export const selectError = (state) => state.repo.error;

export default repoSlice.reducer;
