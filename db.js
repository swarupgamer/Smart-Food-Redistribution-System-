// ===== FoodShare Database (localStorage) =====
const DB = {

  // ---- USERS ----
  getUsers: () => JSON.parse(localStorage.getItem('fs_users') || '[]'),
  saveUsers: (u) => localStorage.setItem('fs_users', JSON.stringify(u)),

  registerUser(name, email, password, role) {
    const users = this.getUsers();
    if (users.find(u => u.email === email)) return { ok: false, msg: 'Email already registered.' };
    const user = { id: Date.now(), name, email, password, role, createdAt: new Date().toISOString() };
    users.push(user);
    this.saveUsers(users);
    return { ok: true, user };
  },

  loginUser(email, password) {
    // Admin hardcoded
    if (email === 'admin@foodshare.com' && password === 'admin123') {
      return { ok: true, user: { id: 0, name: 'Admin', email, role: 'admin' } };
    }
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { ok: false, msg: 'Invalid email or password.' };
    return { ok: true, user };
  },

  // ---- SESSIONS ----
  setSession(user) { localStorage.setItem('fs_session', JSON.stringify(user)); },
  getSession() { return JSON.parse(localStorage.getItem('fs_session') || 'null'); },
  clearSession() { localStorage.removeItem('fs_session'); },

  requireAuth(role) {
    const user = this.getSession();
    if (!user) { window.location.href = 'login.html'; return null; }
    if (role && user.role !== role) { window.location.href = 'login.html'; return null; }
    return user;
  },

  // ---- FOODS ----
  getFoods: () => JSON.parse(localStorage.getItem('fs_foods') || '[]'),
  saveFoods: (f) => localStorage.setItem('fs_foods', JSON.stringify(f)),

  addFood(food) {
    const foods = this.getFoods();
    const item = { ...food, id: Date.now(), status: 'available', createdAt: new Date().toISOString() };
    foods.push(item);
    this.saveFoods(foods);
    return item;
  },

  getFoodsByProvider(providerId) {
    return this.getFoods().filter(f => f.providerId === providerId);
  },

  getAvailableFoods() {
    return this.getFoods().filter(f => f.status === 'available');
  },

  updateFoodStatus(foodId, status) {
    const foods = this.getFoods();
    const idx = foods.findIndex(f => f.id === foodId);
    if (idx !== -1) { foods[idx].status = status; this.saveFoods(foods); }
  },

  deleteFood(foodId) {
    const foods = this.getFoods().filter(f => f.id !== foodId);
    this.saveFoods(foods);
  },

  // ---- REQUESTS ----
  getRequests: () => JSON.parse(localStorage.getItem('fs_requests') || '[]'),
  saveRequests: (r) => localStorage.setItem('fs_requests', JSON.stringify(r)),

  addRequest(req) {
    const requests = this.getRequests();
    const item = { ...req, id: Date.now(), status: 'pending', createdAt: new Date().toISOString() };
    requests.push(item);
    this.saveRequests(requests);
    return item;
  },

  getRequestsByConsumer(consumerId) {
    return this.getRequests().filter(r => r.consumerId === consumerId);
  },

  getRequestsByProvider(providerId) {
    return this.getRequests().filter(r => r.providerId === providerId);
  },

  updateRequestStatus(reqId, status) {
    const requests = this.getRequests();
    const idx = requests.findIndex(r => r.id === reqId);
    if (idx !== -1) {
      requests[idx].status = status;
      requests[idx].updatedAt = new Date().toISOString();
      this.saveRequests(requests);
      return requests[idx];
    }
    return null;
  },

  // ---- SEED DATA ----
  seed() {
    if (localStorage.getItem('fs_seeded')) return;
    const users = [
      { id: 1, name: 'Raj Hotel', email: 'raj@hotel.com', password: 'pass123', role: 'provider', createdAt: new Date().toISOString() },
      { id: 2, name: 'Helping Hands NGO', email: 'help@ngo.com', password: 'pass123', role: 'consumer', createdAt: new Date().toISOString() },
      { id: 3, name: 'Food Care Trust', email: 'food@care.com', password: 'pass123', role: 'consumer', createdAt: new Date().toISOString() },
    ];
    this.saveUsers(users);
    const foods = [
      { id: 101, name: 'Veg Biryani', quantity: '15 Plates', location: 'Nagpur', expiry: '22:30', details: 'Freshly cooked', providerId: 1, providerName: 'Raj Hotel', status: 'available', createdAt: new Date().toISOString() },
      { id: 102, name: 'Rice & Dal', quantity: '10 Plates', location: 'Pune', expiry: '21:45', details: 'Hygienic packing', providerId: 1, providerName: 'Raj Hotel', status: 'available', createdAt: new Date().toISOString() },
      { id: 103, name: 'Chapati Sabzi', quantity: '20 Plates', location: 'Mumbai', expiry: '23:00', details: 'Homemade', providerId: 1, providerName: 'Raj Hotel', status: 'available', createdAt: new Date().toISOString() },
    ];
    this.saveFoods(foods);
    localStorage.setItem('fs_seeded', '1');
  }
};

DB.seed();
