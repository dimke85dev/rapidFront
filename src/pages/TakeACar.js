import React, { useEffect, useState } from 'react';
import { getCar } from '../store/features/car/carSlice';
import SomeForm from '../components/addCar/AddCar';
import useInput from '../hooks/use-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const TakeACar = () => {
  const [addCarFormVisible, setAddCarFormVisible] = useState(false);
  const [isVincode, setIsVincode] = useState(false);
  const [isVincodeVisible, setIsVincodeVisible] = useState(false);
  const { status, messageType, statusAnswer, car } = useSelector(
    (state) => state.car
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();
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

  // function validateVin(vin) {
  //   const vinRegExp = /^[A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]{2}\d{6}$/;
  //   return vinRegExp.test(vin.toUpperCase());
  // }

  const vinCodeInputClasses = hasVinCodeInputError ? 'invalid' : '';

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      // console.log(enteredVinCode);
      // if (!enteredVinCode) return;
      dispatch(getCar({ vinCode: enteredVinCode }));

      // if (car) navigate('/addcarrepair');
    } catch (error) {}
  };
  const addCarFormHandler = () => {
    setAddCarFormVisible(!addCarFormVisible);
  };

  useEffect(() => {
    if (status) {
      toast(status, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: messageType === 'ok' ? 'success' : 'error',
      });
    }
  }, [status, messageType]);

  return (
    <React.Fragment>
      {addCarFormVisible && <SomeForm></SomeForm>}
      {!addCarFormVisible && (
        <div className="">
          <form
            method="POST"
            encType="multipart/form-data"
            className={'form-control'}
            onSubmit={submitHandler}
          >
            <div className={`${vinCodeInputClasses}`}>
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
                <p className="error-text">
                  Поле VinCode повинно бути заповнене
                </p>
              )}
            </div>
            <div className="justify-center">
              <button
                onClick={submitHandler}
                // className="w-1/4 mb-2 mx-auto items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
                className={isEnteredVinCodeValid ? 'btn-submit' : 'btn-invalid'}
                disabled={!isEnteredVinCodeValid && true}
                type="submit"
              >
                Знайти
              </button>
              {status && (
                <button
                  onClick={addCarFormHandler}
                  // className="w-1/4 mb-2 mx-auto items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
                  className="mx-4 items-center bg-gray-600 text-xs text-white rounded-xl py-2 px-4"
                  // disabled={!isEnteredVinCodeValid && true}
                  type="submit"
                >
                  Додати
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default TakeACar;
