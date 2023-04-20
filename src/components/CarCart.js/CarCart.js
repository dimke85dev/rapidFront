import React from 'react';
import { useSelector } from 'react-redux';

const CarCart = () => {
  const { status, messgeType, car } = useSelector((state) => state.car);
  if (!car) return;
  console.log(car);
  return (
    <div className="bg-gray-300 flex gap-5 ">
      <div className="">{car[0].name}</div>
      <div className="">{car[0].year}</div>
      <div className="">{car[0].vinCode}</div>
    </div>
  );
};

export default CarCart;
