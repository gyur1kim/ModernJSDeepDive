// 일급객체란?
/*
다음과 같은 조건을 만족해야 한다.
1. 무명의 리터럴로 생성할 수 있다(= 런타임에 생성이 가능하다)
2. 변수나 자료구조에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

함수는 위의 조건을 만족시키므로 일급객체가 된다. = 함수를 객체와 동일하게 사용할 수 있다는 의미
함수 선언문 : 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당됨
    1. 함수는 무명의 리터럴로 생성할 수 있음
    2. 함수는 변수에 저장할 수 있음
 */
const increase = function (num){
    return ++num;
}
const decrease = function(num){
    return --num;
}
//2. 함수는 객체에 저장할 수 있다
const predicates = {increase, decrease};
//3, 4 - 함수를 매개변수에 전달할 수 있다, 함수의 반환값으로 사용할 수 있다.
function makeCounter(predicate){
    let num = 0;
    return function(){
        num = predicate(num);
        return num;
    };
}
//3. 함수는 매개변수에게 함수를 전달할 수 있다.
const increaser = makeCounter(predicates.increase);
console.log(increaser());
console.log(increaser());
const decreaser = makeCounter(predicates.decrease);
console.log(decreaser());
console.log(decreaser());
/*
함수 객체 = 일급 객체, 객체 = 값 이므로 함수 = 값
함수는 값을 사용할 수 있는 곳이라면 어디서든 리터럴로 정의할 수 있으며 런타임에 함수 객체로 평가된다.

함수를 함수의 매개변수로 전달할 수 있고 함수의 반환값으로도 사용 가능 -> 함수형 프로그래밍을 가능케 하는 자바스크립트의 장점!

물론, 함수가 일급 객체지만 그렇다고 일반 객체와는 차이가 존재한다.
  1. 일반 객체는 호출할 수 없지만 함수 객체는 호출할 수 있음
  2. 함수 객체는 함수 고유의 프로퍼티를 가진다.
 */

//1. 함수 객체의 프로퍼티
/*
함수는 객체이므로 함수도 프로퍼티를 갖는다. -> 프로퍼티 어트리뷰트도 확인할 수 있음
<< 함수의 프로퍼티 >>
length, name, arguments, caller, prototype
<< __proto__ >>
  접근자 프로퍼티
  Object.prototype 객체의 상속 -> 모든 객체가 사용 가능
 */
//(1) arguments 프로퍼티
/*
arguments 객체의 값을 담는 프로퍼티.
arguments 객체는 함수 호출시 전달된 인수들의 정보를 담고 있음
순회 가능한 유사 배열 객체

자바스크립트는 매개변수와 인수의 개수가 일치하는지 확인하지 않음 -> 개수가 달라도 에러가 발생하지 않는다
why? 함수 내부에서 지역변수처럼 사용됨.
-> 함수가 호출되면 함수 몸체 내에서 암묵적으로 매개변수가 선언되고 undefined로 초기화된 이후 인수가 할당됨.
   따라서 매개변수의 개수와 인수의 개수가 맞지 않으면 인수가 할당되지 않아 undefined의 상태를 유지한다
Q. 만약 인수의 개수가 매개변수의 개수를 넘어가면?
A. 초과된 인수는 무시된다.
   하지만 사라지는 것은 아니고, arguments 객체의 프로퍼티로 보관된다.

arguments 객체는 인수를 프로퍼티 값으로 소유하며 프로퍼티 키는 인수의 순서를 나타냄.
callee 프로퍼티 : 함수 자신(호출되어 arguments 객체를 생성한 함수)을 가리킨다.
length 프로퍼티 : 인수의 개수
Symbol(Symbol.iterator) 프로퍼티 : arguments 객체를 순회 가능한 자료구조인 iterable로 만들기 위한 프로퍼티
 */
function multiply(x, y){
    const iterator = arguments[Symbol.iterator]();
    console.log(iterator.next());   //{ value: 1, done: false }
    console.log(iterator.next());   //{ value: 2, done: false }
    console.log(iterator.next());   //{ value: 3, done: false }
    console.log(iterator.next());   //{ value: undefined, done: true }

    return x*y;
}
multiply(1, 2, 3)
/*
arguments 객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다
* arguments 객체는 배열 형태로 인자 정보를 담고 있지만, 배열은 아니고 '유사 배열 객체'다
  따라서 배열 메서드를 사용하면 에러가 발생하고, call, apply를 사용해 간접 호출해야 하는 번거로움이 있다.
 */
function sum(){
    let res = 0;
    for(let i=0; i<arguments.length; i++){
        res += arguments[i];
    }

    return res;
}
console.log(sum());         //0
console.log(sum(1, 2));     //3
console.log(sum(1, 2, 3));  //6

//(2) caller 프로퍼티
/*
ECMAScript에 포함되지 않은 비표준 프로퍼티 -> 몰라도 됨
caller 프로퍼티는 함수 자신을 호출한 함수를 가리킨다.
브라우저 상에서 - 나를 호출한 함수가 있으면? 호출한 함수 return, 나를 호출한 함수가 없으면? null return
 */

//(3) length 프로퍼티
/*
함수를 정의할 때 선언한 매개변수의 개수를 가리킨다.
주의! arguments 객체의 length 프로퍼티  vs 함수 객체의 length 프로퍼티
둘은 다르다!!
arguments 객체의 length 프로퍼티 : 인자의 개수
함수 객체의 length 프로퍼티       : 매개변수의 개수
 */

//(4) name 프로퍼티
/*
함수 이름을 나타내는 프로퍼티. ES6 이전에는 비표준이었으나 ES6부터 정식 표준이 됨
-> ES5와 ES6에서 동작을 달리한다.
ex) 익명함수 표현식
- ES5 : name 프로퍼티는 빈 문자열을 값으로 가짐
- ES6 : name 프로퍼티는 함수 객체를 가리키는 식별자를 값으로 가진다
 */
// 기명 함수 표현식 -> 주의할 점! 함수를 호출할 때는 함수 이름이 아니라 함수 객체를 가리키는 식별자로 호출한다!! 따라서 foo가 아닌 namedFunc 호출
var namedFunc = function foo(){
    console.log(namedFunc.name);
}
// 익명 함수 표현식
var anonymousFunc = function(){};
console.log(anonymousFunc.name);
// 함수 선언문
function bar(){
    console.log(bar.name);
}

//(5) __proto__ 접근자 프로퍼티
/*
모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖는다.
[[Prototype]] 내부 슬롯이란?
-> 객체지향 프로그래밍의 상속을 구현하는 프로토타입 객체

__proto__는 [[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티
내부슬롯은 직접 접근X(16장에서 배웠음), 간접적으로 접근 가능함(방법을 제공하는 경우에 한함)
 */
const obj = {a: 1};
console.log(obj.__proto__ === Object.prototype);    //true

console.log(obj.hasOwnProperty('a'));           //true, hasOwnProperty는 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우 true 반환
console.log(obj.hasOwnProperty('__proto__'));   //false, hasOwnProperty는 인수로 전달받은 프로퍼티 키가 상속받은 프로퍼티 키인 경우 false 반환

//(6) prototype 프로퍼티
/*
생성자 함수로 호출할 수 있는 함수 객체, 즉 constructor만이 소유하는 프로퍼티다.
일반 객체와 생성자 함수로 호출할 수 없는 non-constructor에는 prototype 프로퍼티가 없다.

prototype 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 호출될 때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.
 */
