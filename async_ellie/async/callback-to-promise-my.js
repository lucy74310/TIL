// 콜백지옥 예제!!

/** 내가 풀어본거 **/
class UserStorage {
  loginUser(id, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          (id === "ellie" && password === "dream") ||
          (id === "coder" && password === "academy")
        ) {
          resolve(id);
        } else {
          reject(new Error("not found"));
        }
      }, 2000);
    });
  }

  getRoles(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user === "ellie") {
          resolve({ name: "ellie", role: "admin" });
        } else {
          reject(new Error("no access"));
        }
      }, 1000);
    });
  }
}

// 1. 사용자에게 id, password 받아와서 loginUser
// 2. loginUser에서 받아온 id를 이용해서 getRoles 요청할것
// 3. 이름과 역할을 출력

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
