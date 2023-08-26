# json-server-auth 사용

![Alt text](../images/canIReactBG/%EB%8B%B9%EC%8B%A0%EB%8F%84%ED%95%A0%EC%88%98%EC%9E%88%EB%8B%A4%EB%A6%AC%EC%95%A1%ED%8A%B8.png)

- `오늘의 할일` json-server 라이브러리를 사용해 회원가입, 로그인 기능 구현 🌼
- git 주소 https://github.com/muzi55/tscRegister-Login

- `앞으로 해야할일` 무한스크롤, 페이지네이션, 리액트쿼리 무한스크롤, 리액트쿼리 페이지네이션, 리액트쿼리 옵티미스틱 업데이트 가 있다.

## JSON SEVER AUTH

일단 가볍게 프로젝트생성하고 가볍게 라이브러리 다운하고 글을 시작해본다.

```
# NPM
npm install -D json-server json-server-auth axios

# Yarn
yarn add -D json-server json-server-auth axios
```

그간 로그인 회원가입에 손을 놓고있으니, 이쪽에 대해 너무 안일했던거같다. jwt가 뭔지 세션이뭔지 공부하는대 한세월이 걸렸다.

<br/>
<br/>
<br/>
<br/>

```tsx
// App.tsx
import React from "react";

import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Register />
      <hr />
      <Login />
    </>
  );
}

export default App;
```

<br/>
<br/>
<br/>

## 회원가입

```tsx
// Register.tsx
import React, { useState } from "react";
import axios from "axios";

interface Inputs {
  email: string;
  password: string;
}
interface UserData {
  isDelete: boolean;
  email: string;
  password: string;
}

const Register = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<Inputs>({
    email: "",
    password: "",
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const register = async (newData: UserData) => {
    try {
      await axios.post("http://localhost:4000/register", newData, { withCredentials: true });
      console.log(`가입 완료야 야!`);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newData: UserData = {
      ...inputValue,
      isDelete: false,
    };
    // signUpMutation.mutate(newData);
    register(newData);
  };

  return (
    <>
      <>
        <h1>회원가입</h1>
        <form onSubmit={(e) => onSubmitData(e)}>
          <input type="text" placeholder="이메일" name="email" onChange={inputChangeHandler} />
          <input type="password" placeholder="비밀번호" name="password" onChange={inputChangeHandler} />
          <button>회원가입</button>
        </form>
      </>
    </>
  );
};

export default Register;
```

회원가입 전체 코드이다.

여기서 볼점은 `register` 함수이다.

json server auth 는 회원가입은

```
`주소/register`, 추가할 값
```

이런식으로 바뀌었다.

내가 users 를 만들고, 거기에 추가해줄 필요없이 주소뒤에 /register 라고 붙혀주면 된다.

<br/>
<br/>
<br/>

## LOGIN

```tsx
// Login.tsx
import axios from "axios";
import React, { useState } from "react";
import { setCookie } from "../setCookie";
interface Login {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  /**
   *
   * @param loginValue
   * 이 함수는 아이디, 비밀번호를 서버에 줘서 jwt 토큰을 얻어옵니다.
   */
  const login = async (loginValue: Login) => {
    try {
      const { data } = await axios.post("http://localhost:4000/login", loginValue, { withCredentials: true });
      setCookie("accessToken", data["accessToken"], { path: "/" });
      console.log(`로그인 완료 cookie 에 jwt를 저장했습니다.`);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newData: Login = {
      email,
      password: pw,
    };
    login(newData);
  };

  return (
    <>
      <h2>로그인</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="이메일" />
        <input type="password" onChange={(e) => setPw(e.target.value)} value={pw} placeholder="비밀번호" />
        <button>로그인</button>
      </form>
    </>
  );
};

export default Login;
```

로그인 부분도 사실 별볼일 없다.

`login` 함수 내부에 구조분해한 data 값을 쿠키에 set 해주면 되는거다.

정말이지 이리도 쉽게 로그인이 되어다니 괜스리 쫄았던거같다.
