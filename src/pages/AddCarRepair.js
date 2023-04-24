import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import SelectToSelect from '../components/UI/SelectToSelect';

const AddCarRepair = () => {
  const navigate = useNavigate();
  const { car } = useSelector((state) => state.car);
  useEffect(() => {
    if (!car) {
      navigate('/takeacar');
    }
  }, [navigate, car]);

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
            className="form-select border-input"
            defaultValue=""
            // onChange={selectCarHandler}
          >
            <option className="form-option" value="" disabled>
              Тип ремонту
            </option>
            {/* {firstDropdownOptions.map((option) => (
              <option
                className="form-option"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))} */}
          </select>
          {/* {selectedCarOption && (
            <select
              className="form-select border-input"
              onClick={
                // secondDropdownOptions.length === 1 ? selectModelHandler : () => {}
                selectModelHandler
              }
              defaultValue=""
              // onChange={selectModelHandler}
            >
              <option value="" disabled>
                Оберіть модель
              </option>
              {secondDropdownOptions.map((option) => (
                <option
                  className="form-option"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default AddCarRepair;
