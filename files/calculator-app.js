var Calc = /** @class */ (function () {
    function Calc() {
        this.step = 'enter first number';
        this.answer = 0;
        this.screenValue = '';
        this.previousSymbol = '';
        this.periodIsPressed = false;
        this.endOfcalculation = true;
        this.acceptedValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
        this.acceptedOperators = ['+', '-', '*', '/', '='];
        this.acceptedFunctions = ['Delete', 'Backspace'];
    }
    Calc.prototype.restrictValues = function (num) {
        if (num == '0' && this.screenValue == '0') {
            return true;
        }
        if (this.screenValue.length >= 16) {
            return true;
        }
        if (num == '.' && this.periodIsPressed) {
            return true;
        }
        if (num == '.') {
            this.periodIsPressed = true;
        }
    };
    Calc.prototype.setValue = function (num) {
        if (this.restrictValues(num)) {
            return;
        }
        if (this.endOfcalculation) {
            this.endOfcalculation = false;
        }
        this.screenValue += num;
        if (this.screenValue == '.') {
            this.screenValue = '0.';
        }
        this.setMainScreen();
    };
    Calc.prototype.validateKeyboardInput = function (key) {
        var _this = this;
        this.acceptedValues.forEach(function (v) {
            if (v == key) {
                _this.setValue(key);
            }
        });
        this.acceptedOperators.forEach(function (o) {
            if (o == key) {
                _this.calculate(key);
            }
        });
        this.acceptedFunctions.forEach(function (f) {
            if (f == key) {
                _this.runFunction(key);
            }
        });
    };
    Calc.prototype.setKeyInput = function () {
        var _this = this;
        document.onkeyup = function (keyEvent) {
            var key = keyEvent.key;
            _this.validateKeyboardInput(key);
        };
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
            if (this.answer == 0 && value == 0) {
                this.answer = Infinity;
                return;
            }
            this.answer /= value;
        }
        this.answer = parseFloat(this.answer.toPrecision(8));
    };
    Calc.prototype.restrictCalculation = function (operation) {
        if (this.endOfcalculation) {
            return true;
        }
        if (operation == '=' && this.step == 'enter first number') {
            return true;
        }
        if (this.screenValue == '') {
            if (operation == '=') {
                this.runEquals();
                return true;
            }
            else {
                this.previousSymbol = operation;
                this.setAnswerScreen();
                return true;
            }
        }
    };
    Calc.prototype.calculate = function (operation) {
        if (this.restrictCalculation(operation)) {
            return;
        }
        if (this.step == 'enter first number') {
            this.answer = parseFloat(this.screenValue);
            this.previousSymbol = operation;
            this.step = 'enter next number';
            this.clearScreenForNextNum();
            return;
        }
        if (operation == '=') {
            this.runOperation();
            this.runEquals();
            return;
        }
        if (this.step == 'enter next number') {
            this.runOperation();
            if (!isFinite(this.answer)) {
                this.runEquals();
                return;
            }
            this.previousSymbol = operation;
            this.clearScreenForNextNum();
        }
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
        }
        if (functions == 'Backspace') {
            this.clearEntry();
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
        this.endOfcalculation = true;
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
