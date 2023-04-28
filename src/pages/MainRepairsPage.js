import React, { Fragment, useEffect } from 'react';
import {
  createMainRepair,
  getAllMainRepairs,
} from '../store/features/carRepair/mainRepairSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/UI/Loader';
import { Link, useParams } from 'react-router-dom';

const MainRepairsPage = () => {
  const param = useParams();

  const dispatch = useDispatch();
  const { mainRepair, loading } = useSelector((state) => state.mainrepair);

  useEffect(() => {
    dispatch(getAllMainRepairs());
  }, [dispatch]);

  if (!mainRepair.length) return;
  // console.log(mainRepair);

  const AddRepairHandler = () => {
    const data = {
      nameMainRepair: 'Шось',
      typeRepair: [
        { nametype: 'Заміна масла в двигуні' },
        { nametype: 'Заміна масляного фільтра' },
      ],
    };
    // console.log(data);
    // dispatch(getAllMainRepairs());
    dispatch(createMainRepair(data));
    // dispatch(getAllMainRepairs());
  };

  // console.log(mainRepair);
  // if (!mainRepair.length) return;

  return (
    <Fragment>
      <div className="mobile-form flex w-2/3 mx-auto">
        {loading && <Loader />}
        <div className="mobile-form flex flex-col w-3/4 px-6 pb-4 rounded-xl rounded-r-none bg-white mx-auto shadow-lg shadow-gray-700/70">
          <label className="mx-auto text-xl mb-3">Види послуг </label>

          <span className="grid grid-cols-1 grid-rows-4 gap-1  ">
            {mainRepair.map((el) => (
              <Link
                className=" border-solid border-2 border-gray-600 rounded-xl mb-2 cursor-pointer"
                key={el._id}
                to={`/mainrepair/${el._id}`}
              >
                {el.nameMainRepair}
              </Link>
            ))}
          </span>
        </div>
        <div className="w-1/4  flex flex-col p-4 gap-4 mx-auto bg-gray-300 py-4 rounded-r-xl  shadow-lg shadow-gray-700/70">
          <button
            onClick={AddRepairHandler}
            className="w-[60px] mx-auto flex justify-center items-center bg-gray-600 text-xs text-white hover:bg-blue-300 hover:shadow-lg hover:shadow-black-700/70 hover:text-black rounded-xl py-2 px-4"
          >
            Додати
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default MainRepairsPage;
