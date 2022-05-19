//제어문
//코드블록을 실행하거나 반복할 때 사용, 인위적으로 코드의 실행 흐름을 제어할 수 있음

//코드 블록
//0개 이상의 문을 중괄호로 묶은 것{}
//문의 끝에는 세미콜론을 붙이지만, 블록문은 자체 종결성을 갖기 때문에 세미콜론을 붙이지 않는다

//조건문
//조건식(불리언 값으로 평가될 수 있는 식)의 결과에 따라 코드 블록의 실행을 결정
//if문 - 논리적으로 참/거짓인 상황에서 사용
var num = 2;
if(num > 0){
    console.log(`${num}은 양수`);
}
else if(num < 0){
    console.log(`${num}은 음수`);
}
else{       //num=0
    console.log(`${num}은 양수도 음수도 아니다`);
}
//위의 if문과 같은 의미의 삼항연산자
var kind = num? (num>0? '양수' : '음수') : '양수도 음수도 아님';    //num이 0이면 false, 0이 아니면 true이기 때문이다.
console.log(num + "은" + kind);
console.log('---------');
//switch문 - 문자열, 숫자같은 다양한 상황(case)에 따라 실행여부 결정
var year = 1600;
var month = 2;
var day = 0;

switch (month){
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        day = 31;
        break;
    case 4: case 6: case 9: case 11:
        day = 30;
        break;
    case 2:
        ((year%4 === 0 && year%100 !== 0) || year%400 === 0)? day=29 : day=28;
}
console.log(`${year}년의 ${month}월은 ${day}일까지 있습니다.`);
console.log('----------');


//반복문
//조건식의 평가 결과가 참인 경우 실행, 조건문이 거짓이 될때까지 반복된다.
//for문 - 반복 횟수가 명확할 때 ex)배열이 끝날 때까지
//while문 - 반복 횟수가 불명확할 때 ex)사용자가 stop을 누를 때까지
//do while문 - 일단 코드블록을 한 번 실행 후 조건식을 평가한다

//break
//코드 블록을 탈출하기 위해 사용된다. (정확히는 레이블문, 반복문, switch문)    ->레이블문은 가독성을 떨어트리므로 웬만하면 사용하지 말자
var str = 'hello world';
var search = 'l';
var idx = null;

for(var i=0; i<str.length; i++){
    if(str[i] === search){
        idx = i;
        break;
    }
}
console.log("l의 인덱스는", idx, "입니다.");
//위의 문과 같은 내용
console.log("l의 인덱스는", str.indexOf('search'), "입니다.");