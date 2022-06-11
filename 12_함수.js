/*
함수 : 입력과 출력이 있당.
하나의 실행 단위(코드 블록)
함수는 같은 코드를 여러 번 사용할 수 있음(코드의 재사용) => 유지보수의 편의성 높임, 코드의 신뢰성 높임

매개 변수 : 0개 이상의 매개변수, 인수가 순서대로 할당, 함수 내의 변수이므로 식별자 네이밍 규칙 준수
인수 : 함수에 넣는 입력값
반환값
함수 이름 : 식별자이므로 식별자 네이밍 규칙 준수, 기명함수/익명함수
 */

//함수를 정의하는 방법
/*
- 함수 선언문 : 자바스크립트 엔진에서 암묵적으로 함수 이름과 동일 이름의 식별자 생성, 그 식별자에 함수 객체를 할당
- 함수 표현식 : 평가되는 식으로, 식별자에 직접 할당한다. 보통 익명함수를 사용하고, 기명함수를 사용해도 함수를 호출할 땐 함수 이름이 아니라 식별자를 이용.(권장)
- 함수 생성자 함수 : 객체를 생성하는 함수를 이용, 매개변수와 함수 몸체를 문자열로 전달(권장X)
- 화살표 함수 : ES6에서 첫 등장, 내부 동작이 기존 함수와 다름
 */

//함수 선언문
/*
함수 선언문은 함수 이름을 생략할 수 없다(익명 함수 X)

함수 선언문은 표현식(평가되는 것 X)이 아니라 문이다.
따라서 크롬에서 실행하면 문을 실행한 결과인 undefined가 출력된다. => 문은 변수에 할당할 수 없는데?(if문을 떠올려보자)

함수 선언문은 자바스크립트 엔진에서 암묵적으로 식별자를 생성함
함수를 호출하기 위해 함수 이름과 동일한 이름의 식별자를 암묵적으로 생성, 거기에 함수 객체를 할당한다.
 */
function a(x, y){
    return x+y;
}
console.log(a(2+5));

//함수 표현식
/*
함수 표현식은 마치 함수 선언문을 변수에 할당하는 것 같다. 선언문은 변수에 할당할 수 없는데..?
자바스크립트 엔진이 눈치껏 함
혼자 사용되면(값으로 평가되지 않는 경우) 함수 선언'문'으로 해석한다
어딘가에 할당된다거나 피연산자로 사용되면(값으로 평가되는 경우) 함수 표현'식'으로 해석한다.

함수는 함수 이름으로 호출하는 것이 아니라, 함수 객체를 가리키는 식별자로 호출한다.
아래의 예시는 f식별자가 함수를 가리키므로, f를 써야 호출된다.
일반적으로 함수 표현식은 익명 함수를 사용한다.
 */
var f = function b(x, y){
    return x+y;
}
//console.log(b(2+5));        //b는 정의되지 않았다고 나온다. 왜냐면 함수 표현식을 f라는 변수에 저장한 것이기 때문이다.
console.log(f(2+5));

//함수 생성 시점과 호이스팅
console.dir(add);
//console.dir(sub);   //undefined
console.log(add(5, 2));
//console.log(sub(5, 2));     //TypeError: sub is not a function
//함수 선언문
function add(x, y){
    return x+y;
}
//함수 표현식
var sub = function(x, y){
    return x-y;
}
/*
위의 예제를 보면, 함수 선언문은 실행되지만 함수 표현식은 undefined로 나온다
함수의 생성 시점이 다르기 때문이다!

변수 때 배웠지만, 자바스크립트 엔진은 런타임 이전에 변수를 먼저 읽고 객체를 생성한다.
따라서 함수선언문은,
1. 함수 객체 생성
2. 함수 이름과 동일한 이름의 식별자를 암묵적으로 생성
3. 함수 객체 할당
의 과정을 거치게 된다.
이처럼 함수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징 = 함수 호이스팅

하지만, 함수표현식은 다르다
1. 선언된 변수가 undefined로 초기화
표현식은 런타임에 평가되어 그 값이 식별자에 할당된다.
따라서 함수를 먼저 실행해버리면 undefinde가 들어있으므로 함수 객체인지 아직 모르는 상태이다.
얘는 변수 호이스팅 발생
 */


//Function 생성자 함수
/*
자바스크립트가 기본 제공하는 빌트인 함수인 Function 생성자 함수에 매개변수와 함수 몸체를 문자열로 전달
 */
var c = new Function('x', 'y', 'return x+y');
console.log(c(2, 5));
/*
하지만 Function 생성자 함수로 함수를 생성하는 방식은 일반적이지 않고 바람직하지 않음!
왜냐면 함수 선언문이나 함수 표현식으로 생성한 함수와 다르게 동작하기 때문(클로저를 생성하지 않는 등)
 */


//화살표 함수
/*
ES6에 도입된 화살표 함수
function 키워드 대신 화살표 => 를 사용해 간략하게 함수 표현 가능, 항상 익명 함수로 정의

생김새 뿐 아니라 내부 동작 또한 간략화 되어있음
1. 생성자 함수로 사용할 수 없음
2. 기존 함수와 this 바인딩 방식이 다름
3. prototype 프로퍼티가 없음
4. arguments 객체를 생성하지 않음
 */


//함수 호출
/*
함수는 식별자와 함수 호출 연산자() 로 호출한다 ex. add(인수)

매개변수 또한 undefined로 초기화된 후 인수가 할당되는 형식이다.
그래서 인수를 매개변수보다 적게 전달해도 에러가 나지 않는다.
할당되지 않은 매개변수는 undefined가 들어있다.
그럼 만약 매개변수보다 인수를 많이 전달하면? 초과된 인수는 무시된다.
버려지는 것은 아니고, arguments 객체의 프로퍼티로 보관된다.

매개변수의 스코프(유효범위)는 함수 내부이다.

인수 확인
인수의 타입을 알기 어려우므로, 따로 throw문을 이용해 확인하곤 한다.
인수가 전달되지 않은 경우, undefined가 기본적으로 할당된다. 하지만, 미리 매개변수에 써두면 undefined가 아닌 내가 의도한 값을 넣을 수 있다.

함수의 반환 return
함수의 호출은 반환값으로 평가된다. 함수 호출 표현식은 return 키워드가 반환한 표현식의 평가 결과, 즉 반환값으로 표현된다.
return은 두 가지 역할을 한다
1. 함수의 실행 중단
2. return키워드 뒤의 표현식을 평가해 반환, 아무것도 없거나 return을 생략하면 undefinde가 반환된다.
 */

//참조에 의한 전달과 외부 상태의 변경
/*
값에 의한 전달, 참조에 의한 전달이 함수 내부의 매개변수에서도 동일하게 작동한다.(값에 의한 호출, 참조에 의한 호출이라고도 함)
 */
function changeVal(primitive, obj){
    primitive += 100;
    obj.name = 'kim';
}
//외부 상태
var num = 100;
var person = {name: 'Lee'};

console.log(num);
console.log(person);

changeVal(num, person);

console.log(num);       //num(원시값)은 훼손되지 않음, primitive에 재할당을 통해 할당된 원시 값
console.log(person);    //obj(객체)는 원본이 훼손된다, 객체는 변경 가능한 값이므로 재할당이 아니라 직접 할당된 객체를 변경
/*
원시 타입 인수는 값 자체가 복사되어 매개변수에 전달되기 때문에 함수 몸체에서 그 값을 변경해도 원본은 훼손되지 않는다.
객체 타입 인수는 참조 값이 복사되어 매개변수에 전달되기 때문에 함수 몸체에서 참조 값을 통해 객체를 변경할 경우 원본이 훼손된다.

=> 함수가 외부 상태를 변경하면 상태 변화를 추적하기 어려워진다. 코드의 복잡성을 증가시키고 가독성을 해침.
객체의 변경을 추적하려면 옵저버 패턴 등을 이용!

아니면 객체의 변경 자체를 막기 위해 불변 객체(immutable object)로 만들기!!
이는 객체의 복사본을 새롭게 생성하는 데 비용이 들지만, 원시값처럼 변경 불가능한 값으로 동작한다.
깊은 복사를 통해 새로운 객체를 생성하고 재할당을 통해 교체한다.

사실 함수가 외부 상태를 변경하지 않고, 외부 상태에 의존하지 않는 것이 best이다. =>순수 함수
 */


//다양한 함수의 형태!
//1. 즉시 실행 함수
/*
정의와 동시에 즉시 호출되는 함수이다. 단 한번만 호출되며 다시 호출할 수 없음
대부분 익명함수를 이용한다. 물론 기명 함수도 되긴 됨(그룹 연산자()내의 기명 함수는 함수 리터럴로 평가되고, 함수 이름은 함수 몸체에서만 참조할 수 있는 식별자이므로 다시 실행 불가).
 */
(function d(){      //함수 d는 그룹 연산자 내에서만 존재
    var a = 3;
    var b = 5;
    return a+b;
}());
//console.log(d());   //ReferenceError : d is not defined

//2. 재귀 함수
/*
자기 자신을 호출하는 행위
 */
function factorial(n){
    if(n<=1) return 1;              //탈출문이 없으면 무한으로 돌기 때문에 스택 오버플로 에러가 발생함
    return n*factorial(n-1);
}
console.log(factorial(5));

//3. 중첩 함수
/*
함수 내부에 정의된 함수
 */