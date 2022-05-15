//숫자 타입
//배정밀도 64비트 부동소수점 형식을 따른다. -> 정수도 실수로 표현한다.
console.log("1 === 1.0 ? ", 1 === 1.0);

//2진수, 8진수, 16진수 리터럴은 모두 10진수로 해석된다.
var binary = 0b01000001;
var octal = 0o101;
var hex = 0x41;
console.log(binary);    //리터럴 표현식은 다르지만, 식을 10진수로 해석한다
console.log(octal);
console.log(hex);
console.log("binary === octal ? ", binary === octal);
console.log("octal === hex ? ", octal === hex);
console.log("----------");


//문자열 타입
//16비트 유니코드 문자의 집합, 큰따옴표, 작은따옴표, 백틱(``)을 사용
//문자열을 감싸지 않으면 키워드나 식별자같은 토큰으로 인식함.

//템플릿 리터럴
//백틱을 사용해 편리한 문자열 처리 기능을 제공함(ES6부터 제공)
//1. 멀티라인 문자열 : 이스케이프 시퀀스를 사용하지 않고도 줄바꿈이 허용됨 -> \n같은거 필요 없음
//2. 표현식 삽입 : 기존 문자열은 + 연산자를 이용, 템플릿 리터럴은 ${}에 표현식을 넣음
var name = 'gyuri';
var familyName = 'kim';
console.log(`my name is ${familyName} ${name}`);
console.log('----------');


//불리언 타입
//true, false만이 존재한다


//undefined타입
//변수 선언을 하면 암묵적으로 undefined 타입으로 초기화된다 <- 쓰레기값 들어있음, 값이 할당되기 전


//null타입
//변수에 값이 없다는 것을 의도적으로 명시하기 위함
//이전에 할당되어 있던 값에 대한 참조를 명시적으로 제거하는 것을 의미
//document.querySelector에서 요소를 찾지 못하면 에러가 아니라 null을 반환한다.


//심벌 타입
//ES6에서 추가된 7번째 타입, 변경 불가능한 원시 타입, 다른 값과 중복되지 않음
//Symbol 함수를 호출해 생성한다.
var key = Symbol('key');
console.log(typeof key);
console.log('----------');