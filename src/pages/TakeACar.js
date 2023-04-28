import React, { useEffect, useState, useRef } from 'react';
import Quagga from 'quagga';
import { getCar, carOut } from '../store/features/car/carSlice';
import SomeForm from '../components/addCar/AddCar';
import useInput from '../hooks/use-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Loader from '../components/UI/Loader';
import QRCode from 'react-qr-code';
import { useQrEncode, useQrDecode } from 'react-qr-hooks';
import QrScanner from '../components/UI/QrScaner';

const TakeACar = () => {
  const encoded = useQrEncode(
    'uu1ksd0f538825408' /* object with options (if needed) */
  );

  const decoded = useQrDecode(encoded /* object with options (if needed) */);

  const [addCarFormVisible, setAddCarFormVisible] = useState(false);
  const { status, messageType, isloading, car } = useSelector(
    (state) => state.car
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

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
      // dispatch(carOut());
    } catch (error) {}
  };

  useEffect(() => {
    if (car?.length) navigate('/addcarrepair');
    // dispatch(carOut());
  }, [car, navigate, dispatch]);

  const addCarFormHandler = () => {
    dispatch(carOut());
    navigate('/addcar');
  };

  useEffect(() => {
    dispatch(carOut());
  }, [dispatch]);

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
    // console.log(status + 'takacar');
    // dispatch(carOut());
  }, [status]);

  console.log(encoded);
  return (
    <React.Fragment>
      {/* <QRCode
        size={256}
        style={{
          height: '200px',
          maxWidth: '100%',
          width: '200px',
          margin: '20px auto',
        }}
        value={'hello wo'}
        viewBox={`0 0 256 256`}
      /> */}
      {/* <img src={encoded} alt="My QR code" />
      <p>{decoded}</p> */}

      <QrScanner />
      <div />
      {isloading && <Loader />}
      {!addCarFormVisible && (
        <div className="mobile-form w-2/3 mx-auto">
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
                  type="button"
                  onClick={addCarFormHandler}
                  // className="w-1/4 mb-2 mx-auto items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
                  className="mx-4 items-center bg-gray-600 text-xs text-white rounded-xl py-2 px-4"
                  // disabled={!isEnteredVinCodeValid && true}
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
