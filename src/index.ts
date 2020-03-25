const name = "lee",
  age = 24,
  gender = "male";

interface Human {
  name: string;
  age: number;
  gender: string;
}

const person = {
  name: "min",
  age: 22,
  gender: "male"
};

// const sayHi = (name: string, age: number, gender?: string): string => {
//   return `Hello ${name}, you are ${age}, you are a ${gender}`;
// };

const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`;
};

console.log(sayHi(person));

export {}; // 모듈로 생성
