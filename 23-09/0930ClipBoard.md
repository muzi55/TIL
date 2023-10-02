# 리액트 클립보드

- `오늘의 한일` 클립보드를 사용해서 내용 복사하기
- [주소](https://github.com/muzi55/React_Clipbord)

## 사용된 코드

`navigator.clipboard.writeText()` - 클립보드에 텍스트 복사
`navigator.clipboard.readText()`- 클립보드에 존재하는 내용 붙여넣기

## 클립보드 복사하기

![미리보기 사진](images/0930/%ED%81%B4%EB%A6%BD%EB%B3%B4%EB%93%9C.gif)

```tsx
import React, { useState } from "react";

const Clipboard = (): JSX.Element => {
  const [input, setInput] = useState<string>("");
  const [contentText, setContentText] = useState<string>("이 텍스트가 복사됩니다.");

  const onClickClipboard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const contentText = e.currentTarget.textContent;

    try {
      if (contentText) {
        navigator.clipboard.writeText(contentText);
        alert(`복사 되었습니다.
복사된 문구 : ${contentText}`);
      }
    } catch (error) {
      alert("복사 실패");
      console.error("에러에러");
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContentText(input);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      <div onClick={onClickClipboard}>{contentText}</div>

      <form onSubmit={onSubmit}>
        <input type="text" className="border border-black" onChange={onChange} value={input} placeholder="복사할 문구를 써주세요" />
        <button className="border border-black">갱신</button>
      </form>
    </>
  );
};

export default Clipboard;
```

try catch 문 안에 navigator.clipboard.writeText()를 사용하여, 복사할 내용을 매개변수로 넣어주면 된다.

## 클립보드 붙혀넣기

```tsx
"use client";
import React, { useState, useRef } from "react";

const Clipboard = (): JSX.Element => {
  const [input, setInput] = useState<string>("");
  const [contentText, setContentText] = useState<string>("이 텍스트가 복사됩니다.");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClickClipboard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const contentText = e.currentTarget.textContent;

    try {
      if (contentText) {
        navigator.clipboard.writeText(contentText);
        alert(`복사 되었습니다.
복사된 문구 : ${contentText}`);
      }
    } catch (error) {
      alert("복사 실패");
      console.error("에러에러");
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      <div onClick={onClickClipboard}>{contentText}</div>

      <form
        onSubmit={(e) => {
          onSubmit(e);
          setContentText(input);
        }}>
        <input type="text" className="border border-black" onChange={onChange} value={input} placeholder="복사할 문구를 써주세요" />
        <button className="border border-black">갱신</button>
      </form>

      <form
        onSubmit={(e) => {
          onSubmit(e);

          try {
            navigator.clipboard.readText().then((text) => {
              if (inputRef.current !== null) {
                inputRef.current.value = text;
                alert("붙혀넣기 완료되었어 !");
              }
            });
          } catch (error) {
            alert("붙혀넣기 실패했어");
            console.error(error);
          }
        }}>
        <input type="text" ref={inputRef} className="border border-black" disabled placeholder="복사된 문구가 입력됩니다." value="복사된 문구가 입력됩니다." />
        <button className="border border-black">붙혀넣기</button>
      </form>
    </>
  );
};

export default Clipboard;
```

붙혀넣기도 try catch 문 안에서 사용된다.<br/>

```tsx
navigator.clipboard.readText().then((text) => {
  if (inputRef.current !== null) {
    inputRef.current.value = text;
    alert("붙혀넣기 완료되었어 !");
  }
});
```
try문 안에서 readText().then() 을 사용해 값을 할당해주면 된다.
