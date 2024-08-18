import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import apiCaller, { Endpoints, Methods } from "src/api"
import { isPendingAction, isFulfilledAction, isRejectedAction } from "src/utils/matchers"
// import { setTokens } from "utils/tokenUtils"

const { GET } = Methods

export const getUsersList = createAsyncThunk("home/users/list", async (params, { rejectWithValue }) => {
  try {
    const response = await apiCaller({
      url: Endpoints.USERS_LIST,
      method: GET,
    })
    return response
  } catch (err) {
    return rejectWithValue(err)
  }
})

const initialState = {
  loading: false,
  usersList: [],
  selectedUser: {},
  messages: {},
  activeUsers: [],
}
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setSelectedUser: (state, { payload }) => {
      state.selectedUser = payload
    },

    updateMessages: (state, { payload }) => {
      const { message, userId } = payload
      if (!message || !userId) return

      // Check if the userId and message are present
      if (!userId || !message) return

      // Initialize messages array if it doesn't exist for the given userId
      if (!state.messages[userId]) {
        state.messages[userId] = { messages: [] }
      }

      // Append the new message to the existing messages array
      state.messages[userId].messages.push(message)
    },

    setActiveUsers: (state, { payload }) => {
      state.activeUsers = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersList.fulfilled, (state, { payload }) => {
      state.usersList = [...state.usersList, ...payload?.users]

      // Populate messages in the state
      payload?.users.forEach((user) => {
        state.messages[user.userId] = {
          messages: user.messages.messages,
        }
      })
    })
    builder
      .addMatcher(isPendingAction("home"), (state) => {
        state.loading = true
      })
      .addMatcher(isFulfilledAction("home"), (state) => {
        state.loading = false
      })
      .addMatcher(isRejectedAction("home"), (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setSelectedUser, updateMessages, setActiveUsers } = homeSlice.actions

export default homeSlice.reducer
