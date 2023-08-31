# 리액트 쿼리 🍽 부셔버리기

![Alt text](../images/canIReactBG/%EB%8B%B9%EC%8B%A0%EB%8F%84%ED%95%A0%EC%88%98%EC%9E%88%EB%8B%A4%EB%A6%AC%EC%95%A1%ED%8A%B8.png)

- `LifeCycle` 을 설명할 수 있다. <br/>
  react-query 라이프 사이클은 `active` 상태 안 `fetching` `fresh` `stale` 이 있고, 현재페이지에서 사용하지않는 상태인 `inactive`, `deleted` 가 있다.

  - `active`

  - `fetching` query Fn으로 db에서 데이터를 불러오는 상태
  - `fresh` 헌것이 아닌 새것의 상태
  - `stale` 헌것인 상태 계속해서 새것을 받기위해 fetching 함

  - `inactive` 페이지에서 언마운트된 캐시정보들
  - `deleted` inactive 된 정보가 삭제됨

<br/>
<br/>

- `Stale-While-Revalidate` 가 어떤 개념인지 설명할 수 있다.
  `SWR` 전략은 신규 데이터가 도착하는 동안 일단 캐싱된 데이터를 사용하도록 하는 전략

<br/>
<br/>

- `enabled` 옵션과 `select` 옵션을 사용할 수 있다.
  - `enabled` 는 선택적으로 fetching 할 수 있도록 하는 옵션이다.
  - `select` 는 fetching 으로 받아온 데이터를 그대로 쓸것인지 가공해서 사용할 것인지 선택하는 옵션이다.

## 리액트 쿼리란?

리액트 쿼리는 서버 상태관리를 쉽게 도와주는 `라이브러리` 이다.

서버 상태 (server state)란 서버에 요청하고 응답받는 모든 과정과 연관된 데이터를 의미함. <br/>

### 서버 상태관리를 쉽게끔 도와주는 React-query

1. `fetching` : 서버에서 데이터 받아오기.
2. `caching` : 서버에서 받아온 데이터를 따로 `보관`해서 동일한 데이터가 단 시간 필요할 시 `서버요청없이` 보관된 데이터에서 꺼내 쓰기.
3. `synchronizing` : 서버상의 데이터와 보관 중인 캐시 데이터(서버상태)를 동일하게 만들기 (`동기화`)
4. `updating` : 서버 데이터 변경 용이 (`mutation`& `invalidateQueries`)

### 차이 느껴보기

```tsx
// 리액트쿼리 미 사용시 =>
const [todos, setTodos] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const getTodos = async () => {
  setIsLoading(true);
  const data = await axios.get(`${API_URL}/todos`).then((res) => res.data);
  setTodos(data);
  setIsLoading(false);
};
useEffect(() => {
  getTodos();
}, []);
```

<br>

```tsx
// 리액트 쿼리 사용시
const getTodos = () => axios.get(`${API_URL}/todos`).then((res) => res.data);
const { data: todos, status } = useQuery(["todos"], getTodos);
```

코드 가독성이 좋고, 캐싱기능이있으며, 보일러 플레이팅이 굉장히 적다.

## Stale-While-Revalidate (SWR 전략)

- `stale` 신선하지 않다. / 헌거다 / 오래된거 <br/>
  => 헌거를 미리 보여주고, 새거가 오면 새것으로 바꿔줌

- 신규 데이터가 도착하는 동안 일단 기존 `캐싱된 데이터`를 사용하도록 하는 전략

- 서버의 헤더응답 설정 `Cache-Control` 에서 아이디어 기원

## 캐시데이터는 어디에 보관되나?

`QueryClientProvider` 에 보관됩니다. <br/>
`QueryClientProvider` 의 자식으로 있는 모든 컴포넌트들은 캐시 데이터에 접근할 수 있습니다.

## 리액트 쿼리의 흐름

![이미지로보는 리액트 쿼리](https://teamsparta.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Faa13ee81-c05e-433b-8389-9a41fcdb9793%2FUntitled.png?table=block&id=356fc637-ec7d-4a6a-8070-a6d2346b355a&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=2000&userId=&cache=v2)

1. `todos` 쿼리키를 통해 `context` 에 캐시 컨텍스트에 데이터를 달라고함.
2. 없음(`undefined` 로 반환)
3. `getTodos` 함수 호출
4. 캐시 컨텍스트에 [`todos`] 에 대한 데이터로 캐싱처리 (헌거 => 새로 바꾼 후 리렌더링 => 헌거 보여준다음에) // 바로 data에 담아주는게 아니라 캐싱시킨후 그 캐싱데이터를 data로 넘겨줌
5. 신규 캐시 데이터 반환

6. [`todos`] 에 대한 캐시데이터 요청 (캐싱된 데이터를 가져옴)
7. `getTodos` 함수를 호출후 헌것 => 새것으로 교체후 새것을 받음

<!-- mutation 들 -->

8. `addTodo` 실행하면 캐시 컨텍스트의 변화가 일어나지 않음. 캐시 컨텍스트를 구독하기때문 => onSuccess - `invalidateQueries`() => 기존 캐시데이터 무효화 => 새거로 교체함

## 리액트 쿼리의 라이프 사이클 🥧 (캐시 데이터)

![리액트 쿼리 라이프 사이클 이미지](https://teamsparta.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbd3f993b-c490-4373-b7b4-9d97e672948c%2FUntitled.png?table=block&id=f8e1e4a3-a315-428a-a424-6d3085500b14&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=2000&userId=&cache=v2)

- `active` 현제 화면이 캐시데이터를 사용중이다. (inactive 캐시데이터를 사용중이지 않다.)

1. `queryFn` 을 통해 `fetching` 으로 db에서 데이터를 받아오면 `fresh`, `stale` 상태가 된다.

   `fresh` - 더이상 새거를 필요로 하지 않음. <br/>
   `stale` - 계속해서 queryFn 을 통해 새로운 데이터를 요구함

2. `inactive` 상태가 오래되면 `deleted` 가 된다.

### default config(기본 설정)

- `staleTime`:0 <br/>
  useQuery 또는 useInfiniteQuery에 등록된 queryFn 을 통해 fetch 받아온 데이터는 항상 stale data 취급

- `refetchOnMount`: true <br/>
  useQuery 또는 useInfiniteQuery 가 있는 컴포넌트가 마운트 시 stale data 를 refetch 자동 실행

- `refetchOnWindowFocus` : true <br/>
  실행중인 브라우저 화면을 focus 할 때 마다 stale data 를 refetch 자동 실행

- `refetchOnReconnect` : true <br/>
  Network 가 끊겼다가 재연결 되었을 때 stale data를 refetch 자동 실행

- `cacheTime` : 5분 <br/>
  useQuery 또는 useInfiniteQuery 가 있는 컴포넌트가 언마운트 되었을 때 `inactive query`라 부르며, `inactive query`상태가 되면 5분 경과후 GC(가비지 컬렉터)에 의해 cache data 삭제 처리

- `retry` : 3 <br/>
  useQuery또는 useInfiniteQuery 에 등록된 queryFn 이 API 서버에 요청을 보내서 실패하더라도 바로 에러를 띄우지 않고 3번까지는 재요청을 자동으로 시도

### staleTime VS cacheTime

`staleTime` : 얼마나의 시간이 흐른 뒤에 stale 취급할 건지 (default : 0) <br/>
`cacheTime` : inactive 된 이후로 메모리에 얼마만큼 있을건지 (default:5분, cacheTime 0 되면 삭제 처리)

### staleTime 과 stale/fresh 의 관계

- `staleTime` > 0 이면, fresh data
- `staleTime` = 0 이면, stale data

### 하나의 쿼리 인스턴스(하나의 query key) 마다 위와 같은 LifeCycle을 가진다.

캐시 컨텍스트에 저장된 각각의 query key마다 위 그림과같은 생명주기를 같는다.

<br/>
<br/>
<br/>

## isLoading 과 isFetching 의 차이

- `isLoading` : 캐시 데이터가 있는 경우 isLoading은 false, isFetching은 true
- `isFetching` : 서버에서 데이터를 받고 있는 지 여부 (query Fn이 실행되는지 안되는지)

## react-query 에서 자주 사용되는 must-know 옵션들

- `enabled` : true <br/>
  옵션이 없을경우 자동으로 실행됨, 기본값 true (true/ false :boolean 값만 사용가능)<br/>
  자신이 원할때 `fetching` 하기위해 사용함

- `select` <br/>
  캐시데이터에 있는것을 그대로 데이터로 사용할것인지, 내입맛대로 데이터로 뿌릴건지 선택
