import { Game } from "./modules/game.js"; // импорт класса Game из файла game.js

class App { // объявление класса App
    settings = { // инициализация объекта settings с параметрами positionsCount и positionsSize
        positionsCount: 30, // количество позиций по умолчанию
        positionsSize: 20 // размер позиции по умолчанию
    }

    constructor() { // объявление конструктора класса App
        const canvas = document.createElement('canvas'); // создание элемента canvas
        canvas.setAttribute('width', (this.settings.positionsCount * this.settings.positionsSize).toString()); // установка ширины canvas на основе параметров positionsCount и positionsSize
        canvas.setAttribute('height', (this.settings.positionsCount * this.settings.positionsSize).toString()); // установка высоты canvas на основе параметров positionsCount и positionsSize
        document.getElementById('container').appendChild(canvas); // добавление canvas в элемент с id "container" на странице

        const context = canvas.getContext('2d'); // получение 2D контекста canvas

        new Game(context, this.settings); // создание экземпляра класса Game и передача контекста и настроек
    }
}

(new App()); // создание экземпляра класса App при загрузке скрипта
