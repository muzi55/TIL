# Lazy Import를 사용하여 최적화 하기

![Alt text](../images/canIReactBG/%EB%8B%B9%EC%8B%A0%EB%8F%84%ED%95%A0%EC%88%98%EC%9E%88%EB%8B%A4%EB%A6%AC%EC%95%A1%ED%8A%B8.png)

- `오늘의 한일` Lazy Import를 사용해 최적화 시키기 연습하기!

## lazy

```jsx
const MyComponent = lazy(loads);
```

`lazy`를 사용하면 처음 렌더링될 때까지 컴포넌트 코드의 로딩을 지연할 수 있다.!
<br/>
<br/>
<br/>

```jsx
import React, { lazy } from "react";

const MyComponent = lazy(() => import("./Counter.jsx"));
```

`컴포넌트 외부`에서 `lazy`를 호출하여 지연 로드된 React 컴포넌트를 선언합니다.
<br/>
<br/>
<br/>

## Suspense

이제 컴포넌트의 코드가 필요에 의해서만 로드되므로, 로드되는 동안 표시될 내용도 지정해야 한다.

지연 컴포넌트나 그 부모 컴포넌트를 `<Suspense>`로 감싸면 됩니다.

```jsx
<Suspense fallback={<p>로딩중</p>}>
  <h2>LazyLoading</h2>
  <LazyLoadingExample />
</Suspense>
```

`fallback` 의 값으로 `JSX문법`을 사용해주면 된다.

<hr/>
<br/>
<br/>
<br/>

### 예제 1

<iframe src="https://codesandbox.io/embed/react-lazy-loading1-qpfxsz?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="React lazy Loading1"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
   버튼을 클릭하면 그때서야 해당 컴포넌트를 import하는 방식이다.
<br/>
<br/>
<br/>
<br/>
<br/>

### 예제 2

<iframe src="https://codesandbox.io/embed/react-useid-9dg93p?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react useId"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

마우스를 클릭했을때 setTimeout을 사용해 딜레이를 준 예제이다.

예제에서는 setTimeout을 사용했지만, 데이터패칭이 필요한 컴포넌트라면 `fallback`의 값이 나온다.
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### 예제 3

<iframe src="https://codesandbox.io/embed/react-lazy-loading3-zs9yzq?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="React lazy Loading3"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
마우스 오버했을때 이벤트를 발생시킨 예제이다.

클릭했을때 임포트하는것이 아닌 마우스를 오버했을때 임포트를한다.
