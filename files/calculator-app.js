var Calc = /** @class */ (function () {
    function Calc() {
        this.step = 'enter first number';
        this.answer = 0;
        this.screenValue = '';
        this.periodIsPressed = false;
        this.acceptedValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
        this.acceptedOperators = ['+', '-', '*', '/', '=', 'Enter'];
    }
    Calc.prototype.setNumber = function (num) {
        if (this.checkForPeriod(num)) {
            return;
        }
        this.screenValue += num;
        this.setMainScreen();
    };
    Calc.prototype.setKeyInput = function () {
        var _this = this;
        document.onkeyup = function (keyEvent) {
            var key = keyEvent.key;
            _this.acceptedValues.forEach(function (v) {
                if (v == key) {
                    _this.setNumber(key);
                }
            });
            _this.acceptedOperators.forEach(function (o) {
                if (o == key) {
                    _this.calculate(key);
                }
            });
        };
    };
    Calc.prototype.checkForPeriod = function (num) {
        if (num == '.') {
            if (this.periodIsPressed) {
                return true;
            }
            else {
                this.periodIsPressed = true;
                return false;
            }
        }
    };
    Calc.prototype.clearScreenForNextNum = function () {
        this.clearEntry();
        this.setAnswerScreen(this.answer);
    };
    Calc.prototype.runOperation = function (operation) {
        var value = parseFloat(this.screenValue);
        if (operation == '+') {
            this.answer += value;
        }
        if (operation == '-') {
            this.answer -= value;
        }
        if (operation == '*') {
            this.answer *= value;
        }
        if (operation == '/') {
            this.answer /= value;
        }
    };
    Calc.prototype.calculate = function (operation) {
        if (this.screenValue == '') {
            this.previousSymbol = operation;
            this.setAnswerScreen();
            return;
        }
        if (this.step == 'enter first number') {
            this.answer = parseFloat(this.screenValue);
            this.previousSymbol = operation;
            this.step = 'enter next number';
        }
        else if (this.step == 'enter next number') {
            this.runOperation(this.previousSymbol);
            this.previousSymbol = operation;
            this.step = 'repeat';
        }
        else if (this.step == 'repeat') {
            this.runOperation(this.previousSymbol);
            this.previousSymbol = operation;
            this.step = 'enter next number';
        }
        this.clearScreenForNextNum();
        if (operation == '=' || operation == 'Enter') {
            this.equals();
        }
    };
    Calc.prototype.equals = function () {
        var finalAnswer = this.answer;
        this.clearAll();
        this.setMainScreen(finalAnswer);
    };
    Calc.prototype.clearEntry = function () {
        this.periodIsPressed = false;
        this.screenValue = '';
        this.setMainScreen();
    };
    Calc.prototype.clearAll = function () {
        this.step = 'enter first number';
        this.previousSymbol = '';
        this.answer = 0;
        this.clearEntry();
        this.setAnswerScreen('');
    };
    Calc.prototype.setMainScreen = function (value) {
        if (value === void 0) { value = this.screenValue; }
        document.getElementById('screen').value = value + '';
    };
    Calc.prototype.setAnswerScreen = function (value) {
        if (value === void 0) { value = this.answer; }
        if (this.previousSymbol == 'Enter' || this.previousSymbol == '=') {
            this.previousSymbol = '';
        }
        document.getElementById('answer').innerHTML = value + ' ' + this.previousSymbol;
    };
    Calc.prototype.getScreenValue = function () {
        return document.getElementById('screen').value;
    };
    return Calc;
}());
var c = new Calc();
