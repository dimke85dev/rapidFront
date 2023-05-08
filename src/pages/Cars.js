import React, { Fragment, useEffect } from 'react';
import { getUsers } from '../store/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/UI/Loader';
import { getAllCars } from '../store/features/car/carSlice';

const Cars = () => {
  const { isLoading, cars } = useSelector((state) => state.car);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(typeRepairClear());
    dispatch(getAllCars());
  }, [dispatch]);

  if (!cars) return <Loader></Loader>;

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className="mx-auto bg-white px-5 py-2 rounded-xl mobile-form">
      <h3>Автомобілі</h3>
      {cars.length &&
        cars.map((el) => (
          <div key={el._id} className="mobile-form flex">
            <p className=" w-4/5 mx-auto border-solid border-2 border-gray-600 mb-2">
              {el.name}
            </p>
            <p className="w-4/5 mx-auto border-solid border-2 border-gray-600  mb-2">
              {el.vinCode}
            </p>
            <p className="w-1/5 mx-auto border-solid border-2 border-gray-600  mb-2">
              {el.year}p.
            </p>
          </div>
        ))}
    </div>
  );
};

export default Cars;