import useInput from '../../hooks/use-input';
import SelectToSelect from '../UI/SelectToSelect';

import './Form.css';

const SomeForm = (props) => {
  const selectToSelectFunction = (carLable, modalLable) => {
    console.log(carLable, modalLable);
  };

  const {
    value: enteredName,
    hasError: hasNameInputError,
    isValid: isEnteredNameValid,
    inputChangeHandler: nameInputChangeHandler,
    inputLostFocusHandler: nameInputLostFocusHandler,
    resetValues: resetNameInputValues,
  } = useInput((val) => val.trim() !== '');

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

  if (isEnteredNameValid && isEnteredVinCodeValid && isEnteredageCarValid) {
    isFormValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    resetNameInputValues();

    resetVinCodeInputValues();

    resetageCarInputValues();
  };

  const nameInputClasses = hasNameInputError ? 'invalid' : '';

  const vinCodeInputClasses = hasVinCodeInputError ? 'invalid' : '';

  const ageCarInputClasses = hasageCarInputError ? 'invalid' : '';

  return (
    <form className={'control-group'} onSubmit={formSubmitHandler}>
      <div className="form-control">
        <SelectToSelect carLable={selectToSelectFunction} />
        <div className={`${ageCarInputClasses}`}>
          <label htmlFor="ageCar">Введіть рік авто</label>
          <input
            className="border-input"
            type="text"
            id="ageCar"
            value={enteredageCar}
            onChange={ageCarInputChangeHandler}
            onBlur={ageCarInputLostFocusHandler}
          />
          {hasageCarInputError && (
            <p className="error-text">Поле повинно бути заповнене</p>
          )}
        </div>
        <div className={`${nameInputClasses}`}>
          <label htmlFor="name">Ім'я</label>
          <input
            className="border-input"
            type="text"
            id="name"
            value={enteredName}
            onChange={nameInputChangeHandler}
            onBlur={nameInputLostFocusHandler}
          />
          {hasNameInputError && (
            <p className="error-text">Поле ім'я повинно бути заповнено</p>
          )}
        </div>

        <div className={`${vinCodeInputClasses}`}>
          <label htmlFor="vinCode">Введіть "VinCode"</label>
          <input
            className="border-input"
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
            className={isFormValid ? 'btn-submit' : 'btn-invalid'}
            disabled={!isFormValid && true}
          >
            Отправить
          </button>
        </div>
      </div>
    </form>
  );
};

export default SomeForm;
