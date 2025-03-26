document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#todoList li').forEach(li => {
            const textSpan = li.querySelector('.todo-text');
            tasks.push({
                text: textSpan.textContent,
                completed: textSpan.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskElement(text, isCompleted = false) {
        const listItem = document.createElement('li');
        const todoTextSpan = document.createElement('span');
        todoTextSpan.textContent = text;
        todoTextSpan.classList.add('todo-text');
        if (isCompleted) {
            todoTextSpan.classList.add('completed');
        }
        
        const completeButton = document.createElement('button');
        completeButton.textContent = isCompleted ? 'Desfazer' : 'Concluir';
        completeButton.classList.add('complete-btn');
        completeButton.addEventListener('click', () => {
            todoTextSpan.classList.toggle('completed');
            completeButton.textContent = 
                todoTextSpan.classList.contains('completed') ? 'Desfazer' : 'Concluir';
            saveTasks();
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => {
            todoList.removeChild(listItem);
            saveTasks();
        });
        
        listItem.appendChild(todoTextSpan);
        listItem.appendChild(completeButton);
        listItem.appendChild(removeButton);
        todoList.appendChild(listItem);

        return listItem;
    }

    addButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        
        if (todoText) {
            createTaskElement(todoText);
            saveTasks();
            
            todoInput.value = ''; 
        }
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });

    loadTasks();
});