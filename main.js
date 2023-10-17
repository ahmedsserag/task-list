window.addEventListener('load', function () {
	let taskForm = document.querySelector('#new-task-form');
	let taskInput = document.querySelector('#new-task-input');
	let taskList = document.querySelector('#tasks');
	let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
	tasks.forEach(createElements);
  
	taskForm.addEventListener('submit', function (e) {
		// Prevent page from being refreashed
		e.preventDefault();

		let taskObj = {
			content: taskInput.value,
			createdAt: Date.now()
		};
		// Check if user input is not empty, otherwise will call createElements()
		if (taskInput.value === "") {
			alert('Please enter a task, your input is empty.');
			return;
		} else {
			createElements(taskObj);
		};

		tasks.push(taskObj);
		// Convert JavaScript values to JSON strings
		localStorage.setItem('tasks', JSON.stringify(tasks));
	});
	
	function createElements(taskObj) {
		let taskDiv = document.createElement('div');
		taskDiv.classList.add('task');
	
		let taskContent = document.createElement('div');
		taskContent.classList.add('content');
		taskDiv.appendChild(taskContent);
	
		let task = document.createElement('input');
		task.classList.add('text');
		task.type = 'text';
		task.name = 'content';
		task.value = taskObj.content;
		task.setAttribute('readonly', 'readonly');
		taskInput.value = "";
	
		taskContent.appendChild(task);
		let btnDiv = document.createElement('div');
		btnDiv.classList.add('actions');
	
		let editBtn = document.createElement('button');
		editBtn.innerHTML = 'Edit'
		editBtn.classList.add('edit');
		btnDiv.appendChild(editBtn);
	
		let deleteBtn = document.createElement('button');
		deleteBtn.innerHTML = 'Delete'
		deleteBtn.classList.add('delete');
		btnDiv.appendChild(deleteBtn);
	
		taskDiv.appendChild(btnDiv);
		taskList.appendChild(taskDiv);
	
		// Edit Button Actions
		editBtn.addEventListener('click', function () {
			if (editBtn.innerText.toLowerCase() === 'edit') {
			editBtn.innerHTML = 'Save';
			task.removeAttribute('readonly');
			task.focus();
			} else {
			task.setAttribute('readonly', 'readonly');
			editBtn.innerHTML = 'Edit';
			// Update the task content in the tasks array when saving
			taskObj.content = task.value;
			updateTaskInLocalStorage(taskObj);
			};
		});
	
		// Delete Button Actions
		deleteBtn.addEventListener('click', function () {
			let confirmMsg = window.confirm("Are you sure about deleting this task?");
			if (confirmMsg === true) {
			taskList.removeChild(taskDiv);
			// Remove the task from the tasks array and update localStorage
			removeTaskFromLocalStorage(taskObj);
			}
		});
	}
  
	// Function to update a task in localStorage
	function updateTaskInLocalStorage(taskObj) {
		tasks = tasks.map((task) => task.createdAt === taskObj.createdAt ? taskObj : task);
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}
	
	// Function to remove a task from localStorage
	function removeTaskFromLocalStorage(taskObj) {
		tasks = tasks.filter((task) => task.createdAt !== taskObj.createdAt);
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}
  });
  