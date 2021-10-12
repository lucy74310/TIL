/** ellie 풀이 **/
class UserStorage {
  async delay(ms) {
    return setTimeout(ms);
  }
  async loginUser(id, password) {
    await this.delay(2000);
    if (
      (id === "ellie" && password === "dream") ||
      (id === "coder" && password === "academy")
    ) {
      return id;
    } else {
      new Error("not found");
    }
  }

  async getRoles(user) {
    await this.delay(1000);
    if (user === "ellie") {
      return { name: "ellie", role: "admin" };
    } else {
      new Error("no access");
    }
  }
}

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");

userStorage
  .loginUser(id, password)
  .then(userStorage.getRoles)
  // .catch(console.log)
  .then((userWithRole) => {
    alert(`hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
  })
  .catch(console.log);
