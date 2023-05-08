import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getAllMainRepairs } from '../store/features/carRepair/mainRepairSlice';
import { getAllTypeRepairsGet } from '../store/features/carRepair/typeRepairSlice';
import Loader from '../components/UI/Loader';

const AddCarRepair = () => {
  const navigate = useNavigate();
  const { car } = useSelector((state) => state.car);
  const [mainRepairFind, setMainRepairFind] = useState([]);
  const { loading, mainRepair } = useSelector((state) => state.mainrepair);
  const { typeAllRepair, loading: typeloading } = useSelector(
    (state) => state.typerepair
  );

  const dispatch = useDispatch();
  // console.log(mainRepairFind);
  useEffect(() => {
    if (!car) {
      navigate('/takeacar');
    }
    // dispatch(typeRepairClear());
    dispatch(getAllMainRepairs());
    dispatch(getAllTypeRepairsGet());
  }, [dispatch, navigate, car]);

  const selectMainRepairHandler = (e) => {
    setMainRepairFind(
      mainRepair.filter((el) => el.nameMainRepair === e.target.value)
    );
  };

  if (!typeAllRepair) return <Loader></Loader>;
  if (!typeAllRepair.length) return <Loader></Loader>;

  if (!typeAllRepair) return;
  if (!mainRepair) return;
  if (!car) return;

  return (
    <div className="flex flex-col">
      <div className="mobile-form  bg-gray-300 flex gap-5 mx-auto -xl p-5 rounded-xl rounded-b-none shadow-lg shadow-green-800/50 ">
        <div className="flex flex-col mx-auto">
          <label>Авто</label>
          <span className="text-pink-600">{car[0].name}</span>
        </div>
        <div className="flex flex-col mx-auto">
          <label>Рік </label>
          <span className="text-pink-600">{car[0].year}</span>
        </div>
        <div className="flex flex-col mx-auto">
          <label>Vin </label>
          <span className="text-yellow-600">{car[0].vinCode}</span>
        </div>
      </div>
      <div className="mobile-form w-2/3 mx-auto  h-screen bg-white rounded-2xl rounded-t-none shadow-lg shadow-gray-800/80">
        <div>
          <h2 className="form-h2">Оберіть вид ремонту</h2>
          <select
            onChange={selectMainRepairHandler}
            className="form-select border-input"
            // onChange={selectCarHandler}
          >
            {mainRepair.map((el) => (
              <option key={el._id} className="form-option">
                {el.nameMainRepair}
              </option>
            ))}
          </select>
          <select
            // onChange={''}
            className="form-select border-input"
            // onChange={selectCarHandler}
          >
            {mainRepairFind.map((el) =>
              el.typeRepair.map((type) => (
                <option key={type} className="form-option">
                  {typeAllRepair.find((el) => el._id === type).nameTypeRepair}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AddCarRepair;
