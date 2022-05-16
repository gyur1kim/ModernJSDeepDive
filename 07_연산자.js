//산술, 할당, 비교, 논리, 타입, 지수 연산
//연산의 대상자 : 피연산자, 피연산자는 값으로 평가될 수 있는 표현식
//피연산자와 연산자의 조합인 연산자 표현식도 표현식이다.


//산술연산자
//수학적 계산을 수행, 계산이 불가능할 경우 NaN을 반환한다.
console.log("5+2=", 5+2);
console.log("5-2=", 5-2);
console.log("5*2=", 5*2);
console.log("5/2=", 5/2);
console.log("5%2=", 5%2);
console.log('----------');
//
//전위연산자, 후위연산자
var a = 5
console.log("a=", a, ", a++=", a++, ", a=", a);
console.log("a=", a, ", ++a=", ++a, ", a=", a);
console.log("a=", a, ", a--=", a--, ", a=", a);
console.log("a=", a, ", --a=", --a, ", a=", a);
console.log('----------');
//
//숫자 타입이 아닌 피연산자에 +연산자 사용하면? -> 숫자로 변환해줌, Number()의 역할
//-연산자를 사용해도 숫자로 변환, 단 부호가 반전된다.
var b = '1';
console.log("+1 ->", +b);
console.log("1 ->", b);
var c = true;
console.log("+true ->", +c);
console.log("true ->", c);
var d = false;
console.log("+false ->", +d);
console.log("false ->", d);
var e = 'hello';
console.log("+'hello' ->", +e);
console.log("'hello' ->", e);
console.log('----------');
//
//피연산자 중 하나가 문자열이면, +연산자는 문자열 연결 연산자가 된다.
console.log("'1'+2 =", '1'+2);
console.log("1+true =", 1+true);
console.log("1+null =", 1+null);
//이렇게 데이터 타입이 강제로 변하는 것을 암묵적 타입 변환, 타입 강제 변환이라고 한다.
console.log('----------');

//비교 연산자
//좌항과 우항을 비교한 뒤 그 결과를 불리언 값으로 반환
//동등 비교(==)와 일치 비교(===)
//일치 비교에서 유일하게!!NaN은 자기 자신과 일치하기 않는다
console.log("NaN===NaN :", NaN===NaN);
//그래서 NaN인지 비교할 때는 isNaN()이라는 함수를 사용한다
console.log("isNaN(NaN) :", isNaN(NaN));
console.log("isNaN(10) :", isNaN(10));
console.log("isNaN(1+undefined) :", isNaN(1+undefined));
//값끼리 비교할 때는 Object.is() 메서드를 사용하기도 한다.
console.log("+0 === -0 :", +0 === -0);
console.log("Object.is(+0, -0) :", Object.is(+0, -0));
console.log('----------');
//
//삼항 조건 연산자
//조건식? 참일 때 : 거짓일 때
var f = 2, result;
//삼항 연산 조건자로 실행할 때, 결과를 변수에 저장할 수 있음(=값으로 평가할 수 있는 표현식)
result = f%2? '홀수' : '짝수';
console.log(result);
//if문으로 실행할 때, if문은 표현식이 아닌 문이므로 결과를 변수에 저장할 수 없음(=값으로 평가할 수 없는 문)
if(f%2===1)
    result = '홀수';
else
    result = '짝수';
console.log(result);
console.log('----------');


//typeof 연산자
//피연산자의 데이터 타입을 반환한다.
//string, number, boolean, undefined, symbol, object, function -> 7가지 중 하나를 반환
//null타입은 반환하지 않음, null은 object로 반환된다.
var g = null;
console.log("typeof null :", typeof g);
//따라서 null인지 데이터 타입을 확인하고 싶다면 일치 연산자(===)를 사용한다
console.log("g === null :", g === null);
//선언하지 않은 변수의 타입을 구하면 undefinde가 나온다,,,!
console.log("typeof undeclared :", typeof undeclared);

