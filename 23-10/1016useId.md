# useId 사용해보기

![Alt text](../images/canIReactBG/%EB%8B%B9%EC%8B%A0%EB%8F%84%ED%95%A0%EC%88%98%EC%9E%88%EB%8B%A4%EB%A6%AC%EC%95%A1%ED%8A%B8.png)

- `오늘의 한일` useId를 사용하여 고유 ID 생성하기
- [![Edit react useId](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-useid-t4vwn6?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.js&theme=dark)

  <br/>
  <br/>
  <br/>

## useId

`useId`는 특정 컴포넌트 내 특정 `useId` 와 관련된 고유 ID 문자열을 반환함!

key를 생성하기 위해 사용하면 안됨!

```jsx
// useId 훅 사용하기
const id = useId();
```

<br/>
<br/>
<br/>

```jsx
import react, {useId} from `react`;

function MyComponents(){
    const userId = useId();
    // ...
```

컴포넌트 최상단에 `useId`를 호출하여 고유 ID를 생성함.

<br/>
<br/>
<br/>

```jsx
<>
  <input type="text" aria-userId={userId} />
  <p id={userId}> ... </p>
</>
```

생성된 ID를 다른 속성에 전달할 수 있다.
<br/>
<br/>
<br/>

### 코드

<iframe src="https://codesandbox.io/embed/react-useid-t4vwn6?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react useId"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

인풋 옆 'ID' 레이블을 눌러보자 그러면 ID가 연결되어있는 인풋으로 포커싱이된다.

이렇게 하는 이유가 뭘까? 그냥 ID로 'userId'로 값을주면 될텐대
<br/>
<br/>
<br/>

<blockquote>
However, hardcoding IDs like this is not a good practice in React. A component may be rendered more than once on the page—but IDs have to be unique! Instead of hardcoding an ID, generate a unique ID with useId:
</blockquote>
<br/>

ID를 직접 하드코딩하는건 React에서 좋은 방법이 아니다.

컴포넌트는 페이지에서 두 번 이상 렌더링될 수 있지만 `ID는 고유해야하기때문`이다.

ID를 하드코딩하는 대신, useId로 고유한 ID를 생성하라고 나온다.
