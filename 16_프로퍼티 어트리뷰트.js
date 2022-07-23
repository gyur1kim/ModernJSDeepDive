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
위에서 본 4개! 프로퍼티 어트리뷰트
자바스크립트 엔진이 프로퍼티를 생성할 때 기본값으로 자동 정의된다.
- [[value]] : 접근자 프로퍼티를 통해 값에 접근하면 반환되는 값, 값을 변경하면 재할당된다.
- [[Writable]] : 프로퍼티 값의 변경 가능 여부
- [[Enumerable]] : 프로퍼티의 열거 가능 여부
- [[Configurable]] : 프로퍼티의 재정의 가능 여부, false면 재정의(프로퍼티 삭제, 어트리뷰트 값 변경) 불가, 단 writable==true 면,
                        1. 프로퍼티 값([[Value]]) 변경 가능(writable == true)
                        2. [[writable]] 을 false로 변경 가능함
 */
//2-2. 접근자 프로퍼티
/*
자체적으로 값을 가지지 않음, 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티
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

 */