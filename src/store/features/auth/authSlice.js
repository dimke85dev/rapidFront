import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
  messageType: '',
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, password }) => {
    try {
      const { data } = await axios.post('/auth/register', {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      toast(error.response.data.message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'error',
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }) => {
    try {
      const { data } = await axios.post('/auth/login', {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      toast(error.response.data.message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'error',
      });
      // console.log(error);
    }
  }
);

export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const { data } = await axios.get('/auth/me');

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    //Register User

    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload?.message; // сообщение из бэкэнда
      state.messageType = action.payload?.messageType;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    });

    //Login User
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload?.message; // сообщение из бэкэнда
      state.messageType = action.payload?.messageType;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    });
    //////////////////////////////////////////

    //Get Me - Проверка авторизации
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = null; // сообщение из бэкэнда
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.status = action.payload.message;
      state.messageType = action.payload.messageType;
      state.isLoading = false;
    });
    ////////////////////////////////////////////
  },
  //////////////////////////////////////////

  // extraReducers: {
  //   [registerUser.pending]: (state) => {
  //     state.isLoading = true;
  //     state.status = null;
  //   },
  //   [registerUser.fulfilled]: (state, action) => {
  //     console.log(state);
  //     state.isLoading = false;
  //     state.status = action.payload.message; // сообщение из бэкэнда
  //     state.user = action.payload.user;
  //     state.token = action.payload.token;
  //   },
  //   [registerUser.rejected]: (state, action) => {
  //     state.status = action.payload.message;
  //     state.isLoading = false;
  //   },
  // },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);
export const { logout } = authSlice.actions;

export default authSlice.reducer;
