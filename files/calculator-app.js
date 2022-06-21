var Calc = /** @class */ (function () {
    function Calc() {
    }
    Calc.numberInput = function (num) {
        this.screenValue += num;
        this.setMainScreen();
    };
    Calc.keyInput = function () {
        var _this = this;
        var key = this.getScreenValue();
        var screen = document.getElementById('screen');
        screen.addEventListener('keydown', function (event) {
            switch (event.code) {
                case 'Digit1' || 'Digit9':
                    _this.numberInput('1');
                    break;
                case 'Digit2':
                    _this.numberInput('2');
                    break;
                case 'Digit3':
                    _this.numberInput('3');
                    break;
                case 'Digit4':
                    _this.numberInput('4');
                    break;
                case 'Digit5':
                    _this.numberInput('5');
                    break;
            }
        });
    };
    Calc.clearScreen = function () {
        this.screenValue = '';
        this.setMainScreen('');
        this.setAnswerScreen(this.answer);
    };
    Calc.runOperation = function (operation) {
        var value = parseFloat(this.screenValue);
        if (operation == 'add') {
            this.answer += value;
        }
        if (operation == 'minus') {
            this.answer -= value;
        }
        if (operation == 'times') {
            this.answer *= value;
        }
        if (operation == 'divide') {
            this.answer /= value;
            if (this.answer == Infinity) {
                this.previousSymbol = '';
                this.setAnswerScreen();
            }
        }
    };
    Calc.calculate = function (operation) {
        if (this.screenValue == '') {
            this.previousSymbol = operation;
            this.setAnswerScreen();
            return;
        }
        if (this.step == 'enter first number') {
            this.answer = parseFloat(this.screenValue);
            this.previousSymbol = operation;
            this.step = 'enter second number';
        }
        else if (this.step == 'enter second number') {
            this.runOperation(this.previousSymbol);
            this.previousSymbol = operation;
            this.step = 'repeat';
        }
        else if (this.step == 'repeat') {
            this.runOperation(this.previousSymbol);
            this.previousSymbol = operation;
            this.step = 'enter second number';
        }
        this.clearScreen();
        if (operation == 'equals') {
            this.equals();
        }
    };
    Calc.equals = function () {
        var finalAnswer = this.answer;
        this.clearAll();
        this.setMainScreen(finalAnswer);
    };
    Calc.clearEntry = function () {
        this.screenValue = '';
        this.setMainScreen();
    };
    Calc.clearAll = function () {
        this.step = 'enter first number';
        this.previousSymbol = '';
        this.answer = 0;
        this.clearEntry();
        this.setAnswerScreen('');
    };
    Calc.setMainScreen = function (value) {
        if (value === void 0) { value = this.screenValue; }
        document.getElementById('screen').value = value + '';
    };
    Calc.setAnswerScreen = function (value) {
        if (value === void 0) { value = this.answer; }
        document.getElementById('answer').innerHTML = value + '   ' + this.previousSymbol;
    };
    Calc.getScreenValue = function () {
        return document.getElementById('screen').value;
    };
    Calc.step = 'enter first number';
    Calc.answer = 0;
    Calc.screenValue = '';
    Calc.previousSymbol = '';
    return Calc;
}());
