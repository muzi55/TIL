# JS 클로저

![Alt text](../images/canIReactBG/%EB%8B%B9%EC%8B%A0%EB%8F%84%ED%95%A0%EC%88%98%EC%9E%88%EB%8B%A4%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8.jpg)

- `오늘의 할일` 클로저의 이해와 렉시컬 환경에대해 알 수 있다.
  <br/>
  <br/>
  <br/>

## 클로저의 개념

클로저는 `함수와 그 함수가 선언된 렉시컬 환경`과의 조합<br/>
함수가 선언될 당시 외부 변수 등의 정보!

```js
const x = 1_000_000;

function muziFunc() {
  const x = 10;

  function innerFunc() {
    console.log(x); // 10
  }

  innerFunc();
}

muziFunc();
```

이런식의 코드가있다. 여기서 x는 어디서 값을 참조하나?
<br/>
<br/>
<br/>

```js
function muziFunc() {
  const x = 10; // 스코프 체인을통해 위에있는 x 값을 참조

  function innerFunc() {
    console.log(x); // 10
  }

  innerFunc();
}
```

<br/>
<br/>
<br/>
<br/>

```js
const x = 1;

function outerFunc() {
  const x = 10;
  innerFunc();
}

function innerFunc() {
  console.log(x);
}
```

이런식의 코드에서 콘솔에 x는 뭐라구나올까?
<br/>
<br/>

```js
const x = 1;

function outerFunc() {
  const x = 10;
  innerFunc(); // 1
}

function innerFunc() {
  console.log(x); // 1
}
```

콘솔에 찍힌 값은 1이 나온다. <br/>
그 이유 이러하다.

`outerFunc` 와 `innerFunc`는 서로 다른 scope를 가지고 있기 때문이다.<br/>
`outerFunc`가 `innerFunc`를 호출했어도 선언은 밖에서 했기때문에 스코프를 달리한다.

이는 자바스크립트의 함수를 어디서 <b>호출</b> 했는지 아니라, <br/>
어디서 <b>정의</b> 했는지 따라 스코프를 결정하기 때문이다. => [렉시컬 스코프]

## 클로저와 렉시컬 환경

- 외부 함수보다 중첩 함수가 `더 오래 유지되는 경우`, 중첩 함수는 이미 생명주기가 종료한 외부 함수의 변수를 <em>여전히</em> 참조할 수 있다.

중첩 함수가 종료된시점 외부함수를 참조할 수 있음이 클로저이다.

![그림으로 본 콜스텍]()

- `outer` 함수를 호출하면 중첩 함수 inner 를 반환함.
- outer 함수의 실행 컨텍스트는 실행 컨텍스트 스탭에서 팝되어 제거됨
- `inner` 함수는 런타임에 평가됨
- inner 함수가 innerFunc에 전달되었는데, 이는 outer 함수의 렉시컬 환경을 <b>여전히</b> 참조 하고 있다.
- 즉, outer 함수의 실행 컨텍스튼는 실행 컨텍스트 스택에서 제거되지만 outer 함수의 렉시컬 환경까지 소멸하는 것은 아니다.

<br/>
<br/>
<br/>
<br/>

## 이런일이 가능한 이유

이건 js의 가비지 컬렉터가 있기 때문이다.

- outer 함수의 렉시컬 호나경은 참조하는 곳이 있으니 GC가 건들이지 않음.
  <br/>
  <br/>

### 클로저와 클로저가 아닌 함수

밑 두개의 A, B, C 코드블럭중 어떤게 클로저인가 ?

1. A

   ```js
   // A
   function foo() {
     const x = 1;
     const y = 2;

     function bar() {
       const z = 3;
       console.log(z);
     }

     return bar;
   }

   const bar = foo();
   bar();
   ```

2. B

   ```js
   // B
   function foo() {
     const x = 1;

     function bar() {
       debugger;
       console.log(x);
     }
     bar();
   }

   foo();
   ```

3. C

   ```js
   // C
   function foo() {
     const x = 1;
     const y = 2;

     function bar() {
       debugger;
       console.log(x);
     }
     return bar;
   }

   const bar = foo();
   bar();
   ```

A는 클로저 함수가 아니다.<br/>

- 이유는 z가 상위 스코프의 식별자를 참조하지 않기 때문이다.

B는 클로저 함수가 아이다.<br/>

- bar함수는 클로저함수이고 곧바로 소멸한다.
- 외부로 나가서 호출되지 않고 선언 후 바로 실행되며 소멸한다.
- 이러한 함수는 일반적으로 클로저라고 하지 않는다.

C는 클로저 함수이다.<br/>

- 중첩 함수 bar는 외부 함수보다 더 오래 유지되며, 상위 스코프의 식별자를 참고하기 때문이다.
  <br/>
  <br/>
  <br/>

B와 C의 차이는 함수를 호출하는 부분이 다른걸 볼 수 있다.<br/>
이는 `함수가 선언될 당시 외부 변수 등의 정보!` 에 맞는 클로저 함수인것이다.
