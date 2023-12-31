# 떠오르는 별 TAILWIND

![Alt text](../images/canIReactBG/%EB%8B%B9%EC%8B%A0%EB%8F%84%ED%95%A0%EC%88%98%EC%9E%88%EB%8B%A4%ED%83%9C%EC%9D%BC%EC%9C%88%EB%93%9C.png)

그간 꾸준히 인기를 꾸려온 태일윈드를 드디어 한번 써봤다.

이제 NEXTJS를 써볼려고 찾아보다가 호환이 잘되는게 TAIL WIND라길래 드디어 나도 써보는구나 싶었다.

하지만 파이널 프로젝트를하고 팀 스터디 사람들과 넥스트js를 사용하기로했으니 일단 리액트에서 먼저 써봤다.

## 오늘 사용한 코드 git Link

- https://github.com/rmdkak/Stile/pull/5/files/fd66573bb0fb7bdd18e655393eae815bdf7dbbc6
- https://github.com/rmdkak/Stile/pull/6/files/3b1dfb26a90aad447dccbcb77c51d810dce6979c
- https://github.com/rmdkak/Stile/pull/7/commits/3aa24090281623682e092b4648032a78a508d54f

태일윈드 설치가이드는 다음날적겠다.

오늘 태일윈드를 사용하면서 어려웠던부분, 괜찮았던점, 개선해야할점 에 대해 얘기해보겠다.

### TailWind css :love_letter:

https://tailwindcss.com/
공식 문서이다.

여기서보면 quick search로 내가 원하는 css를 찾아 그것에대한 값을 바로 찾을 수 있다.

![Alt text](images/0821/%EB%85%B9%ED%99%94_2023_08_21_21_15_39_747.gif)

1. 사용하면서 좋았던점.:snake: <br/>
   태일윈드를 사용하면서 반응형 구현하기가 참 쉬웠다.
   반응형을 하기위해 각종 단위를 직접 제공하며, 다크모드 또한 쉽게 사용할 수 있도록 클래스가 다 준비되어 있었다.
   <br/>
   <br/>

2. 사용하면서 안좋았던점:racehorse: <br/>
   정말 치명적으로 큰 문제였던점이 아무래도 코드가 늘어진다는것이였다.
   ::after ::before에 hover, active, ... 등 가상선택자를 모두 같이쓴다면 지옥과도 같은 길이로 이게 맞는건가 싶기도하다.

   ```tsx
   // before 사용
   <div className=" relative mb-4 text-center before:content-[''] before:absolute before:block  before:top-1/2 before:left-0 before:w-full before:h-px before:bg-[#888] ">
     <h3 className="relative z-10 inline-block p-3 bg-[#fff] ;">SNS 계정으로 로그인하기</h3>
   </div>
   ```

   before만 사용했는대 여기에 after와 hover까지 모두 섰인다면 정말이지 생각만해도 두렵다.

   <br/>
   <br/>

3. 개선해야할 점:umbrella: <br />
   지금 중복되는 코드가 너무많고, 이걸 최적화하기위해 중복되는 코드는 변수로 빼던가 전역에서 관리를 해야할거같다.

   ```tsx
   // 반복되는 내용 반복되는 클래스 내용
   <div className="flex items-center justify-center">
     <button className="mr-2" onClick={logoutHandler}>
       <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">로그아웃버튼</span>
       <img src={logOutIcon} alt="로그아웃" />
     </button>

     {/* 마이페이지 */}
     <button className="mr-2" onClick={goToMypage}>
       <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">마이페이지버튼</span>
       <img src={userIcon} alt="마이 페이지" />
     </button>

     {/* 햄버거 */}
     <button onClick={openSideBarHandler} className="">
       <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">햄버거</span>
       <img src={hambergerMenu} alt="햄버거 메뉴" />
     </button>
   </div>
   ```
