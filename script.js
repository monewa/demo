var Calc = /** @class */ (function () {
    function Calc() {
    }
    Calc.input = function (num) {
        Calc.answerStr += num;
        this.setMainScreen(Calc.answerStr);
    };
    /* 	static inputKey(num:string){
            Calc.answerStr+=num;
            this.setMainScreen(Calc.answerStr);
        } */
    Calc.clearScreen = function () {
        document.getElementById('screen').value = '';
        Calc.answerStr = '';
        this.setMainScreen('');
    };
    Calc.clearAll = function () {
        Calc.answerStr = '';
        Calc.answer = 0;
        this.setMainScreen('');
        this.setAnswerScreen();
    };
    /* 	static consoleLog(log:any){
            document.getElementById('console').innerHTML=log+''
        } */
    Calc.calculate = function (operation) {
        var screenValue = document.getElementById('screen').value;
        if (operation == '+') {
            Calc.answer += parseInt(screenValue);
        }
        if (operation == '-') {
            Calc.answer -= parseInt(screenValue);
        }
        if (operation == 'x') {
            Calc.answer *= parseInt(screenValue);
        }
        if (operation == '/') {
            Calc.answer /= parseInt(screenValue);
        }
        Calc.answerStr = '0';
        this.setMainScreen('');
        this.setAnswerScreen();
    };
    Calc.setMainScreen = function (num) {
        document.getElementById('screen').value = num + '';
    };
    Calc.setAnswerScreen = function () {
        document.getElementById('answer').innerHTML = Calc.answer + '';
    };
    Calc.answer = 0;
    Calc.answerStr = '';
    Calc.screen2 = document.getElementById('screen');
    Calc.screen = document.getElementById('screen');
    return Calc;
}());
