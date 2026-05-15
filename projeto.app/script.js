const pageButtons = document.querySelectorAll('.page-btn');
const pages = document.querySelectorAll('.page');
const loginNameInput = document.getElementById('loginUsername');
const loginEmailInput = document.getElementById('loginEmail');
const saveAccountBtn = document.getElementById('saveAccount');
const displayName = document.getElementById('displayName');
const displayEmail = document.getElementById('displayEmail');
const profileNameInput = document.getElementById('profileName');
const saveNameBtn = document.getElementById('saveName');
const summaryUser = document.getElementById('summaryUser');
const progressInput = document.getElementById('progressInput');
const progressValue = document.getElementById('progressValue');
const summaryProgress = document.getElementById('summaryProgress');

function setActivePage(targetId) {
  pages.forEach(page => {
    page.classList.toggle('active', page.id === targetId);
  });

  pageButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === targetId);
  });
}

function loadProfile() {
  const storedName = localStorage.getItem('readerName');
  const storedEmail = localStorage.getItem('readerEmail');
  const storedProgress = localStorage.getItem('readerProgress');

  const userName = storedName || '—';
  const userEmail = storedEmail || '—';
  const progress = Number(storedProgress || 0);

  displayName.textContent = userName;
  displayEmail.textContent = userEmail;
  summaryUser.textContent = storedName || 'Sem perfil';
  progressInput.value = progress;
  progressValue.textContent = progress;
  summaryProgress.textContent = `${progress}%`;

  if (!storedName || !storedEmail) {
    setActivePage('loginPage');
  }
}

function saveProfile() {
  const name = loginNameInput.value.trim();
  const email = loginEmailInput.value.trim();

  if (!name || !email) {
    alert('Preencha nome e email para continuar.');
    return;
  }

  localStorage.setItem('readerName', name);
  localStorage.setItem('readerEmail', email);
  alert('Conta salva com sucesso!');
  profileNameInput.value = name;
  loadProfile();
  setActivePage('profilePage');
}

function saveUserName() {
  const name = profileNameInput.value.trim();
  if (!name) {
    alert('Digite um novo nome para atualizar.');
    return;
  }

  localStorage.setItem('readerName', name);
  alert('Nome atualizado com sucesso!');
  loadProfile();
}

function saveProgress() {
  const progress = Number(progressInput.value);
  localStorage.setItem('readerProgress', String(progress));
  progressValue.textContent = progress;
  summaryProgress.textContent = `${progress}%`;
  alert('Progresso atualizado!');
}

pageButtons.forEach(button => {
  button.addEventListener('click', () => setActivePage(button.dataset.target));
});

saveAccountBtn.addEventListener('click', saveProfile);
saveProgressBtn.addEventListener('click', saveProgress);
saveNameBtn.addEventListener('click', saveUserName);

window.addEventListener('load', () => {
  loadProfile();
  const storedName = localStorage.getItem('readerName');
  profileNameInput.value = storedName || '';
});
