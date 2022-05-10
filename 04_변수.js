//변수 선언을 나중에 해도 log가 찍힌다.
//변수 선언은 런타임 이전에 먼저 실행된다(소스코드의 평가 과정, 실행 컨텍스트)
//모든 선언문을 소스코드에서 찾아내 소스코드 평가 -> 후에 한 줄씩 실행
console.log(a);     //undefined
var a;

console.log("------------");

//변수 선언과 값의 할당은 실행 시점이 다르다.
console.log(b);     //undefined
var b;
b = 80;             //원래 b=undefined 였는데 80으로 재할당 된다.
console.log(b);     //80
//여기서 재할당은, 계속 같은 공간의 메모리에 저장되는 것이 아니라 새로운 메모리 공간에 저장한다.

console.log("------------");

//그렇다면 할당 후에 선언하면?
console.log(c);     //undefined
c = 80;
var c;
console.log(c);     //80 출력
