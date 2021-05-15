class Auth {
  constructor() {
    this.authenticated = false;
  }

  async login(cb) {
    const password = "sanoj1809";

    const body = { password };
    await fetch("http://192.168.178.41:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    this.authenticated = true;
    cb();
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
