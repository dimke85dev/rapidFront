import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getCarById } from '../store/features/car/carSlice';
import Loader from '../components/UI/Loader';

const Car = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const id = param.id;
  const { car } = useSelector((state) => state.car);

  useEffect(() => {
    dispatch(getCarById(id));
  }, [dispatch, id]);
  //   setCar(cars.find((el) => el._id === param.id));

  //   console.log(ddd);

  if (!car) return <Loader></Loader>;

  return (
    <Fragment>
      <div className="flex p-2 bg-white justify-between">
        <h3>{car.name}</h3>
        <h3>{car.year}</h3>
        <h3>{car.vinCode}</h3>
      </div>
      <div>
        {car?.repairs && car.repairs.map((el) => <div>{el?.nameMaster}</div>)}
      </div>
    </Fragment>
  );
};

export default Car;
