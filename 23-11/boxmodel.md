# box Model

![Alt text](../images/canIReactBG/%EB%8B%B9%EC%8B%A0%EB%8F%84%ED%95%A0%EC%88%98%EC%9E%88%EB%8B%A4%EB%A6%AC%EC%95%A1%ED%8A%B8.png)

- `오늘의 할일` 박스 모델에 대한 이해를 할 수 있다.
  <br />
  <br />
  <br />

## css box 모델이란?

![박스 모델](images/boxdim.png)

css에서 디자인과 레이아웃을 말할때 `box model`이라는 용어가 사용됩니다.

박스모델은 기본적으로 모든 HTML 요소를 둘러싸는 상자이며, `content`, `padding`, `border`, `margin` 으로 구성됩니다.

- `content` : 텍스트나 이미지가 들어있는 박스의 실질적 내용 입니다.
- `padding` : 내용과 테두리 사이의 간격입니다.(내부 여백)
- `border` : 내용과 패딩을 감싸는 선 입니다.
- `margin` : 테두리와 이웃 요소 사이의 간격입니다.(외부 여백)

여기서 너비로 인정되는 부분은 `border` 까지의 값들입니다.

<br />
<br />
<br />

## HTML요소 높이와 너비 구하기

![예시 이미지](https://www.tcpschool.com/lectures/img_css_boxsize.png)

```css
.box {
  width: 70px;
  padding: 5px;
  margin: 10px;
}
```

예시 이미지에서 초록색은 컨텐츠, 빨간색은 패딩, 나머지는 마진이다.

여기서 컨텐츠와 패딩까지가 컨텐츠로 인식된다.

위 코드에서보면 `width`, `padding`의 값이 더해진 `5(왼쪽 패딩) + 70(컨텐츠) + 5(오른쪽 패딩)` 의 값이 합쳐진 80px이 이 아이템의 너비인것이다.
