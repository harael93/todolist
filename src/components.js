// Header component
const Headers = () => {
    const h1 = document.createElement('h1');
    h1.textContent = 'Todo List Manager';
    h1.className = 'app-header';
    document.body.appendChild(h1);
}

// Main app container
const createAppContainer = () => {
    const container = document.createElement('div');
    container.className = 'app-container';
    container.id = 'app-container';
    document.body.appendChild(container);
    return container;
}

// Create sidebar with questions and controls
const createSidebar = (container) => {
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    

    // Quick Guide dropdown
    const quickGuideSection = document.createElement('div');
    quickGuideSection.className = 'sidebar-section';

    const quickGuideTitle = document.createElement('button');
    quickGuideTitle.className = 'sidebar-title';
    quickGuideTitle.textContent = 'Quick Guide ▼';
    quickGuideTitle.style.background = 'none';
    quickGuideTitle.style.border = 'none';
    quickGuideTitle.style.width = '100%';
    quickGuideTitle.style.textAlign = 'left';
    quickGuideTitle.style.cursor = 'pointer';
    quickGuideTitle.style.fontSize = '1.1em';
    quickGuideTitle.style.padding = '0';

    const quickGuideContent = document.createElement('div');
    quickGuideContent.style.display = 'none';
    quickGuideContent.style.marginTop = '10px';

    const guideTips = [
        {
            question: "How do I add a new list?",
            answer: "Use the form below to enter a list name and click 'Add List'."
        },
        {
            question: "How do I add items to a list?",
            answer: "Each list has its own 'Add Item' form at the top."
        },
        {
            question: "Can I mark items as complete?",
            answer: "Click the checkbox next to any item to mark it as done."
        },
        {
            question: "How do I delete items or lists?",
            answer: "Click the × button on any item or list header to remove it."
        }
    ];

    guideTips.forEach(tip => {
        const tipDiv = document.createElement('div');
        tipDiv.style.marginBottom = '10px';
        tipDiv.style.padding = '10px';
        tipDiv.style.background = '#f7f7fa';
        tipDiv.style.borderRadius = '8px';
        tipDiv.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
        tipDiv.innerHTML = `<strong>${tip.question}</strong><br><span style='font-size:0.95em;color:#555;'>${tip.answer}</span>`;
        quickGuideContent.appendChild(tipDiv);
    });

    quickGuideTitle.onclick = () => {
        if (quickGuideContent.style.display === 'none') {
            quickGuideContent.style.display = 'block';
            quickGuideTitle.textContent = 'Quick Guide ▲';
        } else {
            quickGuideContent.style.display = 'none';
            quickGuideTitle.textContent = 'Quick Guide ▼';
        }
    };

    quickGuideSection.appendChild(quickGuideTitle);
    quickGuideSection.appendChild(quickGuideContent);

    // Sidebar grid layout: statistics and controls side by side
    const sidebarGrid = document.createElement('div');
    sidebarGrid.className = 'sidebar-grid';

    // Stats section
    const statsSection = document.createElement('div');
    statsSection.className = 'sidebar-section';

    const statsTitle = document.createElement('h3');
    statsTitle.className = 'sidebar-title';
    statsTitle.textContent = 'Statistics';
    statsSection.appendChild(statsTitle);

    const statsCard = document.createElement('div');
    statsCard.className = 'stats-card';
    statsCard.id = 'stats-card';

    const statsNumber = document.createElement('div');
    statsNumber.className = 'stats-number';
    statsNumber.id = 'stats-number';
    statsNumber.textContent = '0';

    const statsLabel = document.createElement('div');
    statsLabel.className = 'stats-label';
    statsLabel.textContent = 'Total Lists';

    statsCard.appendChild(statsNumber);
    statsCard.appendChild(statsLabel);
    statsSection.appendChild(statsCard);

    // Controls section
    const controlsSection = document.createElement('div');
    controlsSection.className = 'sidebar-section';

    const controlsTitle = document.createElement('h3');
    controlsTitle.className = 'sidebar-title';
    controlsTitle.textContent = 'Add New List';
    controlsSection.appendChild(controlsTitle);

    const newListForm = document.createElement('div');
    newListForm.className = 'new-list-form';

    const formTitle = document.createElement('div');
    formTitle.className = 'form-title';
    formTitle.textContent = 'Create a new todo list';

    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter list name...';
    input.className = 'list-name-input';
    input.id = 'list-name-input';

    const button = document.createElement('button');
    button.textContent = 'Add List';
    button.className = 'add-list-btn';
    button.onclick = () => addNewList();

    inputGroup.appendChild(input);
    inputGroup.appendChild(button);
    newListForm.appendChild(formTitle);
    newListForm.appendChild(inputGroup);
    controlsSection.appendChild(newListForm);

    // Add both sections to the grid
    sidebarGrid.appendChild(statsSection);
    sidebarGrid.appendChild(controlsSection);

    sidebar.appendChild(quickGuideSection);
    sidebar.appendChild(sidebarGrid);
    container.appendChild(sidebar);
    return sidebar;
}

// Create main content area
const createMainContent = (container) => {
    const mainContent = document.createElement('div');
    mainContent.className = 'main-content';
    
    const listsContainer = document.createElement('div');
    listsContainer.className = 'lists-container';
    listsContainer.id = 'lists-container';
    
    mainContent.appendChild(listsContainer);
    container.appendChild(mainContent);
    
    return mainContent;
}

// Update statistics
const updateStats = () => {
    const listsContainer = document.getElementById('lists-container');
    const totalLists = listsContainer.children.length;
    const statsNumber = document.getElementById('stats-number');
    if (statsNumber) {
        statsNumber.textContent = totalLists;
    }
}

// Add new list function
const addNewList = () => {
    const input = document.getElementById('list-name-input');
    const listName = input.value.trim();
    
    if (listName === '') {
        alert('Please enter a list name');
        return;
    }
    
    const listsContainer = document.getElementById('lists-container');
    const listElement = createListElement(listName);
    listsContainer.appendChild(listElement);
    
    input.value = ''; // Clear input
    updateStats(); // Update statistics
    
    // Add a nice animation
    listElement.style.opacity = '0';
    listElement.style.transform = 'translateY(20px)';
    setTimeout(() => {
        listElement.style.transition = 'all 0.3s ease';
        listElement.style.opacity = '1';
        listElement.style.transform = 'translateY(0)';
    }, 10);
}

// Create individual list element
const createListElement = (listName) => {
    const listDiv = document.createElement('div');
    listDiv.className = 'todo-list';
    
    // List header with title and delete button
    const listHeader = document.createElement('div');
    listHeader.className = 'list-header';
    
    const listTitle = document.createElement('h3');
    listTitle.textContent = listName;
    listTitle.className = 'list-title';
    
    const deleteListBtn = document.createElement('button');
    deleteListBtn.textContent = '×';
    deleteListBtn.className = 'delete-list-btn';
    deleteListBtn.onclick = () => {
        listDiv.style.transition = 'all 0.3s ease';
        listDiv.style.opacity = '0';
        listDiv.style.transform = 'translateX(-100px)';
        setTimeout(() => {
            listDiv.remove();
            updateStats(); // Update statistics when list is deleted
        }, 300);
    };
    
    listHeader.appendChild(listTitle);
    listHeader.appendChild(deleteListBtn);
    
    // Add item form for this list
    const addItemForm = document.createElement('div');
    addItemForm.className = 'add-item-form';
    
    const itemInput = document.createElement('input');
    itemInput.type = 'text';
    itemInput.placeholder = 'Add new item...';
    itemInput.className = 'item-input';
    
    const addItemBtn = document.createElement('button');
    addItemBtn.textContent = 'Add Item';
    addItemBtn.className = 'add-item-btn';
    
    addItemForm.appendChild(itemInput);
    addItemForm.appendChild(addItemBtn);
    
    // Items container
    const itemsContainer = document.createElement('ul');
    itemsContainer.className = 'items-container';
    
    // Add item functionality
    const addItem = () => {
        const itemText = itemInput.value.trim();
        if (itemText === '') {
            alert('Please enter an item');
            return;
        }
        
        const listItem = createListItem(itemText);
        itemsContainer.appendChild(listItem);
        itemInput.value = ''; // Clear input
    };
    
    addItemBtn.onclick = addItem;
    
    // Allow Enter key to add item
    itemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    });
    
    // Allow Enter key to add list
    const listNameInput = document.getElementById('list-name-input');
    if (listNameInput) {
        listNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addNewList();
            }
        });
    }
    
    listDiv.appendChild(listHeader);
    listDiv.appendChild(addItemForm);
    listDiv.appendChild(itemsContainer);
    
    return listDiv;
}

// Create individual list item
const createListItem = (itemText) => {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'item-checkbox';
    checkbox.onchange = () => {
        if (checkbox.checked) {
            itemSpan.style.textDecoration = 'line-through';
            itemSpan.style.opacity = '0.6';
        } else {
            itemSpan.style.textDecoration = 'none';
            itemSpan.style.opacity = '1';
        }
    };
    
    const itemSpan = document.createElement('span');
    itemSpan.textContent = itemText;
    itemSpan.className = 'item-text';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-item-btn';
    deleteBtn.onclick = () => listItem.remove();
    
    listItem.appendChild(checkbox);
    listItem.appendChild(itemSpan);
    listItem.appendChild(deleteBtn);
    
    return listItem;
}

// Initialize the app
const initApp = () => {
    Headers();
    const container = createAppContainer();
    createSidebar(container);
    createMainContent(container);
    
    // Add Enter key support for the list input
    setTimeout(() => {
        const listNameInput = document.getElementById('list-name-input');
        if (listNameInput) {
            listNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    addNewList();
                }
            });
        }
    }, 100);
}

export { Headers, initApp };