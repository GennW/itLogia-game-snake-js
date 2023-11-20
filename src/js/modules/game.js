

import { Food } from "./food.js";
import { Snake } from "./snake.js";

export class Game {
    // Объявление свойств класса
    snake = null; // Свойство для экземпляра класса змеи
    context = null; // Свойство для контекста рисования на холсте
    positionsSize = null; // Свойство для размера позиций
    positionsCount = null; // Свойство для количества позиций
    score = 0; // Свойство для количества очков
    scoreElement = null; // Свойство для элемента отображения количества очков
    interval = null; // Свойство для интервала обновления игры

    constructor(context, settings) {
        this.context = context; // Присвоение контекста рисования из аргумента
        this.positionsCount = settings.positionsCount; // Присвоение количества позиций из настроек
        this.positionsSize = settings.positionsSize; // Присвоение размера позиций из настроек
        this.scoreElement = document.getElementById('score'); // Получение элемента отображения очков

        document.getElementById('start').onclick = () => { // Назначение обработчика события на кнопку "Начать!"
            this.startGame(); // Вызов метода начала игры
        }
    }

    startGame() {
        // Остановка предыдущего интервала, если он существует
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.food = new Food(this.context, this.positionsCount, this.positionsSize); // Создание экземпляра класса еды
        this.snake = new Snake(this.context, this.positionsCount, this.positionsSize); // Создание экземпляра класса змеи
        this.food.setNewFoodPosition(); // Установка нового положения еды
        this.interval = setInterval(this.gameProcess.bind(this), 100); // Запуск интервала игрового процесса
    }

    // Метод игрового процесса
    gameProcess() {
        this.context.clearRect(0, 0, this.positionsCount * this.positionsSize, this.positionsCount * this.positionsSize); // Очистка области рисования
        this.showGrid(); // Отображение игровой сетки
        this.food.showFood(); // Отображение еды
        let result = this.snake.showSnake(this.food.foodPosition); // Передача положения еды на отображение змеи
        if (result) {
            if (result.collision) { // Если произошло столкновение
                this.endGame(); // Завершение игры
            } else if (result.gotFood) { // Если змея съела еду
                this.score += 1; // Увеличение счета
                this.scoreElement.innerText = this.score; // Обновление отображения счета
                this.food.setNewFoodPosition(); // Установка нового положения еды
            }
        }
    }

    // Метод завершения игры
    endGame() {
        clearInterval(this.interval); // Остановка интервала
        this.context.fillStyle = 'red'; // Задание цвета кисти
        this.context.font = 'bold 48px Arial'; // Задание стиля шрифта
        this.context.textAlign = 'center'; // Задание выравнивания текста
        this.context.fillText('Вы набрали: ' + this.score + ' очков!', // Вывод сообщения о результате игры
            (this.positionsCount * this.positionsSize) / 2, (this.positionsCount * this.positionsSize) / 2);
    }

    // Метод отображения игровой сетки
    showGrid() {
        const size = this.positionsCount * this.positionsSize; // Вычисление общего размера сетки
    
        // Отрисовка вертикальных линий сетки
        for (let x = 0; x <= size; x += this.positionsSize) {
            this.context.moveTo(0.5 + x + this.positionsSize, 0); // Перемещение в начальную точку каждой вертикальной линии
            this.context.lineTo(0.5 + x + this.positionsSize, size + this.positionsSize); // Рисование вертикальной линии
        }
    
        // Отрисовка горизонтальных линий сетки
        for (let x = 0; x <= size; x += this.positionsSize) {
            this.context.moveTo(0, 0.5 + x + this.positionsSize); // Перемещение в начальную точку каждой горизонтальной линии
            this.context.lineTo(size + this.positionsSize, 0.5 + x + this.positionsSize); // Рисование горизонтальной линии
        }
    
        this.context.strokeStyle = "black"; // Установка цвета линий
        this.context.stroke(); // Отрисовка линий
    }
    
}