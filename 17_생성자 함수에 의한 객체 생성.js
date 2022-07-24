/*
10장에서 배웠던 객체 리터럴에 의한 객체 생성 방식이 가장 일반적이고 간단한 객체 생성 방식이다.
이밖에도 다양한 방식으로 객체를 생성할 수 있다.
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)

이번에는 생성자 함수를 이용하여 객체를 생성하는 방식을 알아보고, 객체 리터럴 생성 방식과 장단점을 비교해보자.
 */

//1. Object 생성자 함수
/*
new Object() -> 빈 객체를 생성하여 반환한다.
이 이후에 프로퍼티나 메서드를 추가하여 객체를 완성시킨다.

객체를 생성하는 방법은 객체 리터럴이 훨신 간편하므로 굳이 사용할 필요는..없다.
 */
//+생성자 함수란?
/*
new 연산자와 함께 호출하여 객체를 생성하는 함수. 생성자 함수에 의해 생성된 객체는 '인스턴스'라고 부른다.
빌트인 생성자 함수
- new String()
- new Number()
- new Boolean()
- new Function()
- new Array()
- new Date()
- new RegExp
- new Promise() 등..
 */

//2. 생성자 함수(class를 만드는 느낌쓰)
/*
객체 리터럴 방식을 권장하지만(직관적, 간편) 동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우에는?
객체 리터럴 방식이 오히려 비효율적일 수 있다!!
한두 개야 그렇다 치지만, 만약 똑같은 메서드를 가진 객체 100개를 만들어야한다면?

-> 이를 해결하기 위해 생성자 함수를 이용할 수 있다.(Class처럼 작용한다.)
 */
// 생성자 함수
function Circle(radius){
    this.radius = radius;
    this.getDiameter = function () {
        return 2*this.radius;
    };
}
// 인스턴스 생성
const circle1 = new Circle(5);
const circle2 = new Circle(10);
console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
/*
여기서 인스턴스를 생성할 때 new 연산자를 사용하지 않으면?
생성자 함수가 아니라 일반 함수로 동작한다..
 */
const circle3 = Circle(15);
console.log(circle3);   // undefined
console.log(radius);    // circle 함수 내의 this 변수는 전역객체를 가리키게 된다.

//2-1. 생성자 함수의 인스턴스 생성 과정
/*
생성자 함수의 함수 몸체에서 수행해야 하는 것은?
1. 인스턴스 생성          -> 필수
2. 생성된 인스턴스 초기화  -> 선택

생성자 함수 내부를 보면, this에 프로퍼티를 추가하고, 필요에 따라 전달된 인수를 프로퍼티의 초기값으로서 할당하여 인스턴스를 초기화한다.
그럼 인스턴스를 생성하고 반환하는 코드는?
=> 자바스크립트 엔진에서 암묵적인 처리, new 연산자와 생성자 함수를 함께 호출하면 자바스크립트 엔진은 암묵적으로 인스턴스를 생성, 초기화 후 반환한다.
1. 인스턴스 생성과 this 바인딩
  암묵적으로 빈 객체(인스턴스)가 생성된다, 그리고 이 인스턴스는 this에 바인딩(식별자와 값을 연결하는 과정)된다.
  이 처리는 런타임 이전에 실행됨.
2. 인스턴스 초기화
  생성자 함수 내부의 코드가 한 줄씩 실행되며 this에 바인딩되어 있는 인스턴스를 초기화한다.
  즉, this에 바인딩되어 있는 인스턴스에 프로퍼티나 메서드를 추가하고, 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화한다.
3. 인스턴스 반환
  생성자 함수의 내부의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
  Q. 만약 return 문에 객체를 명시해버리면? -> this가 반환되지 못하고, return문에 명시한 객체가 반환된다.\
  Q. 그럼 return 문에 원시값을 반환하면? -> 원시값은 무시되고 암묵적으로 this가 반환된다.
  => 따라서 생성자 함수에서는 return을 반드시 생략하자.
 */

//2-2. 생성자 함수의 내부 메서드 [[Call]]과 [[Construct]]
/*
함수선언문 또는 함수표현식으로 정의한 함수는 일반적인 함수로 호출도 되고, new 연산자와 함께 사용하여 객체를 생성하는 것도 가능하다.
함수도 객체이므로, 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드를 모두 가지고 있다.
하지만 함수는 일반 객체가 아님(함수는 일반 객체와 다르게 호출할 수 있음)
    -> 일반 객체의 내부 슬롯과 내부 메서드 + 함수 객체만을 위한 내부 슬롯([[Environment]] [[FormalParameters]])와 내부 메서드([[Call]] [[Construct]])를 추가로 가진다.

함수를 일반 함수로서 호출하면? => [[Call]] 모든 함수 객체는 이 값을 가짐, callable
함수를 new 연산자와 사용하여 생성자 함수로 호출하면? => [[Construct]] 생성자로서 호출할 수 있는 함수, constructor

따라서 함수는 callable이면서 constructor이거나      (함수 선언문, 함수 표현식, 클래스)
            callable이면서 non-constructor이다.   (메서드(ES6메서드 축약 표현), 화살표 함수)
 */
//2-3. 그럼 이 함수가 constructor인지 non-constructor인지 어떻게 구분해?
function foo () {}          //함수 선언문
const bar = function () {}; //함수 표현식
const baz = {
    x: function () {}       //프로퍼티 x의 값으로 할당된 일반 함수, -> 메서드로 정의되지 않음
};
new foo();
new bar();
new baz.x();

const arrow = () => {}; //화살표 함수
//new arrow();   //TypeError: arrow is not a constructor
const obj = {
    x(){}               //ES6의 메서드 축약 표현만 메서드로 인정
}
//new obj.x();    //TypeError: obj.x is not a constructor
/*
함수를 프로퍼티 값으로 사용하면 일반적으로는 메서드임.
하지만 ECMAScript 사양에서 메서드는 ES6의 메서드 축약 표현만을 의미한다.

함수가 constructor인지 non-constructor인지 구분하는 방법은, 함수의 정의 방식에 따라 달라진다.
위의 화살표 함수와 메서드 축약 표현에서는, 내부 메서드 [[Constructor]]을 갖지 않는다. 따라서 생성자 함수로 호출하려고 하면 에러가 난다.

주의할 점은 일반 함수에도 new를 붙이면 의도치 않게 생성자 함수로 동작한다는 것!
 */

//2-4. new 연산자
/*
constructor 함수 한정, new 연산자와 함께 호출하면 내부메서드 [[Call]]이 아닌 [[Construct]]가 호출된다.
constructor 함수를 new 연산자 없이 호출하면 일반 함수로 호출된다, 내부메서드 [[Call]]이 호출된다.
 */
const circle4 = Circle(5);
console.log(circle4);       //undefined
console.log(radius);        //5, 위와 아래에서 this는 전역객체와 바인딩되었기 때문에 각각 전역객체의 프로퍼티와 메서드가 되어버린 것이다..
console.log(getDiameter()); //10
//circle4.getDiameter();      //TypeError: Cannot read properties of undefined (reading 'getDiameter')

//2-5. new.target
/*
생성자 함수가 new 키워드 없이 호출되는 것을 방지하기 위해 ES6에서는 new.target을 지원한다.
new.target은 this와 유사하게 constructor인 모든 함수 내부에서 암묵적인 지역 변수와 같이 사용되며, 메타 프로퍼티라고도 한다.(IE 지원안함)

new.target을 이용하면, new 연산자와 함께 생성자 함수로서 호출되었는지 체크할 수 있다.
    new 연산자와 함께 생성자 함수로서 호출하면? new.target == 함수 자신
    new 연산자를 사용하지 않고 일반 함수로 호출하면? new.target == undefined -> 이를 이용하여 재귀 호출을 통해 생성자 함수로서 호출 가능함.
 */
function Circle1(radius){
    if(!new.target){
        return new Circle1(radius);
    }
    this.radius = radius;
    this.getDiameter = function(){
        return 2*this.radius;
    };
}
const circle5 = Circle1(5);
console.log(circle5.getDiameter());
/*
+추가) IE에서는 new.target을 지원하지 않는데 그럼 어쩌죠?
    -> 스코프 세이프 생성자 패턴을 사용해보세영

    if(!(this instanceof ____)){
        return 재귀~
    }

    this가 이 함수의 인스턴스가 아니라면(== 프로토타입에 의해 연결되어 있지 않다) 재귀를 실행한다.
 */

/*
부록 - new 연산자
- new 연산자와 함께 생성자 함수에 의해 생성된 객체(=인스턴스)는 '프로포타입'에 의해 생성자 함수와 연결된다.
  이를 이용해 new 연산자와 함께 호출되었는지 확인할 수 있다.
- 대부분의 빌트인 생성자 함수(Object, String, Number, Boolean, Function, Array, Date, RegExp, Promise 등)는 new 연산자의 유무를 확인한 후 적절한 값을 반환한다.
- String, Number, Boolean 생성자 함수는 new 연산자 없이 호출되면, 문자열, 숫자, 불리언 값을 반환한다.(데이터 타입 변환에 사용됨)
 */