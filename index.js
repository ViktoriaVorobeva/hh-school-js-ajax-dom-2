const startBox = document.querySelector('.start-box');
const gridContainer = document.querySelector('.grid-container');
const freeContainer = document.querySelector('.free-container');

// генерация изображения
const generateImage = () => {
    return Math.floor(Math.random() * 10) + 1;
}

// проверка находится ли элемент в контейнере
const isElementinContainer = (event, container) => {
    const {
        clientX,
        clientY
    } = event;
    const {
        top,
        left,
        right,
        bottom
    } = container.getBoundingClientRect();
    return clientX < right && clientX > left && clientY > top && clientY < bottom
}

// создание нового элемента
const generateElement = () => {
    const newStartElement = document.createElement('img');
    newStartElement.classList.add('start-box__element');
    newStartElement.setAttribute('src', `./src/assets/images/${generateImage()}.png`);
    startBox.append(newStartElement);
    return newStartElement;
}

//текущие координаты при перетаскивании
const moveElement = (event, element) => {
    element.style.left = `${event.clientX - element.width/2}px`;
    element.style.top = `${event.clientY - element.height/2}px`;
}

//обработка drop-события
const pointerUpHandler = (event, element) => {
    if (isElementinContainer(event, gridContainer)) {
        element.style.position = 'static';
        gridContainer.append(element);
    } else if (isElementinContainer(event, freeContainer)) {
        element.style.left = `${event.clientX - freeContainer.offsetLeft - element.width/2}px`;
        element.style.top = `${event.clientY - freeContainer.offsetTop - element.height/2}px`;
        freeContainer.append(element);
    } else {
        element.remove();
    }
    document.onpointermove = null;
    document.onpointerup = null;
}

//обработка старта
const startHandler = (event) => {
    const element = generateElement();
    moveElement(event, element);
    element.ondragstart = function () {
        return false;
    };

    document.onpointermove = (event) => moveElement(event, element);
    document.onpointerup = (event) => pointerUpHandler(event, element);
}

startBox.addEventListener('pointerdown', startHandler);