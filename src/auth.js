class Auth {
  constructor() {
    this.authenticated = false;
  }

  async login(password, cb) {
    const body = { password };
    const response = await fetch("https://localwebapi.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let isRight = false;
    if (response.status === 200) {
      this.authenticated = true;
      isRight = true;
    }
    cb(isRight);
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
