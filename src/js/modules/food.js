import { NumUtils } from "../utils/num-utils.js"; // импорт модуля NumUtils из файла num-utils.js

export class Food { // объявление класса Food
    foodRadius = null; // инициализация переменной foodRadius
    foodPosition = { // инициализация объекта foodPosition с координатами x и y
        x: 1,
        y: 1
    };
    context = null; // инициализация переменной context
    positionsSize = 20; // инициализация переменной positionsSize
    positionsCount = 30; // инициализация переменной positionsCount

    constructor(context, positionsCount, positionsSize) { // объявление конструктора класса Food с параметрами context, positionsCount и positionsSize
        this.context = context; // присвоение значению context переменной класса this.context
        this.positionsCount = positionsCount; // присвоение значению positionsCount переменной класса this.positionsCount
        this.positionsSize = positionsSize; // присвоение значению positionsSize переменной класса this.positionsSize

        this.foodRadius = this.positionsSize / 2; // вычисление радиуса еды как половины размера позиции
    }

    setNewFoodPosition() { // объявление метода setNewFoodPosition
        this.foodPosition = { // обновление позиции еды на случайные координаты в пределах игрового поля
            x: NumUtils.getRandomInt(1, this.positionsCount), // задание случайной координаты x
            y: NumUtils.getRandomInt(1, this.positionsCount), // задание случайной координаты y
        }
    }

    showFood() { // объявление метода showFood
        this.context.fillStyle = 'white'; // установка цвета заливки
        this.context.beginPath(); // начало пути отрисовки
        this.context.arc(this.foodPosition.x * this.positionsSize - this.foodRadius, // отрисовка круга с центром в заданных координатах
            this.foodPosition.y * this.positionsSize - this.foodRadius, this.foodRadius, 0, 2 * Math.PI); 
        this.context.fill(); // заливка круга цветом
    }
}
