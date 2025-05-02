let users = {};
let currentUser = null;

function showPage(id) {
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById(id).style.display = 'flex';
}

function register() {
  const username = document.getElementById('reg_username').value.trim();
  const password = document.getElementById('reg_password').value.trim();
  const account = document.getElementById('reg_account').value.trim();
  const pin = document.getElementById('reg_pin').value.trim();

  if (!username || !password || !account || !pin) {
    alert("All fields are required!");
    return;
  }
  if (password.length < 8) {
    alert("Password must be at least 8 characters!");
    return;
  }
  if (!username.match(/^[a-zA-Z0-9]+$/)) {
    alert("Username must be alphanumeric!");
    return;
  }
  if (username in users) {
    alert("User already exists!");
    return;
  }
  if (!account.match(/^\d{10}$/)) {
    alert("Account number must be 10 digits!");
    return;
  }
  if (!pin.match(/^\d{4}$/)) {
    alert("PIN must be 4 digits!");
    return;
  }

  users[username] = {
    password,
    account_number: account,
    pin,
    balance: 0
  };
  alert("Registration Successful!");
  document.getElementById('reg_username').value = '';
  document.getElementById('reg_password').value = '';
  document.getElementById('reg_account').value = '';
  document.getElementById('reg_pin').value = '';
}

function login() {
  const username = document.getElementById('login_username').value.trim();
  const password = document.getElementById('login_password').value.trim();
  const account = document.getElementById('login_account').value.trim();
  const pin = document.getElementById('login_pin').value.trim();

  const user = users[username];
  if (user && user.password === password && user.account_number === account && user.pin === pin) {
    currentUser = username;
    alert("Login Successful!");
    showPage('dashboard');
    updateDashboard();
  } else {
    alert("Invalid Credentials");
  }
}

function updateDashboard() {
  document.getElementById('welcome').textContent = `Welcome, ${currentUser}`;
  document.getElementById('balance').textContent = `Balance: $${users[currentUser].balance}`;
}

function deposit() {
  const amount = parseInt(document.getElementById('deposit_amount').value.trim());
  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount");
    return;
  }
  if (amount > 100000) {
    alert("Deposit limit is $100,000");
    return;
  }
  users[currentUser].balance += amount;
  updateDashboard();
  alert(`Deposited $${amount}`);
  document.getElementById('deposit_amount').value = '';
}

function withdraw() {
  const amount = parseInt(document.getElementById('withdraw_amount').value.trim());
  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount");
    return;
  }
  if (amount > users[currentUser].balance) {
    alert("Insufficient funds");
    return;
  }
  users[currentUser].balance -= amount;
  updateDashboard();
  alert(`Withdrew $${amount}`);
  document.getElementById('withdraw_amount').value = '';
}

function transfer() {
  const amount = parseInt(document.getElementById('transfer_amount').value.trim());
  const recipient = document.getElementById('transfer_to').value.trim();

  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount");
    return;
  }
  if (amount > users[currentUser].balance) {
    alert("Insufficient funds");
    return;
  }
  if (!(recipient in users)) {
    alert("Recipient does not exist");
    return;
  }

  users[currentUser].balance -= amount;
  users[recipient].balance += amount;
  updateDashboard();
  alert(`Transferred $${amount} to ${recipient}`);
  document.getElementById('transfer_amount').value = '';
  document.getElementById('transfer_to').value = '';
}

function logout() {
  currentUser = null;
  showPage('login');
  alert("Logged out successfully!");
}
