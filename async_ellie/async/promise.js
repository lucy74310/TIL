"use strict";

// Promise is a JavaScript object for asynchronous operation.

/**
 * 1. State 이해 중요
 * - pending: 로직 실행중인지
 * - fulfilled: 모두 완료한 상태인지
 * - rejected: 파일 찾을수 없거나 에러가 생김
 *
 *
 * 2. Producer 와 Consumer 차이
 * - 우리가 원하는 데이터를 제공하는 사람 : producer
 * - 원하는 데이터를 쓰는 사람 : consumer
 *
 */

// 2-1. Producer
// resolve : 기능 정상 수행되면 호출될 callback
// reject : 문제생기면 호출될 callback
const promise = new Promise((resolve, reject) => {
  // doing some heavy work (network, read files) : 네트워크에서, 파일에서 큰 데이터를읽어오는 과정은 시간이 꽤 걸림. 그러므로 비동기로 실행
  console.log("doing somethig...");
  // Promise 를 만드는 순간 우리가 전달한 executer 콜백함수가 바로 실행이 됨.
  // 불필요한 네트워크 통신 일어날수 있으므로 주의하자.
  // when new Promise is created, the executor runs automatically.

  setTimeout(() => {
    resolve("ellie");
    // reject(new Error("no network"));
  }, 2000);
});

// 2-2. Consumer : then, catch, finally (promise 사용하기)
promise
  .then((value) => {
    // then은 promise가 정상적으로 잘 수행 되어서 마지막에 최종적으로 resolve 라는 콜백함수를 통해 전달한 값이 value에 파라미터로 전달되어져서 들어옴
    console.log(value);
    // 성공적인 케이스만 다룰때(catch 없을때) 에러가 발생하면 Uncaught 에러 발생 -> 잡히지 않은 에러
    // @returns — A Promise for the completion of which ever callback is executed.
    // then은 promise를 리턴함. 그 리턴된 promise에 catch를 등록하는것 (chaining)
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    // 실패하든 성공하든 실행됨
    console.log("finally");
  });

// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});
fetchNumber
  .then((num) => num * 2) // 2
  .then((num) => num * 3) // 6
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(num - 1);
      }, 1000);
    });
  })
  .then((num) => console.log(num)); // 5

// 4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("🐔"), 1000);
  });

const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    // setTimeout(() => resolve(`${hen} => 🥚`), 1000);
    setTimeout(() => reject(new Error(` error! ${hen} => 🥚`)), 1000);
  });

const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🥞`), 1000);
  });

getHen() //
  .then(getEgg) //.then((hen) => getEgg(hen)) // 받아온 value를 바로 함수의 value로 넘길땐 생략가늠
  .catch((error) => {
    return "🍞";
  })
  .then(cook) //.then((hen) => getEgg(hen)) // 받아온 value를 바로 함수의 value로 넘길땐 생략가늠
  .then(console.log) // .then((meal) => console.log(meal));
  .catch(console.log); // getEgg에서 발생했지만 제일아래로 전달되면서 catch됨
