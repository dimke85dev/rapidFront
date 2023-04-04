//Код компонента React с выпадающим списком внутри выпадающего списка выглядит следующим образом:

import React, { useState } from 'react';
import { useEffect } from 'react';
import { dataCar } from '../../cars';

const SelectToSelect = (props) => {
  const firstDropdownOptions = [];
  const secondDropdownOptions = [];
  const [selectedCarOption, setSelectedCarOption] = useState('');
  const [selectedModelOption, setSelectedModelOption] = useState('');
  const carLable = !selectedCarOption ? 'Оберіть авто' : selectedCarOption;

  dataCar.map((car) =>
    firstDropdownOptions.push({ label: car.id, value: car.name })
  );

  const selectCarHandler = (event) => {
    setSelectedModelOption('');
    setSelectedCarOption(event.target.value);
  };

  const modelsArr = dataCar.filter((el) => el.name === selectedCarOption);
  modelsArr[0]?.models.map((car) =>
    secondDropdownOptions.push({ label: car.name, value: car.name })
  );
  //
  const selectModelHandler = (event) => {
    if (!event.target.value) {
      return;
    }
    secondDropdownOptions.length === 1
      ? setSelectedModelOption(secondDropdownOptions[0].value)
      : setSelectedModelOption(event.target.value);
    props.carLable(carLable, event.target.value); //Отправка даных из компонента в родительскую форму
  };
  //напиши функцию валидации вин кода автомобиля

  return (
    <div>
      <p>
        {selectedModelOption ? `${carLable} ${selectedModelOption}` : carLable}
      </p>
      <select defaultValue="" onChange={selectCarHandler}>
        <option value="" disabled>
          Оберіть Марку
        </option>
        {firstDropdownOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedCarOption && (
        <select
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
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SelectToSelect;
