//원시 타입과 객체 타입의 다른 점
/*
1. 원시타입은 변경 불가능한 값
   객체 타입은 변경 가능한 값
2. 원시 값은 변수에 실제 값이 저장
   객체는 변수에 참조 값이 저장됨
3. 원시 값을 갖는 변수를 다른 변수에 할당하면 값이 복사되어 전달
   객체 값을 갖는 변수를 다른 변수에 할당하면 원본의 참조 값이 복사되어 전달
*/

//원시 타입(immutable)
/*
변수 : 값을 저장하기 위해 확보한 메모리 공간
값 : 표현식을 평가해 생성된 결과
=> 따라서 변수에 할당된 값을 변경할 순 있지만, 값 자체를 변경하는 것은 불가능하다!! 변수!=값

4장에서 1. 변수를 선언하면 메모리에 공간이 생기고, 2. 값을 할당하면 메모리의 새로운 공간을 확보한다고 했다! 3. 변수를 재할당하면 메모리의 새로운 공간을 확보함
변수에 할당된 원시 값은 변경 불가능하기 때문이다

변수에 원시 값을 갖는 변수를 할당하면 copy에는 원래 변수의 원시 값이 복사되어 전달된다.(=값에 의한 전달)
다른 메모리 공간에 저장된 별개의 값임 => 원래 변수가 변해도 copy변수에는 아무런 영향도 없음.
**정확히 말하면 값이 전달되는 것이 아니라 값이 들어있는 주소가 변수에 전달된다.
  하지만 원시값은 다른 메모리 공간에 들어있는 것이고, 각자 다른 주소를 가지게 되는 것이다!
 */
var a = 80;
var b = a;
console.log(a, b);  //80 80
a = 100;
console.log(a, b);  //100 80


//객체 타입(mutable)
/*
객체는 원시 값과 같이 확보해야 할 메모리 공간의 크기를 사전에 정해둘 수 없다.
프로퍼티 개수가 정해져있지 않고 동적으로 추가되고 삭제되기 때문
그래서 객체는 원시 값과 다른 방식으로 동작한다.

객체 타입은 원시타입과 달리 변경 가능하다 =mutable
변수에 객체를 할당하면, 주소가 저장되는데 어떤 주소냐!!
원시값과 다르게 참조 값의 주소다(=생성된 객체가 저장된 메모리 공간의 주소 그 자체)
그러니까 실제로 들어있는건 객체의 주소임. 참조 값을 통해 실제 객체에 접근
=> '변수는 **값을 갖는다'가 아니라 '변수는 객체를 참조한다'라고 표현

어차피 변수에는 객체의 주소가 들어있으므로, 객체를 변경해도 변수에 들어있는 주소값(참조값)이 변하는 것은 아니다!!
그래서 객체 타입은 변경 가능함, MUTABLE

그럼 객체가 들은 변수를 다른 변수에 저장한다면...?
여러 개의 식별자가 하나의 객체를 공유하게 된다!ㅜㅜ
 */

/*
얕은 복사와 깊은 복사로 생성된 객체는 원본과 다른 객체다.
얕은 복사 : 객체는 다르지만, 객체에 중첩되어 있는 객체는 참조값을 복사하게 되고(같은 주소를 공유)(=>살짝만 복사해서 깊이 들어있는 객체까지 완벽하게 복사하지는 못함)
깊은 복사 : 객체도 다르고, 객체에 중첩되어 있는 객체까지 모두 복사해서 '완전한 복사본'을 만든다.
 */
//얕은 복사
//한 단계만 복사하는 것
const o = {x : {y : 1}};
const c1 = {...o};
console.log(c1 === o);      //false
console.log(c1.x === o.x);  //true, 객체에 중첩되어있는 객체는 참조값을 복사했기 때문

//깊은 복사
//객체에 중첩되어 있는 객체까지 모두 복사
const _ = require('lodash');
const c2 = _.cloneDeep(o);
console.log(c2 === o);      //false
console.log(c2.x === o.x);  //false


//여러 개의 식별자가 하나의 객체를 공유한다는 것은?
var person = {
    name: 'kim'
};
var copy = person;      //얕은 복사, copy에는 객체가 아니라 객체의 참조값이 복사된다.
console.log(copy === person);    //true
copy.name = 'lee';
copy.address = 'gwangmyeong';    //객체 내용 변경
console.log(person);
console.log(copy);              //같은 결과가 나온다


//QUIZ!
var person1 = {
    name: 'lee'
};
var person2 = {
    name: 'lee'
};
console.log(person1 === person2);           //false : 이 둘은 별개의 참조값을 가지는 객체임. 내용은 같지만, 다른 곳에 저장된 객체다.
console.log(person1.name === person2.name); //true : 안의 내용은 평가식이다. 값은 둘 다 'lee'라는 원시값을 가진다.