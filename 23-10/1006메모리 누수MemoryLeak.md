# 메모리 릭

![Alt text](../images/canIReactBG/%EB%8B%B9%EC%8B%A0%EB%8F%84%ED%95%A0%EC%88%98%EC%9E%88%EB%8B%A4%EB%A6%AC%EC%95%A1%ED%8A%B8.png)

- `오늘의 할일` 메모리 누수가 일어나는 이유와 그것에대한 해결방법을 알 수 있다.
- [깃 주소]()

## 리액트에서 메모리 누수가 나는 경우

`window`.eventListener 사용시 cleanUP 을 시켜주지 않으면 메모리 누수가 생긴다.

밑 예제코드를 보면

```tsx
import React, { useState, useEffect } from "react";

function App() {
  const [clientXY, setClientXY] = useState<number[]>([0, 0]);

  const handleMouseMove = (e: MouseEvent) => {
    setClientXY([e.clientX, e.clientY]);
    console.log([e.clientX, e.clientY]);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <h2>홈</h2>
      <p>홈 페이지입니다.</p>
      <p>마우스 X, Y 좌표 {`${clientXY[0]}, ${clientXY[1]}`}</p>
    </>
  );
}

export default App;
```

useEffect 안에 마우스무브 이벤트가 있다.

useEffect 특성상 페이지가 마운트 됐을때, window에 이벤트를 걸어준다.<br/>
하지만 언마운트 되었을때 이벤트를 해지하지 않아 계속 쌓이게 되는식의 코드이다.
<br/>
<br/>
<br/>
밑 이미지를 보면 홈 => 어바웃 으로 페이지 전환이 되었는대(언마운트) 콘솔이 계속해서 찍히는것을 볼 수 있다.

![Alt text](images/1006%EB%A9%94%EB%AA%A8%EB%A6%AC%EB%88%84%EC%88%98/memoryleak0.gif)
<br/>
<br/>
<br/>

## 해결방법

```tsx
import React, { useState, useEffect } from "react";

function App() {
  const [clientXY, setClientXY] = useState<number[]>([0, 0]);

  const handleMouseMove = (e: MouseEvent) => {
    setClientXY([e.clientX, e.clientY]);
    console.log([e.clientX, e.clientY]);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    // useEffect에 return 부분에 해당 이벤트를 remove 해주는 cleanUp 함수를 사용해준다.
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <h2>홈</h2>
      <p>홈 페이지입니다.</p>
      <p>마우스 X, Y 좌표 {`${clientXY[0]}, ${clientXY[1]}`}</p>
    </>
  );
}

export default App;
```

해결방법은 해당 컴포넌트가 언마운트 되었을시 이벤트를 제거해주면 된다.

useEffect 부분 마지막단에 return 부분을 사용하면 언마운트 되었을시 코드가 실행한다.

그부분에서 removeEventListener로 해당 이벤트를 지워주면 된다.
<br/>
<br/>
<br/>

아래 이미지와 같이 페이지 전환이 일어났을때 더이상 콘솔이 찍히지 않는다.
![Alt text](images/1006%EB%A9%94%EB%AA%A8%EB%A6%AC%EB%88%84%EC%88%98/memoryleak1.gif)

eventListner와 비슷한 setTimeout도 같은방법으로 사용중이라면 언마운트 되었을시 clearTimeout을 사용해 종료시켜주면 메모리 누수를 방지할 수 있다.
