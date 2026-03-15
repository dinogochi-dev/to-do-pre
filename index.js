let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    const tasks = savedTasks ? JSON.parse(savedTasks) : items;

    items.length = 0;
    items.push(...tasks);
}


function getTasksFromDOM() {
    return Array.from(
        document.querySelectorAll(".to-do__item-text"),
        el => el.textContent
    );
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateStorage() {
    const currentTasks = getTasksFromDOM();

    items.length = 0;
    items.push(...currentTasks);

    localStorage.setItem("tasks", JSON.stringify(items));
}


function createItem(item) {
    const template = document.getElementById("to-do__item-template");
    const clone = template.content.querySelector(".to-do__item").cloneNode(true); // полностью копируем задачу
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");

    // Устанавливаем текст задачи
    textElement.textContent = item;

    // Обработчик для кнопки удаления
    deleteButton.addEventListener('click', function () {
        clone.remove();
        updateStorage()
    });

    // Обработчик для кнопки копирования
    duplicateButton.addEventListener("click", () => {
        const clone = createItem(textElement.textContent);
        listElement.prepend(clone);
        updateStorage();
    });

    // Обработчик для кнопки редактирования
    editButton.addEventListener('click', function () {
        textElement.setAttribute('contenteditable', 'true');
        textElement.focus();
    });

    textElement.addEventListener('blur', function () {
        textElement.setAttribute('contenteditable', 'false');
        updateStorage();
    });

    return clone;
}

loadTasks();
items.forEach(task => {
    listElement.append(createItem(task));
});


formElement.addEventListener("submit", event => {
    event.preventDefault();

    const value = inputElement.value.trim();
    if (!value) return;

    listElement.prepend(createItem(value));
    updateStorage();
    inputElement.value = "";
});