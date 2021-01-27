const isDev = process.env.NODE_ENV === "development";

const permanent = {
  getValue(name) {
    try {
      if (isDev) {
        console.log("getting", name);
      }
      const value = localStorage.getItem(name);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.log(e);
    }
  },
  setValue(name, value) {
    try {
      if (isDev) {
        console.log("saving", name, value);
      }
      return localStorage.setItem(name, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  }
};

const session = {
  getValue(name) {
    try {
      if (isDev) {
        console.log("getting", name);
      }
      const value = sessionStorage.getItem(name);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.log(e);
    }
  },
  setValue(name, value) {
    try {
      if (isDev) {
        console.log("saving", name, value);
      }
      return sessionStorage.setItem(name, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  }
};

const storage = { session, permanent };

export default storage;
