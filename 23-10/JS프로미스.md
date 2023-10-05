# Promise

![Alt text](../images/canIReactBG/%EB%8B%B9%EC%8B%A0%EB%8F%84%ED%95%A0%EC%88%98%EC%9E%88%EB%8B%A4%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8.jpg)

- `오늘의 한일` promise에 대해 이해할 가벼운 이해를 할 수 있었다
  <br/>
  <br/>

## Promise 란?

`promise`는 ES6 에서 비동기작업을 다루는데 사용되는 객체입니다.

- 비동기의 성공 또는 실패와 관련된 결과를 다루기 위한 패턴이다.
- 세 가지 상태를 가질 수 있으며, 이러한 상태는 대기, 이행, 거부 로 나뉜다.
- promise가 이행되거나 거부될 때 까지 코드는 일시 중지하지 않고 계속 실행된다.
  <br/>
  <br/>
  <br/>

### Promise를 사용하지 않았을 경우

```js
function increaseAndPrint(n, callback) {
  setTimeout(() => {
    const increased = n + 1;
    console.log(increased);

    if (callback) {
      callback(increased);
    }
  }, 1000);
}

increaseAndPrint(0);
```

1초뒤에 값을 1 더해서 출력해주는 `increaseAndPrint` 함수가 있다.

이 함수를 매개변수로 숫자를받고, 1초 후에 1을 더한값을 콘솔로 찍는 함수이다.

<br/>
<br/>
<br/>

```js
function increaseAndPrint(n, callback) {
  setTimeout(() => {
    const increased = n + 1;
    console.log(increased);

    if (callback) {
      callback(increased);
    }
  }, 1000);
}

increaseAndPrint(0, (n) => {
  increaseAndPrint(n, (n) => {
    increaseAndPrint(n, (n) => {
      increaseAndPrint(n, (n) => {
        increaseAndPrint(n, (n) => {});
      });
    });
  });
});
```

0부터 시작해 1씩 증가하여 5번 반복되는 함수이다.

이렇게 깊이가 `>` 형식으로 깊이가 깊어지는 콜백지옥에 빠진다.

이러한 코드에서 콜백지옥을 해결하기위해 promise를 사용해보자!
<br/>
<br/>

### promise 만들기

```js
const my_promise = newPromise((resolve, reject) => {
  //  코드 구문
});
```

이런식으로 만든다.

여기서 promise는 성공할수도, 실패할 수도있다.

성공할시 `resolve`를 호출해주고 실패시 `reject`를 호출해준다.

<br/>
<br/>
<br/>

```js
const my_promise = new Promise((resolve, reject) => {
  // 성공했을시 resolve 코드 구문
  setTimeout(() => {
    resolve("result");
  }, 1000);
});

console.log(1);
my_promise.then((result) => {
  console.log(result);
});
console.log(2);
```

위 코드의 결과는 1,2 가 먼저 찍히고 그 후에 'result' 가 찍히는 코드이다.

이런식으로 코드를 만들어 사용할 수 있다.

<br/>
<br/>

## 함수로 만든 promise

```js
const increaseAndPrint = (n) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const value = n + 1;

      if (value === 5) {
        const error = new Error();
        error.name = "value is Five Error";
        reject(error);
        return;
      }

      console.log(value);
      resolve(value);
    }, 1000);
  });

increaseAndPrint(0).then((n) => {
  console.log("result : ", n);
});
```

이런식의 코드가 있다.

이코드는 promise를 반환하며 n이 5가 넘으면 에러를 반환하고 1초후에 기존값에 1을더해서 콘솔에 찍는 함수이다.

여기서 궁금증은

```js
increaseAndPrint(0).then((n) => {
  console.log("result : ", n);
});
```

이런식으로 콜백으로 함수를 넣으면 콜백이랑 뭐가다르냐?

처리해야할 비동기 작업이 많다면 promise가 더 깔끔하다.

```js
increaseAndPrint(0)
  .then((n) => {
    return increaseAndPrint(n);
  })
  .then((n) => {
    return increaseAndPrint(n);
  })
  .then((n) => {
    return increaseAndPrint(n);
  })
  .then((n) => {
    return increaseAndPrint(n);
  })
  .then((n) => {
    return increaseAndPrint(n);
  })
  .then((n) => {
    return increaseAndPrint(n);
  })
  .then((n) => {
    return increaseAndPrint(n);
  })
  .then((n) => {
    return increaseAndPrint(n);
  })
  .catch((error) => {
    console.error(error);
  });
```

이런식의 코드가 작성이된다.
<br/>
<br/>

하지만 이것도 뭔가 ... 말 안해도 알것이다. 길고 너저분하다.

```js
increaseAndPrint(0)
  .then(increaseAndPrint)
  .then(increaseAndPrint)
  .then(increaseAndPrint)
  .then(increaseAndPrint)
  .then(increaseAndPrint)
  .then(increaseAndPrint)
  .catch((error) => {
    console.error(error);
  });
```

그럴땐 이런식으로 .then만 사용하여 코드를 더욱 보기좋게 만들 수 있다.

하지만 이것도 역시 문제가 있다.

어떤부분에서 에러가 났는지 파악하기 어렵고, 특정 조건에서 분기를 설정하기 힘들다는 단점이 있다.

그렇기에 사용되는것이 `es8` 에 등장한 [`async`, `await`](https://github.com/muzi55/TIL/blob/october/23-10/aysnc_await%20%EB%AC%B8%EB%B2%95.md) 문법이다.
<br/>
<br/>
<br/>

```js
const increaseAndPrint = (n) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const value = n + 1;

      if (value === 5) {
        const error = new Error();
        error.name = "value is Five Error";
        reject(error);
        return;
      }

      console.log(value);
      resolve(value);
    }, 1000);
  });

increaseAndPrint(0)
  .then(increaseAndPrint)
  .then(increaseAndPrint)
  .then(increaseAndPrint)
  .then(increaseAndPrint)
  .then(increaseAndPrint)
  .then(increaseAndPrint)
  .catch((error) => {
    console.error(error);
  });
```
