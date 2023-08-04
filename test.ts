// type nameType = string;

// const name = 'muzi5';

// let myName : nameType = name;

// function Gernerics<T>(value : T) :T {
//     return value
// }

//   Gernerics('문자열') // T 는 문자로 바뀜
//   Gernerics(3123).slice() // 숫자열 리터널이라서 length 를 사용하지 못함

// const Generic = <T>(value: T): T => {
//     return value;
//   }
//   Generic('하하하')
// function Generic<T>(value: T): T {
//     return value;
//   }
// const Generic = <T, U>(name:T, age:U):string =>{
//     return `이름 : ${name} / 나이 ${age} `
//   }
//   Generic<string, number>('김말국수',10)

// const Generic = <T>(value: T[]): T => {
//   return value[0];
// };

// Generic([
//   4,
//   "7",
//   5,
//   1,
//   "빵집",
//   true,
//   [4, false, { foo: "a" }],
//   { var: "b", pot: { qat: "w", bot: "s", aqa: [1, 5, 9] } },
// ]);

// const Generic = <T, K>(a: [T, K]): [T, K] => {
//   return a;
// };
// Generic(["문자열", 55]);
// Generic([true, { a: "hello", b: 55 }]);

// type Hello = <T>(value: T) => T;
// const helloFunc: Hello = <T>(value: T): T => {
//   return value;
// };
// interface ConFunc {
//     <T>(value:T): void
//   }
// interface Hello1 {
//   <T>(message: T): T;
// }

// const helloFunc1: Hello1 = <T>(value: T): T => {
//   return value;
// };
// type MuziFunc = <T>(value : T) => T;
// const getMuzi:MuziFunc =  <T>(value : T) : T=> { return value };
// getMuzi('카카오 무지').split('')

//   const getCon:ConFunc = <T>(value:T):void=>{
//     console.log(value)
//   }
//   getCon('무지 앤 콘')

// interface ConFunc {
//     <T>(value:T)
//   }
//   const getCon:ConFunc = <T>(value:T):void=>{
//     console.log(value)
//   }
const Generic = <T, K>(a: [T, K]): [T, K] => {
  return a;
};

Generic(["문자열", 55]);
Generic([true, { a: "hello", b: 55 }]);

// // 매개변수 x는 숫자 or 문자
// const numOrString = (x: number | string): void => {
//   // x의 타입이 문자형이라면 ?
//   if (typeof x === "string") {
//     // x 에 마우스를 얹혀보면
//     console.log(x); // (parameter) x: string
//     x.slice(2, 0); // 문자형 메서드인 slice를 사용할 수 있다.
//     Math.max(x, x); // error => 'string' 형식의 인수는 'number' 형식의 매개 변수에 할당될 수 없습니다.
//   }
//   // x의 타입이 숫자형이라면 ?
//   if (typeof x === "number") {
//     console.log(x); // (parameter) x: number
//     x.slice(2, 0); // error => 'number' 형식에 'slice' 속성이 없습니다.
//   }
// };
// numOrString("무지");
