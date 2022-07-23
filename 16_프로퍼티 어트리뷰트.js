//앞으로 살펴볼 프로퍼티 어트리뷰트를 이해하기 위해 내부슬롯과 내부 메서드를 알아보자.

//0. 내부 슬롯과 내부 메소드
/*
내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티와 의사 메서드이다.
이중대괄호로 감싸져있다. [[...]]

내부 슬롯과 내부 메서드는 자바스크립트 엔진에서 동작하지만, 개발자가 직접 접근할 수 있도록 외부에 공개된 프로퍼티는 아니다.
=> 그래서 직접적으로 접근하거나 호출할 수 있는 방법을 제공하진 않음, 단 일부 내부 슬롯과 내부 메서드에 한해 간접적으로 접근할 수 있다.
how?
언더바 2개로 감싸기
 */

//1. 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체
/*
자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.
    프로퍼티 어트리뷰트란? 프로퍼티의 값, 값의 갱신 가능 여부, 열거 가능 여부, 재정의 가능 여부 등
    [[value]], [[Writable]], [[Enumerable]], [[Configurable]]

프로퍼티 어트리뷰트는 직접 접근할 수는 없지만, Object.getOwnPropertyDescripter 메서드를 사용해 간접적으로 확인할 수 있다.
 */
const Person = {
    name: 'lee'
};
console.log(Object.getOwnPropertyDescriptor(Person, 'name'))    // { value: 'lee', writable: true, enumerable: true, configurable: true }
/*
이 출력 결과물은 '프로퍼티 디스크립터 객체'이다.
getOwnPropertyDescriptors 는 '모든 프로퍼티'의 '프로퍼티 어트리뷰트 정보'를 담고 있는 '프로퍼티 디스크립터 객체들'을 반환한다.
 */

//2. 데이터 프로퍼티와 접근자 프로퍼티
/*
프로퍼티는 두 종류로 나눌 수 있다
- 데이터 프로퍼티
    키와 값으로 구성된 일반적인 프로퍼티, 지금껏 봐온 모든 프로퍼티들
- 접근자 프로퍼티
    자체적으로 값을 갖지 않음, 다른 데이터 프로퍼티 값을 읽거나 저장할 때 호출되는 '접근자 함수'로 구성된 프로퍼티.
 */

//2-1. 데이터 프로퍼티
/*
자바스크립트 엔진이 프로퍼티를 생성할 때 기본값으로 자동 정의된다.
<프로퍼티 어트리뷰트>
- [[value]] : 접근자 프로퍼티를 통해 값에 접근하면 반환되는 값, 값을 변경하면 재할당된다.
- [[Writable]] : 프로퍼티 값의 변경 가능 여부
- [[Enumerable]] : 프로퍼티의 열거 가능 여부
- [[Configurable]] : 프로퍼티의 재정의 가능 여부, false면 재정의(프로퍼티 삭제, 어트리뷰트 값 변경 등) 불가, 단 writable: true 면,
                        1. 프로퍼티 값([[Value]]) 변경 가능(writable: true)
                        2. [[writable]] 을 false로 변경 가능함
 */

//2-2. 접근자 프로퍼티
/*
자체적으로 값을 가지지 않음, 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티
<프로퍼티 어트리뷰트>
- [[Get]] : 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출된다. -> 접근자 프로퍼티 키로 프로퍼티 값에 접근하면, getter 함수가 호출되고 그 결과가 프로퍼티의 값으로 반환
- [[Set]] : 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출된다 -> 접근자 프로퍼티 키로 프로퍼티 값을 저장하면, setter 함수가 호출되고 그 결과가 프로퍼티의 값으로 저장
- [[Enumerable]]
- [[Configurable]]
 */
const person = {
    firstName: 'gyuri',
    lastName: 'kim',

    get fullName(){     // [[Get]] : 프로퍼티 값을 읽는다
        return `${this.firstName} ${this.lastName}`;
    },

    set fullName(name){     // [[Set]] : 프로퍼티 값을 변경한다
        [this.firstName, this.lastName] = name.split(' ');
    }
};
console.log(person.firstName + ' ' + person.lastName);
console.log(person.fullName);                           //위와 아래는 같은 결과

person.fullName = 'jaeheon kim';
console.log(person);                // { firstName: 'jaeheon', lastName: 'kim', fullName: [Getter/Setter] }
console.log(person.fullName);       // jaeheon kim

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName'); // { value: 'jaeheon', writable: true, enumerable: true, configurable: true }
console.log(descriptor);

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');      // { get: [Function: get fullName], set: [Function: set fullName], enumerable: true, configurable: true }
console.log(descriptor);
/*
여기서 get과 set이 바로 접근자 프로퍼티 어트리뷰트! 자체적으로 값을 가지지 않으며([[Value]]가 없다) 데이터 프로퍼티의 값을 읽거나 저장할 때 관여한다.

접근자 프로퍼티 fullName으로 프로퍼티 값에 접근하면 내부적으로 get 메소드가 호출되는데, 이 과정을 내부 슬롯/메서드 관점에서 설명하면?
    1. 프로퍼티 키가 유효한지 확인한다. 프로퍼티 키가 문자열이나 심벌 -> 유효함
    2. **프로토타입 체인에서 프로퍼티를 검색 -> person 객체의 fullName 프로퍼티 발견!
    3. 검색한 프로퍼티가 데이터 프로퍼티인지, 접근자 프로퍼티인지 확인
    4. 접근자 프로퍼티 fullName의 프로퍼티 어트리뷰트 [[Get]]의 값(=getter) 함수를 호출하여 그 결과를 반환함
 */
/*
Q. 프로토타입? 프로토타입 체인?
A. 프로토타입은 어떤 객체의 상위 객체 역할을 하는 객체다. -> 자식 객체에게 자신의 프로퍼티와 메서드를 상속한다.
    프로토타입 체인은 프로토타입이 단방향 링크드 리스트 형태로 연결되어 있는 상속 구조이다. 따라서 해당 객체에 접근하려는 프로퍼티나 메서드가 없으면, 프로토타입 체인을 따라 차례대로 검색한다.
 */

//3. 프로퍼티 정의
/*
프로퍼티 정의란?
- 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의
- 새로운 프로퍼티를 추가하면서 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것
Object.defineProperty 메서드를 이용하면 프로퍼티 어트리뷰트 정의할 수 있음. <- 인수는 (객체의 참조, 데이터 프로퍼티의 키, {프로퍼티 디스크립터 객체})
Object.defineProperties 메서드를 이용하면 여러 개의 프로퍼티와 어트리뷰트 정의 가능함 <- 인수는 (객체의 참조, {데이터 프로퍼티의 키 {프로퍼티 디스크립터 객체}, ...}

프로퍼티 디스크립터 객체에서 value, writable, get, set, enumerable, configurable 정의하지 않으면?
- [[Value]] : undefined
- [[Get]] : undefined
- [[Set]] : undefined
- [[Writable]] : false
- [[Enumerable]] : false
- [[Configurable]] : false
 */
const human = {};
Object.defineProperty(human, 'firstName', {
    value: 'Gyuri',
    writable: true,
    enumerable: true,
    configurable: true
});
Object.defineProperty(human, 'lastName', {  //정의하지 않으면 기본값 false, 118번째 줄 확인
    value: 'Kim'
});
descriptor = Object.getOwnPropertyDescriptor(human, 'firstName');   // { value: 'Gyuri', writable: true, enumerable: true, configurable: true }
console.log(descriptor);

descriptor = Object.getOwnPropertyDescriptor(human, 'lastName');    // { value: 'Kim', writable: false, enumerable: false, configurable: false }
console.log(descriptor);

console.log(Object.keys(human));    // [ 'firstName' ], 'lastName' 프로퍼티는 어트리뷰트[[Enumerable]]에서 false로 되어있기 때문에 나열되지 않음

human.lastName = 'Lee';        // value 변경 안됨, writable: false이기 때문
delete human.lastName;         // 삭제 안됨, configurable: false이기 때문
descriptor = Object.getOwnPropertyDescriptor(human, 'lastName');
console.log(descriptor);        //{ value: 'Kim', writable: false, enumerable: false, configurable: false } 그대로 출력된다.

Object.defineProperty(human, 'fullName', {
    get() {
        return `${this.firstName} ${this.lastName}`;
    },
    set(name) {
        [this.firstName, this.lastName] = name.split(' ');
    },
    enumerable: true,
    configurable: true
});

descriptor = Object.getOwnPropertyDescriptor(human, 'fullName');      // { get: [Function: get fullName], set: [Function: set fullName], enumerable: true, configurable: true }
console.log(descriptor);
human.fullName = 'Jaeheon Kim';       // { firstName: 'Jaeheon', fullName: [Getter/Setter] }
console.log(human);

//4. 객체 변경 금지
/*
객체는 변경 가능한 값이기 때문에 재할당이 없어도 값을 바꿀 수 있음
-> 프로퍼티 추가/삭제 가능
-> 프로퍼티 값 갱신 가능
-> defineProperty, defineProperties 메서드를 사용하여 재정의 가능

이에 객체 변경을 방지하는 메서드도 존재한다!!
- 객체 확장 금지 (Object.preventExtension())
- 객체 밀봉      (Object.seal())
- 객체 동결      (Object.freeze())
 */

//4-1. 객체 확장 금지 Object.preventExtension()
/*
확장을 금지하기 때문에 프로퍼티 추가만 금지
삭제, 값 읽기, 값 쓰기, 어트리뷰트 재정의는 가능하다
Object.isExtensible() 메서드를 이용해 확장 가능한 객체인지 확인함
 */

//4-2. 객체 밀봉 Object.seal()
/*
밀봉했기 때문에 프로퍼티 추가, 삭제, 프로퍼티 어트리뷰트 재설정 불가능
읽기와 쓰기만 가능함!! 나머지 기능은 다 밀봉
Object.isSealed() 메서드로 밀봉된 객체인지 확인함
 */

//4-3. 객체 동결 Object.freeze()
/*
객체를 얼려버린 것, 프로퍼티 추가, 삭제, 어트리뷰트 재설정, 쓰기 불가능함
오직 읽기만 가능!! 나머지는 다 얼려버렷
Object.isFrozen() 메서드로 동결된 객체인지 확인 가능함
 */

//5. 불변 객체
/*
위의 변경 방지 메서드(preventExtension, seal, freeze)는 얕은 변경 방지이다. 따라서 직속 프로퍼티만 변경이 방지되고, 중첩 객체까지는 영향을 주지 못한다.
가장 강력한(!!) freeze 메서드도 객체를 동결할 순 있지만 중첩 객체까지 동결하진 못한다.
 */
const my_human = {
    name: 'Kim',
    address: {city: 'seoul'}    //객체 안에 객체가 중첩된 상황이다.
};
Object.freeze(my_human)     //객체 동결을 진행, my_human은 이제 읽기만 가능하다.
console.log(Object.isFrozen(my_human));         //true
console.log(Object.isFrozen(my_human.address)); //false

my_human.address.city = 'Gwangmyeong';
console.log(my_human);      // { name: 'Kim', address: { city: 'Gwangmyeong' } }    //freeze했지만, address 프로퍼티의 값이 변경되었음(중첩객체는 freeze되지 않았다)
/*
그럼 어떻게 해야 중첩 객체까지 동결할 수 있을까?
재귀적으로 Object.freeze 메서드를 호출해야 한다..
 */

function deepFreeze(target){
    // 타겟이 비어있지 않고, 그 타겟의 타입이 객체이고, 객체가 동결되지 않은 것만
    if(target && typeof target === 'object' && !Object.isFrozen(target)){
        Object.freeze(target);  //동결하겠다.
        Object.keys(target).forEach(key => deepFreeze(target[key]));    //현재 객체의 키값을 이용, 값에 접근하여 재귀함수
    }
    return target;
}
const notFrozenHuman = {
    name: 'Kim',
    address: {city: 'seoul'}    //객체 안에 객체가 중첩된 상황이다.
};
deepFreeze(notFrozenHuman);
console.log(Object.isFrozen(notFrozenHuman));         //true
console.log(Object.isFrozen(notFrozenHuman.address)); //true
notFrozenHuman.address.city = 'Gwangmyeong';
console.log(notFrozenHuman);        //{ name: 'Kim', address: { city: 'seoul' } }, city의 내용이 바뀌지 않았다(freeze했으니깐)