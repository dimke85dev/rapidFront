import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/use-input';
import SelectToSelect from '../UI/SelectToSelect';

import './Form.css';
import { carOut, createCar } from '../../store/features/car/carSlice';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCar = (props) => {
  const [carName, setCarName] = useState('');
  const { status, messageType } = useSelector((state) => state.car);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (status) {
      toast(status, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: messageType === 'ok' ? 'success' : 'error',
      });
    }
    // console.log(status + 'addcar');
    messageType === 'ok' && navigate('/takeacar');
    dispatch(carOut());
  }, [status, messageType]);

  const selectToSelectFunction = (carLable, modalLable) => {
    setCarName(carLable + ' ' + modalLable);
    // console.log(carLable, modalLable);
  };
  // console.log(carName);

  // const {
  //   value: enteredName,
  //   hasError: hasNameInputError,
  //   isValid: isEnteredNameValid,
  //   inputChangeHandler: nameInputChangeHandler,
  //   inputLostFocusHandler: nameInputLostFocusHandler,
  //   resetValues: resetNameInputValues,
  // } = useInput((val) => val.trim() !== '');

  const {
    value: enteredVinCode,
    hasError: hasVinCodeInputError,
    isValid: isEnteredVinCodeValid,
    inputChangeHandler: vinCodeInputChangeHandler,
    inputLostFocusHandler: vinCodeInputLostFocusHandler,
    resetValues: resetVinCodeInputValues,
  } = useInput(function validateVin(vin) {
    const vinRegExp = /^[A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]{2}\d{6}$/;
    return vinRegExp.test(vin.toUpperCase());
  });

  const {
    value: enteredageCar,
    hasError: hasageCarInputError,
    isValid: isEnteredageCarValid,
    inputChangeHandler: ageCarInputChangeHandler,
    inputLostFocusHandler: ageCarInputLostFocusHandler,
    resetValues: resetageCarInputValues,
  } = useInput(function validateYear(year) {
    const currentYear = new Date().getFullYear();
    if (year >= 1900 && year <= currentYear) {
      return true;
    } else {
      return false;
    }
  });

  let isFormValid = false;

  if (isEnteredVinCodeValid && isEnteredageCarValid) {
    isFormValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!carName) {
      toast('Треба обрати назву авто');
      return;
    }
    if (!isFormValid) {
      return;
    }
    try {
      dispatch(
        createCar({
          name: carName,
          vinCode: enteredVinCode,
          year: enteredageCar,
        })
      );
      dispatch(carOut());
      // messageType === 'ok' && navigate('/takeacar');
    } catch (error) {
      toast(error, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'error',
      });
    }
    // resetNameInputValues();
    resetVinCodeInputValues();
    resetageCarInputValues();
  };

  // const nameInputClasses = hasNameInputError ? 'invalid' : '';

  const vinCodeInputClasses = hasVinCodeInputError ? 'invalid' : '';

  const ageCarInputClasses = hasageCarInputError ? 'invalid' : '';

  return (
    <form
      className={'control-group w-2/3 mx-auto mobile-form'}
      onSubmit={formSubmitHandler}
    >
      <div className="form-control ">
        <SelectToSelect carLable={selectToSelectFunction} />
        <div className={`${ageCarInputClasses} flex flex-col`}>
          <label className="form-label" htmlFor="ageCar">
            Введіть рік авто
          </label>
          <input
            className="form-input border-input "
            type="text"
            id="ageCar"
            value={enteredageCar}
            onChange={ageCarInputChangeHandler}
            onBlur={ageCarInputLostFocusHandler}
          ></input>
          {hasageCarInputError && (
            <p className="error-text">Поле повинно бути заповнене</p>
          )}
        </div>

        <div className={`${vinCodeInputClasses} flex flex-col`}>
          <label className="form-label" htmlFor="vinCode">
            Введіть "VinCode"
          </label>
          <input
            className="form-input border-input"
            type="vinCode"
            id="vinCode"
            value={enteredVinCode}
            onChange={vinCodeInputChangeHandler}
            onBlur={vinCodeInputLostFocusHandler}
          />
          {hasVinCodeInputError && (
            <p className="error-text">Поле VinCode повинно бути заповнене</p>
          )}
        </div>
        <div className="form-actions">
          <button
            type="submit"
            onClick={formSubmitHandler}
            className={isFormValid ? 'btn-submit' : 'btn-invalid'}
            disabled={!isFormValid && true}
          >
            Зберегти
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCar;
