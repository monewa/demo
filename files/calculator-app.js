var Calc = /** @class */ (function () {
    function Calc() {
        this.step = 'enter first number';
        this.answer = 0;
        this.screenValue = '';
        this.periodIsPressed = false;
        this.acceptedValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
        this.acceptedOperators = ['+', '-', '*', '/', '=', 'Enter'];
        this.acceptedFunctions = ['Delete', 'Backspace'];
    }
    Calc.prototype.setValue = function (num) {
        if (this.moreThanOnePeriod(num)) {
            return;
        }
        this.screenValue += num;
        this.setMainScreen();
    };
    Calc.prototype.validateValue = function (key) {
        var isValid = false;
        this.acceptedValues.forEach(function (v) {
            if (v == key) {
                isValid = true;
            }
        });
        return isValid;
    };
    Calc.prototype.validateOperator = function (key) {
        var isValid = false;
        this.acceptedOperators.forEach(function (o) {
            if (o == key) {
                isValid = true;
            }
        });
        return isValid;
    };
    Calc.prototype.validateFunctions = function (key) {
        var isValid = false;
        this.acceptedFunctions.forEach(function (f) {
            if (f == key) {
                isValid = true;
            }
        });
        return isValid;
    };
    Calc.prototype.setKeyInput = function () {
        var _this = this;
        document.onkeyup = function (keyEvent) {
            var key = keyEvent.key;
            if (_this.validateValue(key)) {
                _this.setValue(key);
            }
            else if (_this.validateOperator(key)) {
                _this.calculate(key);
            }
            else if (_this.validateFunctions(key)) {
                _this.runFunction(key);
            }
        };
    };
    Calc.prototype.moreThanOnePeriod = function (num) {
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
        this.setAnswerScreen();
    };
    Calc.prototype.runOperation = function () {
        var value = parseFloat(this.screenValue);
        if (this.previousSymbol == '+') {
            this.answer += value;
        }
        if (this.previousSymbol == '-') {
            this.answer -= value;
        }
        if (this.previousSymbol == '*') {
            this.answer *= value;
        }
        if (this.previousSymbol == '/') {
            this.answer /= value;
        }
    };
    Calc.prototype.moreThanOneOperator = function (operation) {
        if (this.screenValue == '') {
            if (operation == '=' || operation == 'Enter') {
                return false;
            }
            this.previousSymbol = operation;
            this.setAnswerScreen();
            return true;
        }
    };
    Calc.prototype.calculate = function (operation) {
        if (this.moreThanOneOperator(operation)) {
            console.log('more.ans ' + this.answer);
            if (operation == '=' || operation == 'Enter') {
                console.log('eq .ans ' + this.answer);
                this.runEquals();
            }
            return;
        }
        if (this.step == 'enter first number') {
            this.answer = parseFloat(this.screenValue);
            this.previousSymbol = operation;
            this.step = 'enter next number';
            this.clearScreenForNextNum();
        }
        else if (this.step == 'enter next number') {
            console.log('nxt .ans ' + this.answer);
            this.runOperation();
            this.previousSymbol = operation;
            this.clearScreenForNextNum();
        }
        if (operation == '=' || operation == 'Enter') {
            console.log('eq2 ans ' + this.answer);
            this.runEquals();
        }
        console.log('end ans ' + this.answer);
    };
    Calc.prototype.runEquals = function () {
        if (this.step == 'enter next number') {
            var finalAnswer = this.answer;
            this.clearAll();
            this.setMainScreen(finalAnswer);
        }
    };
    Calc.prototype.runFunction = function (functions) {
        if (functions == 'Delete') {
            this.clearAll();
            return;
        }
        if (functions == 'Backspace') {
            this.clearEntry();
            return;
        }
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
        this.setAnswerScreen(' ');
    };
    Calc.prototype.setMainScreen = function (value) {
        if (value === void 0) { value = this.screenValue; }
        document.getElementById('screen').value = value + '';
    };
    Calc.prototype.setAnswerScreen = function (value) {
        if (value === void 0) { value = this.answer; }
        document.getElementById('answer').innerHTML = value + ' ' + this.previousSymbol;
    };
    return Calc;
}());
var c = new Calc();
