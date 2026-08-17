// State
let isLoginMode = true;
let categories = [];
let todos = [];

// DOM Elements
const authSection = document.getElementById('authSection');
const dashboardSection = document.getElementById('dashboardSection');
const navbar = document.getElementById('navbar');

const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const toggleAuthBtn = document.getElementById('toggleAuthBtn');
const authError = document.getElementById('authError');
const logoutBtn = document.getElementById('logoutBtn');

const categoryForm = document.getElementById('categoryForm');
const categoryList = document.getElementById('categoryList');
const todoForm = document.getElementById('todoForm');
const todoList = document.getElementById('todoList');
const todoCategorySelect = document.getElementById('todoCategory');

// Initialization
async function init() {
  // Check if we can fetch todos (meaning we are logged in)
  try {
    const res = await fetch('/api/todos');
    if (res.ok) {
      showDashboard();
      await fetchData();
    } else {
      showAuth();
    }
  } catch (err) {
    showAuth();
  }
}

// UI Toggles
function showAuth() {
  authSection.classList.remove('hidden');
  dashboardSection.classList.add('hidden');
  navbar.style.display = 'none';
}

function showDashboard() {
  authSection.classList.add('hidden');
  dashboardSection.classList.remove('hidden');
  navbar.style.display = 'flex';
}

toggleAuthBtn.addEventListener('click', () => {
  isLoginMode = !isLoginMode;
  authTitle.textContent = isLoginMode ? 'Login' : 'Register';
  if (authSubtitle) authSubtitle.textContent = isLoginMode ? 'Login to manage your tasks' : 'Sign up to get started';
  authSubmitBtn.textContent = isLoginMode ? 'Login' : 'Register';
  toggleAuthBtn.innerHTML = isLoginMode ? "Don't have an account? <span class='font-bold'>Register</span>" : "Already have an account? <span class='font-bold'>Login</span>";
  authError.classList.add('hidden');
});

// Auth Logic
authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (res.ok) {
      authError.classList.add('hidden');
      authForm.reset();
      
      if (!isLoginMode) {
        // Switch to login after register
        toggleAuthBtn.click();
        authError.textContent = "Registration successful. Please login.";
        authError.classList.remove('hidden', 'text-red-500');
        authError.classList.add('text-green-500');
      } else {
        showDashboard();
        await fetchData();
      }
    } else {
      authError.textContent = data.message || "An error occurred";
      authError.classList.remove('hidden', 'text-green-500');
      authError.classList.add('text-red-500');
    }
  } catch (err) {
    authError.textContent = "Network error";
    authError.classList.remove('hidden');
  }
});

logoutBtn.addEventListener('click', async () => {
  await fetch('/api/auth/logout', { method: 'POST' });
  showAuth();
});

// Fetch Data
async function fetchData() {
  const [catRes, todoRes] = await Promise.all([
    fetch('/api/categories'),
    fetch('/api/todos')
  ]);
  
  const catData = await catRes.json();
  const todoData = await todoRes.json();
  
  categories = catData.data || [];
  todos = todoData.data || [];
  
  renderCategories();
  renderTodos();
}

// Categories Logic
function renderCategories() {
  categoryList.innerHTML = '';
  todoCategorySelect.innerHTML = '<option value="">No Category</option>';
  
  categories.forEach(cat => {
    // Populate dropdown
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.name;
    todoCategorySelect.appendChild(option);
    
    // Populate list
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center group p-2 hover:bg-gray-50 rounded-lg transition-colors';
    li.innerHTML = `
      <span class="text-gray-700 text-sm font-medium">${cat.name}</span>
      <button class="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1" onclick="deleteCategory(${cat.id})">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
      </button>
    `;
    categoryList.appendChild(li);
  });
}

categoryForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nameInput = document.getElementById('catName');
  const name = nameInput.value;
  
  const res = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  
  if (res.ok) {
    nameInput.value = '';
    await fetchData();
  }
});

window.deleteCategory = async (id) => {
  if (confirm('Are you sure you want to delete this category? Todos in it will lose their category.')) {
    const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    if (res.ok) await fetchData();
  }
};

// Todos Logic
function renderTodos() {
  todoList.innerHTML = '';
  
  if (todos.length === 0) {
    todoList.innerHTML = '<div class="text-center text-gray-500 py-8">No tasks yet. Create one!</div>';
    return;
  }
  
  todos.forEach(todo => {
    const catName = todo.Category ? todo.Category.name : '';
    const catBadge = catName ? `<span class="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full ml-3 border border-purple-200">${catName}</span>` : '';
    
    const div = document.createElement('div');
    div.className = `group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all ${todo.is_done ? 'is-done bg-gray-50' : ''}`;
    
    div.innerHTML = `
      <div class="flex items-center gap-4 flex-1 overflow-hidden">
        <input type="checkbox" class="checkbox-custom" ${todo.is_done ? 'checked' : ''} onchange="toggleTodo(${todo.id}, this.checked)">
        <div class="flex flex-col">
          <span class="font-medium text-gray-800 line-through-smooth transition-all">${todo.title} ${catBadge}</span>
        </div>
      </div>
      <button class="text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all" onclick="deleteTodo(${todo.id})">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
      </button>
    `;
    todoList.appendChild(div);
  });
}

todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titleInput = document.getElementById('todoTitle');
  const title = titleInput.value;
  const category_id = todoCategorySelect.value || null;
  
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, category_id })
  });
  
  if (res.ok) {
    titleInput.value = '';
    await fetchData();
  }
});

window.toggleTodo = async (id, is_done) => {
  await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ is_done })
  });
  await fetchData(); // Refresh to ensure sync
};

window.deleteTodo = async (id) => {
  const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
  if (res.ok) await fetchData();
};

init();
