import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import apiCaller, { Endpoints, Methods } from "src/api"
import { isPendingAction, isFulfilledAction, isRejectedAction } from "src/utils/matchers"
import { setTokens } from "src/utils/tokenUtils"
// import { setTokens } from "utils/tokenUtils"

const { POST } = Methods

export const login = createAsyncThunk("auth/Login", async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await apiCaller({
      url: Endpoints.LOGIN,
      method: POST,
      data: {
        username: username,
        password: password,
      },
    })
    return response
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const register = createAsyncThunk("auth/register", async (params, { rejectWithValue }) => {
  try {
    const response = await apiCaller({
      url: Endpoints.REGISTER,
      method: POST,
      data: params,
    })
    return response
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const logout = createAsyncThunk("auth/logout", async (payload, { rejectWithValue }) => {
  try {
    await apiCaller({
      url: Endpoints.LOGOUT,
      method: POST,
    })
  } catch (error) {
    return rejectWithValue(error)
  }
})

const initialState = {
  loading: false,
  error: "",
  user: {},
  isAuthenticated: false,
}

//Example slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: () => {
      return {
        ...initialState,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, () => {
      // setTokens({ accessToken: "", refreshToken: "" })
      window.location.pathname = LOGIN_URL
    })
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        setTokens({ accessToken: payload.token })
        state.user = payload.user
        state.isAuthenticated = true
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        setTokens({ accessToken: payload.token })
        state.user = payload.user
        state.isAuthenticated = true
      })
    builder
      .addMatcher(isPendingAction("auth"), (state) => {
        state.loading = true
      })
      .addMatcher(isFulfilledAction("auth"), (state) => {
        state.loading = false
      })
      .addMatcher(isRejectedAction("auth"), (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { resetAuth } = authSlice.actions
export default authSlice.reducer
