//js는 객체 기반의 프로그리맹 언어
//언시 값을 제이한 나머지 값은 모두 객체
//0개 이상의 프로퍼티로 구성된 집합, 프로퍼티는 키와 값으로 구성

//다양한 객체생성 방법
//객체 리터럴
var person = {
    name: '김규리',
    age: 25,
    greet: function(){
        console.log(`안녕하세요, ${name}입니다`);
    }
};
console.log(person);