//js는 객체 기반의 프로그리맹 언어
//언시 값을 제이한 나머지 값은 모두 객체
//0개 이상의 프로퍼티로 구성된 집합, 프로퍼티는 키와 값으로 구성

//다양한 객체생성 방법
//객체 리터럴
var person = {
    name: '김규리',
    age: 25,
    greet: function(){
        console.log(`안녕하세요, ${this.name}입니다`);
    }
};
console.log(person);
person.greet();

//프로퍼티 값에 접근하는 방법은
//마침표 표기법
//대괄호 표기법
var circle = {
    radius: 5,
    getDiameter: function(){
        return this.radius * 2;
    }
};
//마침표 표기법
console.log(circle.getDiameter());
//대괄호 표기법
console.log(circle['getDiameter']);

//이 때, 접근하고자 하는 키를 따옴표로 감싸야 한다
//그러면 프로퍼티 키가 아니라 식별자로 해석하기 때문!
//프로퍼티 키가 숫자면 '마침표 표기법'으로 접근 불가능
//대괄호 표기법으로만 접근 가능하다, 따옴표 생략 가능
var person2 = {
    'last-name': 'Gyuri',
    1 : 25
};

//console.log(person2.'last-name');    //unexpected string
//console.log(person2.last-name);        //ReferenceError
//console.log(person2[last-name]);         //SyntaxError
console.log(person2['last-name']);

//console.log(person2.1);                   //unexpected number
//console.log(person2.'1');                 //unexpected string
console.log(person2[1]);
console.log(person2['1']);