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

 */
