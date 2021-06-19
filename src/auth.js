class Auth {
  constructor() {
    this.authenticated = false;
  }

  async login(password, cb) {
    try {
      const body = { password };
      let api = process.env.REACT_APP_API || "localwebapi.herokuapp.com";
      const response = await fetch(`https://${api}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      try {
        if (response.status === 200) {
          const session = await response.json();
          localStorage.setItem("session", session);

          this.authenticated = true;
        }
        cb(response.status === 200);
      } catch (error) {
        cb(false);
      }
    } catch (err) {
      cb(false);
    }
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
