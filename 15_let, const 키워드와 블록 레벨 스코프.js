/*
ES5까지는? var키워드를 사용해야만 변수를 선언할 수 있었음

var 키워드의 특징
1. 변수 중복 선언 허용
중복선언 시 초기화문의 유무에 따라 다르게 동작한다.
초기화문 있으면? -> 먼저 선언된 값이 변경된다
초기화문 없으면? -> 무시

2. 함수 레벨 스코프
var 키워드로 선언된 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정한다.
이 말은 즉슨 if문, for문 등과 같은 코드블록 내의 변수도 global 변수가 된다.
함수 레벨 스코프는 전역 변수를 남발할 가능성을 높인다. 이로 인해 의도치 않게 전역 변수가 중복 선언되는 경우가 발생한다.
 */
var x = 1;
if(true){
    var x = 10;     //지역 변수가 아니라 전역 변수 x이기 때문에 x=10이 된다.
}
console.log(x);     //10출력
var i=10;
for(var i=0; i<5; i++){     //블록은 다르지만, 함수가 아니기 때문에 i는 전역변수가 된다.
    console.log(i);
}
console.log(i);      //따라서 실행하면 10이 아니라 5가 된다.
/*
3. 변수 호이스팅
변수 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것처럼 동작한다.
변수 선언 이전에 변수를 참조하는 것은 에러는 일어나지 않지만(변수 호이스팅), 프로그램의 흐름상 맞지 않고, 가독성을 떨어뜨린다.
 */

//let 키워드
/*
var 키워드의 단점을 보완하기 위한 새로운 변수 키워드!
1. 변수 중복 선언 금지
 */
let bar = 123;
//let bar = 456;   //SyntaxError: Identifier 'bar' has already been declared
/*
2. 블록 레벨 스코프
모든 코드블록을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다.
 */
let foo = 1;
{
    let foo = 2;
    bar = 3;
    //let bar = 3, 위의 bar와 아래의 bar는 다르다. 위의 bar는 이미 선언된 bar를 참조하고, 이 bar는 새로 선언된 지역 변수 bar이다.
}
console.log(foo);   // 1
console.log(bar);   // 3
/*
3. 변수 호이스팅

var키워드와 달리 let 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않음
var 키워드 : 런타임 이전 자바스크립트 엔진에 의해 선언과 초기화(undefined)가 한번에 진행된다, 이후 런타임에서 변수 할당문에 도달해야 비로소 값을 가짐
            -> 이미 undefined로 초기화가 되었기 때문에 변수 호이스팅 발생함.
let 키워드 : 선언 단계와 초기화 단계가 분리되어 진행된다. 런타임 이전 선언 단계는 실행되지만, 변수 선언문에 도달해야 초기화 단계를 거친다.
            -> 초기화가 되기 전 접근하려고 하면 참조 에러가 발생한다
            스코프의 시작 지점부터 초기화 단계 시작 지점까지 변수를 참조할 수 없는 구간 = 일시적 사각지대
            그럼 변수 호이스팅이 발생하지 않는 거네? 그건 또 아니다.

            자바스크립트는 호이스팅을 하지만, let, const, class를 사용한 선언문은 호이스팅이 발생하지 않는 것처럼 동작한다.


4. 전역 객체와 let
var 키워드로 선언한 전역 변수와 전역 함수, 그리고 선언하지 않은 변수에 값을 할당한 암묵적 전역은 전역 객체 window의 프로퍼티가 된다.
전역 객체의 프로퍼티를 참조할 때 window를 생략할 수 있다.
vs
let 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다.!!
let 전역 변수는 보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드) 내에 존재하게 된다.
 */

//const 키워드
/*
상수를 선언하기 위해 사용된다(꼭 반드시 상수만을 위한 것은 아님)
const 키워드의 특징은 let 키워드의 특징과 대부분 비슷하다. 다른 점을 알아보쟝

1. 선언과 초기화
const 변수는 반드시 선언과 초기화를 동시에 해야 한다!!
const 키워드로 선언한 변수는 let과 마찬가지로 블록 레벨 스코프를 가진다, 변수 호이스팅이 발생하지 않는 것처럼 동작한다.

2. 재할당 금지

3. 상수
변수에 원시 값을 할당한 경우 변수 값을 변경할 수 없다. 원시 값은 변경이 불가능하므로, 재할당 말고는 값을 변경할 방법이 없기 때문이다.
    -> 그럼 원시 값이 아니면 변경 가능한가? 배열로 실험해보자
 */
const testList = [1, 2, 3];
testList[0] = 2
console.log(testList);      //[2, 2, 3] 출력된다. 객체 타입은 재할당이 아니라서 되나보다.
/*
원시 값은 변경 불가능하지만, 객체 타입은 참조값을 담고 있기 때문에 재할당이 아님!
아무튼, 일반적으로 상수는 대문자로 선언해 상수임을 명확히 나타낸다. 스네이크 케이스

4. const 키워드와 객체
const에 원시값이 할당되면? 값 변경 불가
const에 객체가 할당된다면? 값 변경 가능함(정확히는 접근). 객체가 변경되는 것이지 변수에 할당된 참조 값이 변경되는 것이 아니기 때문이다.
 */

//var let const
/*
변수 선언에는 기본적으로 const를 사용하고, let은 재할당이 필요한 경우에 한정해 사용하는 것이 좋다.
const는 의도치않은 재할당을 방지하기 때문에 안전하다!
    - ES6을 사용한다면 var 키워드 사용 금지!
    - 재할당이 필요하다면 let키워드 사용 단, 변수의 스코프를 최대한 좁게 하라
웬만하면 const로 선언하고, 재할당이 필요한 경우에 let으로 변경하자.
 */