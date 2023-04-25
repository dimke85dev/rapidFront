import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getMainRepairById } from '../store/features/carRepair/mainRepairSlice';
import Loader from '../components/UI/Loader';

const MainRepairPage = () => {
  const param = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMainRepairById(param.id));
  }, [dispatch, param.id]);

  const { loading, mainRepair } = useSelector((state) => state.mainrepair);
  //   console.log(mainRepair);

  return (
    <div className="w-2/3 bg-gray-300 mx-auto flex flex-col text-blue-700">
      {loading ? <Loader /> : <div>{mainRepair.nameMainRepair}</div>}
    </div>
  );
};

export default MainRepairPage;
