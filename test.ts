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

type Hello = <T>(value: T) => T;
const helloFunc: Hello = <T>(value: T): T => {
  return value;
};

interface Hello1 {
  <T>(message: T): T;
}

const helloFunc1: Hello1 = <T>(value: T): T => {
  return value;
};
