import React, { Fragment, useEffect, useState } from 'react';
import { getAllMainRepairs } from '../store/features/carRepair/mainRepairSlice';
import {
  getAllTypeRepairsGet,
  typeRepairClear,
} from '../store/features/carRepair/typeRepairSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/UI/Loader';

const Price = () => {
  const { loading, mainRepair } = useSelector((state) => state.mainrepair);
  const { typeAllRepair, loading: typeloading } = useSelector(
    (state) => state.typerepair
  );
  // console.log(typeRepair);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(typeRepairClear());
    dispatch(getAllMainRepairs());
    dispatch(getAllTypeRepairsGet());
  }, [dispatch]);

  return typeloading || loading ? (
    <Loader></Loader>
  ) : (
    <div className="bg-white px-8 py-2 rounded-xl">
      {mainRepair.length &&
        mainRepair.map((el) => (
          <div key={el._id}>
            <div className="my-5 text-yellow-600 ">{el.nameMainRepair}</div>
            <div>
              {el.typeRepair.map((type) => (
                <div className="flex justify-between gap-3" key={type}>
                  <span className="text-left">
                    {typeAllRepair.find((el) => el._id === type).nameTypeRepair}
                  </span>
                  <span className="text-green-500">
                    {typeAllRepair.find((el) => el._id === type).price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Price;
