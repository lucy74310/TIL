"use strict";

// Javascript is synchronous.
// hoisting이 된 이후부터 코드가 순서에 맞춰 하나씩 실행됨 (in order)
// ( Execute the code block in order after hoisting.)
// hoisting: var, fucntion declaration 선언들이 자동적으로 제일 위로 올라가는것.
// 동기적 -> hoisting이후부터 코드가 나타나는 순서대로 자동적으로 실행된다 .
console.log(1);
console.log(2);
console.log(3);

// 비동기적 -> 코드가 언제 실행될지 예측할 수 없는것
// setTimeout() 특정시간이 지나면 전달한 콜백함수를 호출

console.log(1);
setTimeout(() => {
  console.log(2);
}, 1000); // 1초후에 불러줘 (call back) 콜백함수

console.log(3);

// 그럼 콜백은 항상 비동기일때만 쓸가?

// Synchronous callback
function printImmediately(print) {
  print();
}
printImmediately(() => console.log("hello"));
/**
 *  자바스크립트가 어떻게 실행될까?
 * 호이스팅이 되니까 printImmediately 함수가 제일 앞으로 가서 선언되었을거고
 * 쭉 진행하다가
 * printImmediately 실행..
 * */

// Asynchronous callball
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
} // setTimeout을 rapping 하고 있는 함수
//모든 함수는 hoisting되므로 제일 위로 올라감.

printWithDelay(() => console.log("async callback"), 2000);

// 콜백지옥 예제!!

class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === "ellie" && password === "dream") ||
        (id === "coder" && password === "academy")
      ) {
        onSuccess(id);
      } else {
        onError(new Error("not found"));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "ellie") {
        onSuccess({ name: "ellie", role: "admin" });
      } else {
        onError(new Error("no access"));
      }
    }, 1000);
  }
}

// 1. 사용자에게 id, password 받아와서 loginUser

// 2. loginUser에서 받아온 id를 이용해서 getRoles 요청할것

// 3. 이름과 역할을 출력

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");

userStorage.loginUser(
  id,
  password,
  (user) => {
    userStorage.getRoles(
      user,
      (userWithRole) => {
        alert(
          `hello ${userWithRole.name}, you have a ${userWithRole.role} role`
        );
      },
      (error) => {
        console.log(error);
      }
    );
  },
  (error) => {
    console.log(error);
  }
);

// Promise 약속 javascript에서 제공하는 비동기를 간편하게 처리할 수 있도록 도와주는 object
//정해진 장시간의 기능을 실행하고 나서 성공하면 성공한 결과값을
//실패하면 에러를 전달해줌
