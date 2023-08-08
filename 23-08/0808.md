# 타입스크립트 useRef 사용방법 !

![당신도할수있다타입스크립트](https://github.com/muzi55/TIL/assets/132406946/7d10436d-6194-4e0f-a633-ce06b1b8ad51)

- `간단 요약` useRef타입을 정의해서 사용할 수 있다.
- `useRef` 사용해 특정 Dom 요소를 찝을 수 있다.
  <br/>
  <br/>

## 1. useRef는 어디에 사용하는건가?!

<br/>

1. 리렌더링 되지 않는 컴포넌트 안 변수를 만들때! :star:

```tsx
import React, { useRef } from "react";
interface Abc {
  name: string;
  age: number;
}

const ref = useRef<Abc>({ name: "김슬기", age: 26 });
console.log(ref); //  {current : {name: '김슬기', age: 26}}

ref.current = { name: "박나나", age: 64 };
console.log(ref.current); // {name: '박나나', age: 64}
```

<br/>
<br/>

2. 특정 Dom 요소를 찝을때 :sparkles:

```tsx
import React, { useRef } from "react";

const divRef = useRef<null>(null)
<div ref={divRef}>날 찝어!</div>

console.log(divRef.current) //<div>...</div>
```

<br/>
<br/>

##
