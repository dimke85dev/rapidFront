import React, { useEffect } from 'react';
import { getAllMainRepairs } from '../store/features/carRepair/mainRepairSlice';
import { getAllTypeRepairsGet } from '../store/features/carRepair/typeRepairSlice';
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

  if (!typeAllRepair && !mainRepair) return <Loader></Loader>;

  return typeloading || loading ? (
    <Loader></Loader>
  ) : (
    <div className=" bg-white px-8 py-2 rounded-xl mobile-form">
      {mainRepair.length &&
        mainRepair.map((el) => (
          <div key={el._id}>
            <div className="my-5 text-yellow-600 ">{el.nameMainRepair}</div>
            <div className="flex justify-between gap-3">
              <h3 className="text-left">Найменування</h3>
              <div className="flex gap-10">
                <h3 className="text-green-500">Ціна</h3>
              </div>
            </div>
            <div>
              {el.typeRepair.map((type) => (
                <div className="flex justify-between gap-3" key={type}>
                  <span className="text-left">
                    {typeAllRepair.find((el) => el._id === type).nameTypeRepair}
                  </span>
                  <div className=" w-1/6 flex justify-between gap-3">
                    <span className="text-left">від </span>
                    <span className="text-green-500 text-right">
                      {typeAllRepair.find((el) => el._id === type).price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Price;
