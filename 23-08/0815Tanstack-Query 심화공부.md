# Tanstack-Query 심화 !

![Alt text](images/0815/%EB%8B%B9%EC%8B%A0%EB%8F%84%ED%95%A0%EC%88%98%EC%9E%88%EB%8B%A4%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%BF%BC%EB%A6%AC.png)

## 1. Optimistic Update

- 서버 요청이 잘된거란 가정하에 UI를 먼저 변경후, 서버에 요청하는 방식입니다.
- 서버 요청이 실패하는 경우, UI 를 원상복구 합니다.
  <br/>
  <br/>
  ![Img](https://teamsparta.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8199403a-d0e7-44da-97c7-89f800e45557%2FUntitled.png?table=block&id=7fc29afd-bb2e-4246-abe2-98ff62f1cf67&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=1160&userId=&cache=v2)

### 진행순서

1. 좋아요 상태 렌더링
2. 좋아요 API 요청
3. DB에서 좋아요 상태 변경
4. 최신 DB 좋아요 상태 응답
5. 좋아요 상태 렌더링

### 사용예시

- 인스타 좋아요
- 북마크

<br/>
<br/>

### 사용 코드

```jsx

const queryClient = useQueryClient();

// 진행순서
//  1. onMutate
//  2. addPost 함수
//  addPost를 실패한다면?
//  => 원상복구
//  => invalidateQueries로 상태 갱신
const addMutation = useMutation(addPost, {

    // 가장 먼저 실행됨
    onMutate : async newPost =>{

        // 클라이언트 내부적으로 상태를 변경시킴
        await queryClient.cancelQueries({ querykey : ['post']});

        const previousPosts = queryClient.getQueryData ({["post"]});

        // 캐쉬데이터에 새로운 데이터를 더해 리렌더링을 시켜 UI를 바꿈
        queryClient.setQueryDate(["post"], (old)=> [...old, newPost])

        // onError 의 3번째 인자의 context임
        // 혹시라도 실패하면 빠르게 원상복구 하기위한 코드임
        return { previousTodos };
    },

    onError: (error, newPost, context)=> {
        console.error(error);
        console.log(context);
        queryClient.setQueryData(["posts"], context.previousPosts)
    },

    onSettled : () =>{
        queryClient.invalidateQueries({ queryKey : ["post"]})
    }
})

```

<br/>
<br/>

#### Optimistic 결론

UI를 먼저 업데이트 하고, 그 후에 서버로부터 실제 데이터가 도착할 때 까지 기다리는 것이 아니라, 사용자가 기대하는 결과를 미리 UI에 반영하여 빠르게 수행되는것처럼 보여 로딩을 최소화 하는것

<br/>
<br/>

### Tanstack 공식문저 Optimistic 부분

[탄스텍 공식문서(옵티미스틱)](https://tanstack.com/query/v4/docs/react/guides/optimistic-updates)

<br/>
<br/>
<br/>

## 2. Prefetching

- 페이지를 이동하기전 캐쉬데이터를 받아놈

```jsx
// Header.jsx
return (
    const onMouseOver = () =>{
        if(pathname !== "/") return
        queryClient.prefetchQuery({
            queryKey : ["post"],
            queryFn  : getPostDate  ,
        })
    }
    <Link> to={"/post"} onMouseOver={onMouseOver}
)
```

<!--
```jsx
// post.jsx
const { data, isLoading } = useQuery({
    queryKey : ["post", 1],
    queryFn: fetchPostDate,
})
``` -->

### 공식문서

[탄스텍 공식문서(프리페칭)](https://tanstack.com/query/v4/docs/react/guides/prefetching)
