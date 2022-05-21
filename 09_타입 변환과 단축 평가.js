//개발자가 의도적으로 값의 타입을 변환하는 것 => 명시적 타입 변환, 타입 캐스팅
//표현식을 평가하는 도중에 자바스크립트 엔진에 의해 암묵적으로 타입이 변환되는 것 => 암묵적 타입 변환, 타입 강제 변환
//둘 다 값이 직접적으로 변하는 것은 아님, 기존 원시 값을 사용해 다른 타입의 새로운 원시 값 생성 = 기존 변수 값을 재할당하지 않음

//암묵적 타입 변환
//1. 문자열 타입으로 변환
//+연산자는 문자열과 만나면 문자열 연결 연산자로 동작한다 => 다른 피연산자도 문자열로 타입을 변환한다.
console.log("1 + '2'=", 1 + '2');
//2. 숫자 타입으로 변환
//산술 연산자, 비교 연산자, +단항연산자의 모든 피연산자는 숫자 타입이어야 한다
console.log("1 - '1'=", 1 - '1');
console.log("1 - 'one'=", 1 - 'one');
console.log("'1' > 0 : ", '1' > 0);
console.log("+'315'=", +'315');
//3. 불리언 타입으로 변환
//자바스크립트 엔진은 불리언 타입이 아닌 값을 truthy와 falsy로 구분한다.
//실제로 true나 false는 아니지만, 참으로 평가되는 값과 거짓으로 평가되는 값을 구분
if('')
    console.log("''=true");     //falsy
if(true)
    console.log("true=true");   //truthy
if(0)
    console.log("0=true");      //falsy
if('str')
    console.log("'str'=true");  //truthy
if(null)
    console.log("null=true");   //falsy
//falsy가 되는 값
//false, undefined, null, 0, -0, NaN, ''

console.log('---------');
//명시적 타입 변환
//1. 문자열 타입으로 변환
//1-1. String 생성자 함수
console.log('String(1) :', String(1));
console.log('String(Infinity) :', String(Infinity));
//1-2. toString() 메서드 사용
console.log("(NaN).toString() :", (NaN).toString());
console.log('(true).toString() :', (true).toString());
//1-3. 문자열 연결 연산자 이용(묵시적 타입 변환)
console.log('----------');
//2. 숫자 타입으로 변환
//2-1. Number 생성자 함수
console.log("Number('3') :", Number('3'));
console.log("Number(false) :", Number(false));
//2-2. parseInt() parseFloat() 함수 이용(문자열만 가능하다)
console.log("parseFloat('10.53') :", parseFloat('10.53'));
//2-3. +단항 산술 연산자, * 산술 연산자 이용(묵시적 타입 변환)
console.log("'2' * 1 :", '2' * 1);
console.log('----------');
//3. 불리언 타입으로 변환
//3-1. Boolean 생성자 함수
console.log("Boolean('false') :", Boolean('false'));
console.log("Boolean(false) :", Boolean(false));
//3-2. 부정논리 연산자를 두 번 사용
console.log('!!NaN :', !!NaN);
console.log('!!undefined :', !!undefined);
console.log('!![] :', !![]);

console.log('-----------');
//단축 평가
//논리합(||)과 논리곱(&&)은 꼭 boolean값 만을 반환하지 않는다, -> 피연산자 중 하나로 평가될 수 있다.
console.log("'cat' && 'dog' :", 'cat' && 'dog');
console.log('둘 다 truthy 값이다, 이 때 &&의 연산순서는 왼쪽에서 시작해 오른쪽까지 봐야한다.');
console.log('이에 맨 마지막에 본 dog를 반환한다. == 논리곱(&&)은 두 번째 피연산자가 표현식의 평가 결과이다.');
console.log('');
console.log("'cat' || 'dog' :", 'cat' || 'dog');
console.log('둘 다 truthy 값이다, 이 때 ||의 연산순서는 왼쪽에서 시작해 true가 나오면 멈추고, false가 나오면 오른쪽까지 살핀다.');
console.log('이에 첫 번째 값이 true이므로, cat을 반환한다. == 논리합(||)은 두 번째 피연산자까지 보지 않기도 한다.(=단축평가)');
console.log('');

var done = true;
var message = null;

//위의 if문과 같은 표현을 단축 평가를 이용해 쓸 수 있다.
message = done && "완료";
console.log(message);

done = false;
message = done || "미완료";
console.log(message);

// =>삼항연산자로 작성 가능함
done = true;
message = done? "완료" : "미완료";
console.log(message);

console.log('-----------');
//옵셔널 체이닝 연산자(ECMAScript2020), ?.
//좌항의 피연산자가 null/undefined 이면 undefined 반환, 아니면 우항의 프로퍼티 참조(객체에서 쓰이는듯)
//&& 대신 새로 도입된 이유!!
//&&연산자는 null/undefined 이외에 false, 0, -0, NaN, ''도 falsy로 평가하기 때문이다.
//하지만 0이나 ''도 객체로 평가될 때가 있다!!!
var str = '';
var length = str && str.length;
console.log("length :", length);    //length에는 ''가 들어간다.

length = str?.length;
console.log("length :", length);    //str = ''이어도 어쨌든 객체는 존재하므로 true를 반환!

//null 병합(ECMAScript2020), ??
//좌항의 피연산자가 null/undefined 이면 우항의 피연산자 반환
//좌항이 null/undefined가 아니면 좌항의 피연산자를 반환
var a = null ?? 'default string';
console.log("null ?? 'default string' :", a);
a = '' ?? 'default string';
console.log("'' ?? 'default string' :", a);