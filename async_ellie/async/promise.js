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

  setTimeout();
});
