# 비동기 aysnc, await

![Alt text](../images/canIReactBG/%EB%8B%B9%EC%8B%A0%EB%8F%84%ED%95%A0%EC%88%98%EC%9E%88%EB%8B%A4%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8.jpg)

- `오늘의 한일` await 와 async가 왜 더 간편한지 이해할 수 있었다.
  <br/>
  <br/>
  <br/>

## 그래서 더욱 쉽다고?

`async`와 `awiat` 는 js에서 비동기 작업을 더욱 간편하게 만들어줍니다.<br/>
이 두가지 기능을 사용하면 promise를 더 쉽게 다룰 수 있습니다.

아래 코드를 보면 더욱 이해하기 쉽습니다.

```js
const timeOut = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const process = async (time) => {
  console.log("함수 시작");
  await timeOut(time);
  console.log("함수 종료");
};

process(2000);
```

위 코드를보면 `timeOut` 함수는 기본적으로 ms라는 매개변수를받아 매개변수의 시간만큼 기다리는 함수이다.

그함수를 process에서 호출해 사용하는대 호출문 위, 아래로 console.log가 있다.

기존의 비동기식 방식이라면

```js
console.log("함수 시작");
// 코드가 실행되지만 비동기작업이라 아래 코드가 바로 실행됨
console.log("함수 종료");
```

이런식으로 진행되었지만 async와 await를 사용하면

```js
console.log("함수 시작");
// 2초 기다려짐
console.log("함수 종료");
```

이런식으로 의도대로 작동한걸 볼 수 있다.

그리고 async를 사용하게 된다면 함수의 return 값은 `promise`를 반환한다.

```js
const timeOut = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const process = async (time) => {
  console.log("함수 시작");
  await timeOut(time);
  console.log("함수 종료");
  return "오늘저녁은 짜파게티";
};

process(2000).then((value) => console.log(value));
// 함수 시작
// 2초 기다림
// 함수 종료
// 오늘저녁은 짜파게티
```

이런식의 코드라면

async의 리턴값인 문자열을 then 으로 활용할 수 있다.
