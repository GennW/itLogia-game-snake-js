
export class Snake {
    currentDirection = 'right'; // текущее направление движения змейки
    snake = [ // начальная позиция змейки
        { x: 10, y: 20 }
    ];
    context = null; // контекст рисования на холсте
    positionsSize = null; // размер позиций на холсте
    positionsCount = null; // количество позиций на холсте

    constructor(context, positionsCount, positionsSize) { // конструктор класса
        this.context = context;
        this.positionsCount = positionsCount;
        this.positionsSize = positionsSize;

        this.addKeyboardHandler(); // добавление обработчика событий клавиатуры
    }

    addKeyboardHandler() { // метод для добавления обработчика событий клавиатуры
        document.addEventListener('keydown', (e) => { // добавление слушателя событий на нажатие клавиши
            if (e.key === 'ArrowLeft' && this.currentDirection !== 'right') { // обработка нажатия клавиш
                this.currentDirection = 'left'; // изменение направления налево, если текущее направление не "вправо"
            } else if (e.key === 'ArrowRight' && this.currentDirection !== 'left') {
                this.currentDirection = 'right'; // изменение направления направо, если текущее направление не "влево"
            } else if (e.key === 'ArrowUp' && this.currentDirection !== 'down') {
                this.currentDirection = 'up'; // изменение направления вверх, если текущее направление не "вниз"
            } else if (e.key === 'ArrowDown' && this.currentDirection !== 'up') {
                this.currentDirection = 'down'; // изменение направления вниз, если текущее направление не "вверх"
            }
        })
    }

    // Метод для отображения змейки и обработки взаимодействия с "едой" и столкновениями
    showSnake(foodPosition) {//29:30 видео объяснение
        let result = { // Объект для хранения результата
            gotFood: false, // Флаг для указания, была ли съедена "еда"
            collision: false // Флаг для обозначения столкновения змейки с собой
        };

        // Отображение каждого сегмента змейки на холсте
        for (let i = 0; i < this.snake.length; i++) {
            this.context.fillStyle = 'black'; // Установка цвета заливки
            this.context.beginPath();
            this.context.fillRect(
                this.snake[i].x * this.positionsSize - this.positionsSize, // Рисование прямоугольника для каждого сегмента змейки
                this.snake[i].y * this.positionsSize - this.positionsSize, // 28:05 видео объяснение
                this.positionsSize,
                this.positionsSize
            );
        }

        let newHeadPosition = { // Новая позиция головы змейки
            x: this.snake[0].x,
            y: this.snake[0].y,
        };

        // Проверка попадания на "еду" и удаление последнего сегмента при передвижении
        if (foodPosition && foodPosition.x === newHeadPosition.x && foodPosition.y === newHeadPosition.y) {
            result.gotFood = true; // Обработка съедания "еды"
        } else {
            this.snake.pop(); // Удаление последнего сегмента змейки при передвижении
        }

        // Определение новой позиции головы в зависимости от текущего направления
        if (this.currentDirection === 'left') {
            // Обработка выхода за границы поля и появление с противоположной стороны
            newHeadPosition.x === 1 ? newHeadPosition.x = this.positionsCount : newHeadPosition.x -= 1;
        } else if (this.currentDirection === 'right') {
            newHeadPosition.x === this.positionsCount ? newHeadPosition.x = 1 : newHeadPosition.x += 1;
        } else if (this.currentDirection === 'up') {
            newHeadPosition.y === 1 ? newHeadPosition.y = this.positionsCount : newHeadPosition.y -= 1;
        } else if (this.currentDirection === 'down') {
            newHeadPosition.y === this.positionsCount ? newHeadPosition.y = 1 : newHeadPosition.y += 1;
        }

        // Проверка новой позиции головы на столкновение
        if (!this.checkNewHeadPositionForCollision(newHeadPosition)) {
            this.snake.unshift(newHeadPosition); // Добавление новой позиции головы
        } else {
            result.collision = true; // Обработка столкновения
        }

        return result; // Возвращение результата
    }
    // Метод для проверки столкновения новой позиции головы с сегментами змейки
    checkNewHeadPositionForCollision(newHeadPosition) {
        for (let i = 0; i < this.snake.length; i++) {
            if (newHeadPosition.x === this.snake[i].x && newHeadPosition.y === this.snake[i].y) { // Проверка совпадения координат
                return true; // Если хотя бы одна точка совпадает, возвращает true
            }
        }
        return false; // Если точки не совпадают, возвращает false
    }
}
