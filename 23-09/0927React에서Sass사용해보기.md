# React에서 Sass 사용하기 !

![대문 표지](../images/canIReactBG/%EB%8B%B9%EC%8B%A0%EB%8F%84%ED%95%A0%EC%88%98%EC%9E%88%EB%8B%A4%EB%A6%AC%EC%95%A1%ED%8A%B8.png)

- `오늘의 한일` React에서 Sass를 사용해 스타일링 하였다.
- [깃 주소](https://github.com/muzi55/React_Sass_ButtonStyling)

## Sass 를 사용하기에 앞서

React 에서는 scss를 사용하기전에 `node-sass` 를 인스톨 해야한다

```
npm install node-sass

or

yarn install node-sass
```

<br />

## 버튼 스타일링

자주 쓰이는 버튼을 sass로 꾸며보았다.

```tsx
//Button.tsx
import React from "react";
import "./Button.scss";
interface Props {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  color?: "red" | "blue" | "pink";
  fullwidth?: boolean;
  rounded?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({ className, type = "button", onClick, color = "blue", size = "medium", rounded, fullwidth, children }: Props): JSX.Element => {
  const styleRounded = rounded ? "rounded" : "";
  const styleFullwidth = fullwidth ? "fullwidth" : "";
  return (
    <button className={`${className} ${color} ${size} ${styleRounded} ${styleFullwidth}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
```

버튼 컴포넌트이다.

위에서부터보면

`className`, `onClick`, `children`, `size`, `color`, `fullwidth`, `rounded`, `type`

의 props를 받는다.

- `className` 말그대로 className 클래스이름을 추가로 받는다. 기존 스타일 외에 포지션으로 띄워야할때나, 추가적인 CSS를 사용해야하는 부분에서 className을 추가해서 스타일링 해준다.
- `onClick` 클릭이벤트이다. 인터페이스에보면 매개변수를 받지 않는 함수이다. 매개변수를 받아야할때나 특정값을 리턴해야하는? 상황이 온다면 인터페이스에서 타입을 바꿔줘야한다.
- `children` 버튼의 value 에 들어갈 값이다.
  <br/>
  <br/>

- `size` 버튼의 크기를 나타내는 props이다. 'small', 'medium', 'large' 가 있으며 기본값을 'medium' 으로 설정했다.

```scss
button {
  &.small {
    padding: 0.4rem 1rem;
  }
  &.medium {
    padding: 0.6rem 1.4rem;
  }
  &.large {
    padding: 0.8rem 1.8rem;
  }
}
```

<br/>
<br/>

- `color` 버튼의 색상을 나타내는 props이다. 'red', 'blue', 'pink' 가 있으며 기본값은 'blue' 으로 설정해놨다.

```scss
$red: #9b111e;
$blue: #00498c;
$pink: #ffc0cb;

@mixin button-color($color) {
  background: $color;

  &:hover,
  &:focus {
    background: lighten($color: $color, $amount: 5);
  }
  &:active {
    background: darken($color: $color, $amount: 10);
  }
}

button {
  &.red {
    @include button-color($red);
  }
  &.blue {
    @include button-color($blue);
  }
  &.pink {
    @include button-color($pink);
    color: #000;
  }
}
```

<br/>
<br/>

- `fullwidth` 버튼이 가로 100% 일때 사용되는 props이다.

```scss
button {
  &.fullwidth {
    width: 100%;
    display: block;
  }
}
```

<br/>
<br/>

- `rounded` 버튼이 border-radius 값을 필요로할때 사용되는 값이다.

```scss
button {
  &.rounded {
    border-radius: 99999px;
  }
}
```

- `type` 버튼의 type을 설정해주는 props이다. 기본값은 'button' 이다.

추가로 다른 버튼이벤트가 필요할경우 그 이벤트를 추가해주거나 ...rest 라는 props로 추가해주면 될것이다.

<br/>
<br/>

## before after 의 값을 유동적으로 받아야할때

작업중 before, after의 content 의 값을 유동적으로받아 뿌려줄때 문제가생겼다.

기존 css에서는 자바스크립트처럼 값을 유동적으로 받아오지 못하는것이다.

그래서 해결한방법이 HTML 데이타셋 속성(data-)을 이용하는것이였다.

```tsx
import React from "react";
import "./Test.scss";

interface Props {
  afterContent?: string;
  beforeContent?: string;
}
const Test = ({ afterContent, beforeContent }: Props): JSX.Element => {
  return (
    <div>
      <p className="test" data-before-content={afterContent} data-after-content={beforeContent}>
        가상선택자
      </p>
    </div>
  );
};

export default Test;
```

위 코드에서와 같이 p 태그 안에 data- 속성으로 `data-before-content`, `data-after-content`를 주었다.

이 값을 scss에서 사용하는방법은

```scss
.test {
  font-size: 20px;

  &::before {
    content: attr(data-before-content);
    color: blue;
  }

  &::after {
    content: attr(data-after-content);
    color: aqua;
  }
}
```

content의 `attr(data-before-content)`, `attr(data-after-content)` 의 값을 받아와서 사용했다.

그결과 정상적으로 내가 원하는 결과를 받게되었다.

이와같은문제는 tailwind 에서도 사용하면서 after, before의 값을 받아오기 힘들었지만 이런방식을 사용하면 나름 쉽게 유동적으로 값을 받을 수 있다.

예시에서는 content의 값만 받아왔지만 background, position, display등 css여러가지 유동적으로 값을 줄 수 있는것이다.
