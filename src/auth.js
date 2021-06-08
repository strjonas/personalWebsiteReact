class Auth {
  constructor() {
    this.authenticated = false;
  }

  async login(password, cb) {
    try {
      const body = { password };
      const response = await fetch(
        `https://${process.env.REACT_APP_API}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (response.status === 200) {
        const res = await fetch(
          `https://${process.env.REACT_APP_API}/${process.env.REACT_APP_SEC}`
        );
        const session = await res.json();
        if (session === "nice try") {
          cb(false);
        } else {
          localStorage.setItem("session", session);
          this.authenticated = true;
          cb(response.status === 200);
        }
      } else {
        cb(false);
      }
    } catch (error) {}
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
