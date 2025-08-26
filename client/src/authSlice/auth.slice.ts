import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axiosInstance";

const initialState = {
  status: "idle",
  error: null,
  user: null,
  suggestUser: null,
};

export const login: any = createAsyncThunk("login", async (initialUser) => {
  try {
    const res = await axiosInstance.post("/auth/login", initialUser);
    return res.data;
  } catch (error) {
    console.log(`Error in loginSlice ${error}`);
  }
});

export const signup: any = createAsyncThunk("signup", async (initialUser) => {
  try {
    const res = await axiosInstance.post("/auth/signup", initialUser);
    return res.data;
  } catch (error) {
    console.log(`Error in signUpSlice ${error}`);
  }
});

export const logout: any = createAsyncThunk("logout", async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  } catch (error) {
    console.log(`Error in logoutSlice ${error}`);
  }
});

export const suggestUser: any = createAsyncThunk("/suggesteduser", async () => {
  try {
    const res = await axiosInstance.get("/user/suggesteduser");
    return res.data;
  } catch (error) {
    console.log(`Error in suggestedUserSlice ${error}`);
  }
});

export const getUser: any = createAsyncThunk("getme", async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log(`Error in get me Slice ${error}`);
  }
});

export const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    authUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state: any, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state: any, action: any) => {
        state.status = "error";
        state.error = action.payload.message;
      })
      .addCase(signup.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state: any, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state: any) => {
        state.status = "error";
      })
      .addCase(suggestUser.fulfilled, (state: any, action) => {
        state.suggestUser = action.payload;
      })
      .addCase(logout.fulfilled, (state: any) => {
        state.user = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
       state.status = "succeded"
        state.user = action.payload;
      });
  },
});

export const authError = (state: any) => state.auth.error;
export const authStatus = (state: any) => state.auth.status;
export const suggestedUser = (state: any) => state.auth.suggestUser;
export const selectUser = (state: any) => state.auth.user;

export default authSlice.reducer;
