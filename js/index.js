// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

const ul = document.getElementById("ul");

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  for (let i = 0; i < fruits.length; i++) {
    const li = document.createElement("li");
    if (fruits[i].color === "фиолетовый") {
      li.classList = "fruit__item fruit_violet"
    } else if (fruits[i].color === "зеленый") {
      li.classList = "fruit__item fruit_green"
    } else if (fruits[i].color === "розово-красный") {
      li.classList = "fruit__item fruit_carmazin"
    } else if (fruits[i].color === "желтый") {
      li.classList = "fruit__item fruit_yellow"
    } else if (fruits[i].color === "светло-коричневый") {
      li.classList = "fruit__item fruit_lightbrown"
    } else {li.classList = "fruit__item fruit_gray"}
    li.innerHTML = `<div class="fruit__info"><div>index: ${i}</div><div>kind: ${fruits[i].kind}</div><div>color: ${fruits[i].color}</div><div>weight (кг): ${fruits[i].weight}</div></div>`;
    ul.insertAdjacentElement('beforeend', li);
  }
};

display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1));
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  const removed = document.querySelectorAll("li");
  removed.forEach(el => ul.removeChild(el));
  while (fruits.length > 0) {
    const index = getRandomInt(1, fruits.length)
    result.push(fruits[index]);
    fruits.splice(index, 1);
  }
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  const check = ul.innerHTML;
  shuffleFruits();
  display();
  if (ul.innerHTML === check) {
    alert("Порядок не изменился");
  };
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let result = [];
  let arr = [];
  
  fruits.forEach(el => {
    arr.push(el.weight);
    return arr;
  });
  
  const min = document.getElementById("min").value ? document.getElementById("min").value : 0;
  const max = document.getElementById("max").value ? document.getElementById("max").value : Math.max.apply(Math, arr);
  fruits.filter((item) => {
    if (item.weight >= min && item.weight <= max ) {
      result.push(item);
    }
    fruits = result;
  });
};

filterButton.addEventListener('click', () => {
  const removed = document.querySelectorAll("li");
  removed.forEach(el => ul.removeChild(el));
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  const priority = ['желтый', 'зеленый', 'розово-красный', 'светло-коричневый', 'фиолетовый'];
  const priority1 = priority.indexOf(a.color);
  const priority2 = priority.indexOf(b.color);
  return priority1 > priority2;
};


// функция для увеличения времени выполнения сортировки (тест)
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const sortAPI = {
  bubbleSort(arr, comparation) {
    const n = arr.length;
    for (let i = 0; i < n-1; i++) { 
      for (let j = 0; j < n-1-i; j++) { 
        if (comparation(arr[j], arr[j+1])) { 
          let temp = arr[j+1]; 
          arr[j+1] = arr[j]; 
          arr[j] = temp; 
        }
      }
    }
    sleep(41);           
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  sortKind === 'bubbleSort' ? sortKind = 'quickSort' : sortKind = 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  const removed = document.querySelectorAll("li");
  removed.forEach(el => ul.removeChild(el));
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  sortTimeLabel.textContent = sortTime;
  display();
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  const removed = document.querySelectorAll("li");
  removed.forEach(el => ul.removeChild(el));
  if (document.getElementById("kind").value && document.getElementById("color").value && document.getElementById("weight").value && parseInt(document.getElementById("weight").value)) {
    fruits.push({'kind': document.getElementById("kind").value, "color": document.getElementById("color").value, "weight": parseInt(document.getElementById("weight").value)});
  } else {
    alert("Заполните все поля!");
  }
  display();
});
