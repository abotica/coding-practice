const snakeHead = document.getElementById('head');
const food = document.getElementById('food');

const snake = {
    size: 1, // size of the snake
    rowIndex: 1, // horizontal index of the grid
    columnIndex: 1, // vertical index of the grid
}

// Get the snake from the local storage
const getSnake = () => {
    return JSON.parse(localStorage.getItem('snake'));
}

// Set the snake to the local storage
const setSnake = (snake) => {
    snake = normalizeSnakePosition(snake);
    localStorage.setItem('snake', JSON.stringify(snake));
}

// Initialize the snake
const initLocalStorage = () => {
    if (localStorage.getItem('snake') === null) {
        localStorage.setItem('snake', JSON.stringify(snake));
    }
}

// Clear the snake from the local storage
const clearSnake = () => {
    localStorage.removeItem('snake');
}

// Render the snake to the grid
const renderSnake = () => {
    const snake = getSnake();
    snakeHead.style.gridRowStart = snake.rowIndex;
    snakeHead.style.gridRowEnd = snake.rowIndex + 1;
    snakeHead.style.gridColumnStart = snake.columnIndex;
    snakeHead.style.gridColumnEnd = snake.columnIndex + 1;
}

// Normalize snake position
const normalizeSnakePosition = (snake) => {
    if(snake.rowIndex < 1) {
        snake.rowIndex = 32;
    }
    else if(snake.rowIndex > 32) {
        snake.rowIndex = 1;
    }

    if(snake.columnIndex < 1) {
        snake.columnIndex = 32;
    }
    else if(snake.columnIndex > 32) {
        snake.columnIndex = 1;
    }
    return snake;
}

// Listen to the keydown event
const listenToKeyDown = () => {
    document.addEventListener('keydown', (e) => {
        const snake = getSnake();
        switch (e.key) {
            case 'w':
            snake.rowIndex--;
            break;
            case 's':
            snake.rowIndex++;
            break;
            case 'a':
            snake.columnIndex--;
            break;
            case 'd':
            snake.columnIndex++;
            break;
        }
        setSnake(snake);
        renderSnake();
    });
}

// // Spawn the food
// const spawnFood = () => {
//     const food = {
//         rowIndex: Math.floor(Math.random() * 32) + 1,
//         columnIndex: Math.floor(Math.random() * 32) + 1,
//     }
//     localStorage.setItem('food', JSON.stringify(food));
// }

// // Render the food
// const renderFood = () => {
//     const food = JSON.parse(localStorage.getItem('food'));
//     food.style.gridRowStart = food.rowIndex;
//     food.style.gridRowEnd = food.rowIndex + 1;
//     food.style.gridColumnStart = food.columnIndex;
//     food.style.gridColumnEnd = food.columnIndex + 1;
// }

// Initialize the game
const init = () => {
    initLocalStorage();
    renderSnake();
    listenToKeyDown();
}

init();