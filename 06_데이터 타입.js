//숫자 타입
//배정밀도 64비트 부동소수점 형식을 따른다. -> 정수도 실수로 표현한다.
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