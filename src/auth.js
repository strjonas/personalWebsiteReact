class Auth {
  constructor() {
    this.authenticated = false;
  }

  async login(password, cb) {
    const body = { password };
    const response = await fetch("http://192.168.178.41:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.status === 200) {
      this.authenticated = true;
      cb();
    }
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
