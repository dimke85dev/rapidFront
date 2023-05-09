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
  const { mainRepair } = useSelector((state) => state.mainrepair);
  const [mainRepairValue, setMainRepairValue] = useState('');
  const [typeRepairValue, setTypeRepairValue] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [repairs, setRepairs] = useState([]);
  const [status, setStatus] = useState(false);
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
    setMainRepairValue(e.target.value);
  };

  const selectTypeRepairHandler = (e) => {
    setTypeRepairValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    repairs.push({ mainRepairValue, typeRepairValue, priceValue });
    setRepairs(repairs);
    setStatus(!status);
    // console.log(repairs);
  };

  // useEffect(() => {
  //   setRepairs(repairs);
  // }, [setRepairs, repairs]);

  if (!typeAllRepair) return <Loader></Loader>;
  if (!typeAllRepair.length) return <Loader></Loader>;

  if (!typeAllRepair) return;
  if (!mainRepair) return;
  if (!car) return;
  return (
    <div className="flex flex-col ">
      <div className="mobile-form  w-2/3 bg-gray-300 flex gap-5 mx-auto -xl p-5 rounded-xl rounded-b-none shadow-lg shadow-green-800/50 ">
        <div className="flex flex-col mx-auto">
          <label>Авто</label>
          <span className="text-blue-600">{car[0].name}</span>
        </div>
        <div className="flex flex-col mx-auto">
          <label>Рік </label>
          <span className="text-blue-600">{car[0].year}</span>
        </div>
        <div className="flex flex-col mx-auto">
          <label>Vin </label>
          <span className="text-blue-500">{car[0].vinCode}</span>
        </div>
      </div>
      <div className="mobile-form  w-2/3  px-6 mx-auto  pb-5 bg-white rounded-2xl rounded-t-none shadow-lg shadow-gray-800/80">
        <div>
          <h2 className="form-h2">Оберіть вид ремонту</h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-2">
            <div className="flex px-2 gap-2">
              <select
                onChange={selectMainRepairHandler}
                className="w-2/5 mx-auto border-input "
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
                className="w-2/5 mx-auto border-input"
                onChange={selectTypeRepairHandler}
              >
                {mainRepairFind.map((el) =>
                  el.typeRepair.map((type) => (
                    <option key={type} className="form-option">
                      {
                        typeAllRepair.find((el) => el._id === type)
                          .nameTypeRepair
                      }
                    </option>
                  ))
                )}
              </select>
              <input
                onChange={(e) => setPriceValue(e.target.value)}
                className="w-1/5 mx-auto border-input"
                placeholder="0.00"
              />
            </div>
            <button
              onClick={submitHandler}
              type="submit"
              className="border-input mx-auto cursor-pointer hover:bg-green-400"
            >
              Додати
            </button>
          </form>
          {repairs.map((el) => (
            <div
              key={new Date()}
              className="flex justify-between px-5 border-input mt-3"
            >
              <p className="w-2/5 text-left">{el.mainRepairValue}</p>
              <p className="w-2/5 text-left">{el.typeRepairValue}</p>
              <p className="w-1/5 text-right">{el.priceValue}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddCarRepair;
