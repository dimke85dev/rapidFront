import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getCarById } from '../store/features/car/carSlice';
import Loader from '../components/UI/Loader';
import { getCarRepairs } from '../store/features/carRepair/mainRepairSlice';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import styles from './Car.module.css';

const Car = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const id = param.id;
  const { car } = useSelector((state) => state.car);
  const { carRepairs, isLoading } = useSelector((state) => state.mainrepair);

  useEffect(() => {
    dispatch(getCarById(id));
    dispatch(getCarRepairs());
  }, [dispatch, id]);
  //   setCar(cars.find((el) => el._id === param.id));

  if (!car) return <Loader></Loader>;
  // if (!carRepairs.length) return <Loader></Loader>;

  return (
    <Fragment>
      <div
        className={`${styles['car-mobile']} mobile-form w-3/4 mx-auto flex flex-col py-2 px-2 bg-white justify-between border-solid border-2 border-gray-600 rounded-xl shadow-xl shadow-green-800/80 `}
      >
        <div className="flex justify-between px-2">
          <h4>Модель : {car.name}</h4>
          <h4>Рік : {car.year}</h4>
          <h4>VinCode : {car.vinCode}</h4>
        </div>

        <div className=" ">
          {car?.repairs &&
            car.repairs.map((rep) => (
              <div className="p-2 bg-white" key={rep}>
                {carRepairs
                  .filter((el) => el._id === rep)
                  .map((el) => (
                    <div
                      key={el._id}
                      className="border-solid border-2 border-gray-600 rounded-xl"
                    >
                      <div
                        className="flex gap-4 px-3 py-1 "
                        key={Math.random()}
                      >
                        {/* <div>{el._id}</div> */}
                        <div>Замовник : {el.nameClient}</div>
                        <div>Тел : {el.phoneClient}</div>
                        <div>
                          Дата : {format(new Date(el.date), 'dd.MM.yyyy')}
                        </div>
                      </div>
                      <div>
                        {el.repair.map((el) => (
                          <div
                            className="flex justify-between px-4"
                            key={Math.random()}
                          >
                            <div className="w-2/5 text-left">
                              {el.mainRepairName}
                            </div>
                            <div className="w-2/5 text-left">
                              {el.typeRepairName}
                            </div>
                            <div className="w-1/5 text-right">{el.price}</div>
                          </div>
                        ))}
                      </div>
                      <div className="text-right p-3">
                        Всього :{' '}
                        {el.repair.reduce((acc, item) => acc + +item.price, 0)}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Car;
