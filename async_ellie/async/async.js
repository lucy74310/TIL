// async & await
// clear style of using promise
// 항상 async를 써야하는건 아니고 각 상황마다 써야할게 다르다

/* 1. Async vs Promise */
// 1-1. promise로 쓸때

function fetchUser() {
  // do network request in 10 secs...
  // return new Promise() 내가 언제 유저데이터를 받아올진 모르겠지만, promise를 갖고 있으면 then이라는 콜백함수만 등록해 놓으면,
  // 니가 등록해논 콜백함수를 불러줄게.
  return new Promise((resolve, reject) => {
    // return "ellie";
    // 꼭 promise안에는 resolve나 reject로 완료를 해줘야 함. 아님 상태는 계속 pending
    resolve("ellie");
  });
}

const user = fetchUser(); // 이 함수가 10초가 걸린다면 비동기적 처리를 하지 않으면 그 뒤 코드 실행이 안된채 기다림
user.then(console.log);

// console.log(user); //[[Prototype]]: Promise [[PromiseState]]: "pending" 리졸브도 리젝트도 호출하지 않았으므로..

console.log(user); // promise를 리턴하므로 then으로 해줘야 함

// 함수앞에 async를 붙여주면 자동적으로 함수안에 있는 코드블럭이 promise로 변환되어짐

// 1-2. async로 쓸때
// 코드 블럭이 자동으로 promise로 바뀜 (Systatic Sugar)
async function fetchUser2() {
  return "ellie";
}

const user2 = fetchUser();
user2.then(console.log);
console.log(user2);

/* 2. Await */
// async가 붙은 함수 안에서만 사용할수 있다.

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(2000);
  // throw "error";
  return "🍎";
}

async function getBanana() {
  await delay(1000);
  return "🍌";
}

/* await 안쓸때*/
/*
function getBanana() {
  return delay(3000)
    .then(()=>'🍌')
}
*/

/*
function pickFruits() {
  return getApple().then((apple) => {
    return getBanana().then((banana) => `${apple} + ${banana}`);
  });
}

pickFruits().then(console.log);
*/

/* await 쓸때 에러처리 */
/*
async function pickFruits() {
  try {
    const apple = await getApple(); // banana 와 apple 을 받아오는데는 서로 연관이 없기 때문에 기다릴 필요가 x
    const banana = await getBanana(); // 이것을 개선하려면 .. 밑에
  } catch {}

  return `${apple} + ${banana}`;
}

pickFruits().then(console.log);
*/

// 위코드의 한가지 문제점.
// banana 와 apple 을 받아오는데는 서로 연관이 없기 때문에 서로 기다릴 필요가 x

/*
async function pickFruits() {
  const applePromise = getApple(); // 프로미스를 만들면 바로 프로미스 안의 코드블럭이 실행됨
  const bananaPromise = getBanana(); // 만들자 마자 안의 코드가 실행됨.
  const apple = await applePromise; // 기다렸다가 실행
  const banana = await bananaPromise;
  return `${apple} + ${banana}`;
}

pickFruits().then(console.log);
*/

// 하지만, 위 코드처럼은 쓰지는 않음

// 3. useful Promise APIs
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()]).then((fruits) =>
    fruits.join(" + ")
  ); //프로미스 배열을 전달하면, 모든 프로미스들이 병렬적으로 다 받아질때까지 기다려주고, 다 받아진 배열이 전달됨
}

pickAllFruits().then(console.log);

// 첫번째 과일만 받아오고 싶다면 ?
function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
} // 딱 하나만 먼저 실행되는 애가 전달됨

pickOnlyOne().then(console.log);
