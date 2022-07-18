const thunkReject = (error, thunkAPI) => {
  if (!error.response) {
    throw error;
  }
  return thunkAPI.rejectWithValue(error.response.data.message);
};
export default thunkReject;
