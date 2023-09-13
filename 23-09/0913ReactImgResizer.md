# React img file resizer

![Alt text](../images/canIReactBG/%EB%8B%B9%EC%8B%A0%EB%8F%84%ED%95%A0%EC%88%98%EC%9E%88%EB%8B%A4%EB%A6%AC%EC%95%A1%ED%8A%B8.png)

- `오늘의 한일` 이미지 파일의 용량을 줄여서, 이미지 최적화를 해보자 !
- `깃 주소` https://github.com/muzi55/react_Img_File_Resizer

## 이미지 용량 줄이는 라이브러리 !

프로젝트 막바지에 이미지 최적화를 위해 이미지 용량을 줄이는 작업을 맡게되었다.

이미지 사이즈를 줄이고 퀄리티를 조절하여 이미지 사이지를 줄이는 방식이다.

이작업을위해 React img file resizer 를 사용했다.
<br/> https://www.npmjs.com/package/react-image-file-resizer

## 사용방법

```tsx
// 사용결과 npm 은 안되는거같다.
npm i react-image-file-resizer

or

yarn add react-image-file-resizer
```

1. ### resizeFile 함수 선언해주기

```tsx
const resizeFile = (file: File) =>
  new Promise<Blob>((resolve) => {
    Resizer.imageFileResizer(
      file,
      300, // 최댓값
      300, // 최솟값
      "JPEG", // 변환해야하는 확장자명 JPEG, PNG or WEBP.
      100, // 퀄리티 (화질)
      0, // rotate 회전
      (uri) => {
        resolve(uri as Blob); // uri의 콜백함수 => 크기가 조정된 이미지의  File, Blob, Base64 형식의 URI를 반환함
      },
      "blob" //  File, Blob, Base64
      // minWidth, // Is the minWidth of the resized new image.
      // minHeight // Is the minHeight of the resized new image.
    );
  });
```

2. ### onChange 함수 만들고 연결하기

```tsx
const [url, setUrl] = useState<string>();

const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  try {
    if (event.target.files === null) return;
    const file = event.target.files[0]; // 이 값이 null 일 수 있으므로, 위에서 타입가드를 해주었다.
    const image = await resizeFile(file);
    const imageUrl = window.URL.createObjectURL(image);
    setUrl(imageUrl);
  } catch (err) {
    console.log(err);
  }
};

return <input type="file" onChange={onChange} />;
```

3. ### 최종 코드

```tsx
import React, { useCallback, useState } from "react";

import Resizer from "react-image-file-resizer";

function App() {
  const [url, setUrl] = useState<string>();

  const resizeFile = (file: File) =>
    new Promise<Blob>((resolve) => {
      Resizer.imageFileResizer(
        file,
        300, // 최댓값
        300, // 최솟값
        "JPEG",
        50,
        0,
        (uri) => {
          resolve(uri as Blob);
        },
        "blob"
      );
    });

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files === null) return;
      const file = event.target.files[0];
      const image = await resizeFile(file);
      const imageUrl = window.URL.createObjectURL(image);
      setUrl(imageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>react Resizer 로 파일 용량, 이미지 줄이기</h1>
      <input type="file" onChange={onChange} />
      <div>
        <h2>미리보기 이미지</h2>
        {url && <img width={350} height={350} src={url} alt="미리보기 이미지" />}
      </div>
    </>
  );
}

export default App;
```

이미지를 업로드하면 한눈에 보기쉽게끔 이전이미지 사이즈와 압축된 이미지 사이즈를 비교할 수 있게끔했다.

아래 사진을보면 이미지가 획기적으로 준것을 직접 눈으론 볼 수 있다.

![Alt text](<images/0913/이미지 최적화1.gif>)
<br/>
<br/>
<br/>

## 문제점

이미지를 줄여도 문제가 생겼다.

이미지가 너무 작으면 최댓값을 오히려 잡아늘려가지고, 용량이 늘어나는 문제가 생겼다.

![Alt text](<images/0913/이미지 최적화2.gif>)

이미지 사이즈가 너무 작으면(1x1) 오히려 이미지 사이즈가 늘어나는 것이다..

최적화하랬더니 1x1 사이즈를 300으로 잡아 늘려버리니까 오히려 이미지 더할나위 없던 이미지가 무거워진것이다.

실제로 저런사용자는 드물겠지만 이런것에대한 대책을 지금 하고있다..
