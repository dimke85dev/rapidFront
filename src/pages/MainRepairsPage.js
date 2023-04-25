import React, { Fragment, useEffect } from 'react';
import {
  createMainRepair,
  getAllMainRepairs,
} from '../store/features/carRepair/mainRepairSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/UI/Loader';
import { Link, useParams } from 'react-router-dom';

const MainRepairsPage = () => {
  // const param = useParams();
  const dispatch = useDispatch();
  const { mainRepair, loading } = useSelector((state) => state.mainrepair);

  const AddRepairHandler = () => {
    const data = {
      nameMainRepair: 'РЕМОНТ ДВИГУНА',
      typeRepair: [
        { nametype: 'Заміна масла в двигуні' },
        { nametype: 'Заміна масляного фільтра' },
      ],
    };
    // console.log(data);
    dispatch(createMainRepair(data));
  };

  useEffect(() => {
    dispatch(getAllMainRepairs());
  }, [dispatch]);

  // console.log(mainRepair);
  if (!mainRepair.length) return;

  return (
    <Fragment>
      <div className="flex">
        {loading && <Loader />}
        <div className="mobile-form flex flex-col w-2/3 px-6 pb-4 rounded-xl rounded-r-none bg-white mx-auto shadow-lg shadow-gray-700/70">
          <label className="mx-auto text-xl mb-3">Види послуг </label>

          <span className="grid grid-cols-1 grid-rows-4 gap-1  ">
            {mainRepair.map((el) => (
              <Link
                className=" border-solid border-2 border-gray-600 rounded-xl mb-2 cursor-pointer"
                key={el._id}
                to={`/mainrepair/${el._id}`}
              >
                <span value={el._id}>{el.nameMainRepair}</span>
              </Link>
            ))}
          </span>
        </div>
        <div className="w-1/3  flex flex-col p-4 gap-4 mx-auto bg-gray-300 py-4 rounded-r-xl">
          <button
            onClick={AddRepairHandler}
            className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
          >
            Додати
          </button>
          <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
            Редагувати
          </button>
          <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
            Видалити
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default MainRepairsPage;
