// Конкретно я не знаю какие правила есть для валидации вин-кодов в вашей стране/регионе, но вот пример использования регулярных выражений для валидации формата вин-кода в США:

```javascript
function validateVin(vin) {
  const vinRegExp = /^[A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]{2}\d{6}$/;
  return vinRegExp.test(vin);
}

const validVin = '1GTN2TEH5EZ120985';
const invalidVin = '1GTN2TEH5EZ120985X';

console.log(validateVin(validVin)); // true
console.log(validateVin(invalidVin)); // false
```

// Эта функция принимает строку вин-кода и возвращает `true`, если она соответствует формату вин-кода США (17 символов, содержащих только латинские буквы A-Z, цифры 0-9, за исключением букв I, O и Q, и символ X, который может быть только в конце, а также соответствующая проверка контрольной суммы). Если строка не соответствует формату вин-кода, функция возвращает `false`.

```javascript
function validateYear(year) {
    const currentYear = new Date().getFullYear();
    if (year >= 1900 && year <= currentYear) {
      return true;
    } else {
      return false;
    }
  }
  ```
  Конечно! Вот пример функции на JavaScript, которая фильтрует список выбора (`select`) по введенному тексту в поле ввода (`input`) и скрывает ненужные элементы списка:

```javascript
function filterList() {
  // Получить ссылки на элементы списка и поля ввода
  var input = document.getElementById('filter-input');
  var selectList = document.getElementById('select-list');
  var options = selectList.getElementsByTagName('option');
  
  // Получить введенный текст
  var filterText = input.value.toLowerCase();
  
  // Пройтись по каждому элементу списка и скрыть ненужные
  for (var i = 0; i < options.length; i++) {
    var optionText = options[i].text.toLowerCase();
    if (optionText.indexOf(filterText) !== -1) {
      options[i].style.display = '';
    } else {
      options[i].style.display = 'none';
    }
  }
}
```

Вызов этой функции будет происходить по событию `keyup` на поле ввода. Для этого добавляется атрибут `onkeyup` к полю ввода, как показано ниже:

```html
<input type="text" id="filter-input" onkeyup="filterList();" />
```

Чтобы применить эту функцию к списку выбора, надо указать атрибут `id` для списка на странице:

```html
<select id="select-list">
  <option value="1">Вариант 1</option>
  <option value="2">Вариант 2</option>
  <option value="3">Вариант 3</option>
  <option value="4">Вариант 4</option>
  <option value="5">Вариант 5</option>
</select>
```