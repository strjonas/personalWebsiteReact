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
      const res = await fetch("https://localwebapi.herokuapp.com/session");
      const session = await res.json();
      localStorage.setItem("session", session);
      this.authenticated = true;
      isRight = true;
    }
    cb(isRight);
  }

  logout(cb) {
    localStorage.removeItem("session");
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
