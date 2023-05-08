import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import { toast } from 'react-toastify';

const initialState = {
  car: null,
  cars: [],
  status: null,
  messageType: null,
  isloading: false,
};

export const createCar = createAsyncThunk(
  'car/createCar',
  async ({ name, year, vinCode }) => {
    try {
      const { data } = await axios.post('cars/newcar', {
        name,
        year,
        vinCode,
      });

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

export const getCar = createAsyncThunk('car/getCar', async ({ vinCode }) => {
  // console.log(vinCode);
  try {
    const { data } = await axios.post('cars/carvin', { vinCode });
    // console.log(data);
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
});

export const getAllCars = createAsyncThunk('car/allCar', async () => {
  try {
    const { data } = await axios.get('cars/allcars');

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
});

export const CarSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    carOut: (state) => {
      state.car = null;
      state.status = null;
      state.messageType = null;
      // state.isloading = false;
    },
  },
  extraReducers: (builder) => {
    // Create Car
    builder.addCase(createCar.pending, (state) => {
      state.isloading = true;
      state.status = null;
    });
    builder.addCase(createCar.fulfilled, (state, action) => {
      state.isloading = false;
      state.status = action.payload?.message;
      state.messageType = action.payload?.messageType;
      state.car = action.payload?.car;
    });
    builder.addCase(createCar.rejected, (state, action) => {
      state.status = action.payload?.message;
      state.isloading = false;
    });

    builder.addCase(getCar.pending, (state) => {
      state.isloading = true;
      state.status = null;
    });
    builder.addCase(getCar.fulfilled, (state, action) => {
      state.isloading = false;
      state.status = action.payload?.message;
      state.messageType = action.payload?.messageType;
      state.car = action.payload?.car;
    });
    builder.addCase(getCar.rejected, (state, action) => {
      state.status = action.payload.message;
      state.isloading = false;
    });

    builder.addCase(getAllCars.pending, (state) => {
      state.isloading = true;
      state.status = null;
    });
    builder.addCase(getAllCars.fulfilled, (state, action) => {
      state.isloading = false;
      state.status = action.payload?.message;
      state.cars = action.payload;
    });
    builder.addCase(getAllCars.rejected, (state, action) => {
      state.status = action.payload.message;
      state.isloading = false;
    });
  },
});

export default CarSlice.reducer;
export const { carOut } = CarSlice.actions;
