document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    const tasksKey = 'todoTasks';

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem(tasksKey) || '[]');
        tasks.forEach(task => renderTask(task));
    };

    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem(tasksKey, JSON.stringify(tasks));
    };

    const renderTask = (taskData) => {
        const li = document.createElement('li');
        if (taskData.completed) {
            li.classList.add('completed');
        }

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = taskData.text;

        const actions = document.createElement('div');
        actions.className = 'task-actions';

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(actions);
        taskList.appendChild(li);

        taskText.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        deleteButton.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        editButton.addEventListener('click', () => {
            const currentText = taskText.textContent;
            const newText = prompt('Edit your task:', currentText);
            if (newText !== null && newText.trim() !== '') {
                taskText.textContent = newText.trim();
                saveTasks();
            }
        });
    };

    const addTask = () => {
        const text = taskInput.value.trim();
        if (text === '') {
            alert('Task cannot be empty.');
            return;
        }

        const newTask = { text: text, completed: false };
        renderTask(newTask);
        saveTasks();
        taskInput.value = '';
    };

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});