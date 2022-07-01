var Converter = /** @class */ (function () {
    function Converter() {
        this.displayValue = '';
        this.answerDisplayMesseage = '';
        this.unit1 = '';
        this.unit2 = '';
        this.steps = 'select first unit';
        //steps:string= 'type a value';
        this.result = 0;
        this.validNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
        this.validValues = ['Delete', 'Backspace', '=', 'c', 'm'];
        this.periodIsFound = false;
    }
    Converter.prototype.restrictNumberInput = function (num) {
        if (this.displayValue == '0' && num == '0') {
            return true;
        }
        if (this.periodIsFound && num == '.') {
            return true;
        }
        if (num == '.' && !this.periodIsFound) {
            this.periodIsFound = true;
        }
        if (this.steps != 'type a value') {
            return true;
        }
        if (this.displayValue.length >= 15) {
            return true;
        }
    };
    Converter.prototype.getNumberInput = function (num) {
        if (this.restrictNumberInput(num)) {
            return;
        }
        this.displayValue += num;
        if (this.displayValue == '.') {
            this.displayValue = '0.';
        }
        this.setDisplay();
    };
    Converter.prototype.getValues = function (val) {
        if (val == 'Delete') {
            this.clearAll();
        }
        if (val == 'Backspace') {
            this.clearDisplay();
        }
        if (val == '=') {
            this.run('convert');
        }
        if (val == 'c') {
            this.run('cm');
        }
        if (val == 'm') {
            this.run('m');
        }
    };
    Converter.prototype.filterKeyValues = function (key) {
        var _this = this;
        this.validNumbers.forEach(function (n) {
            if (n == key) {
                _this.getNumberInput(key);
            }
        });
        this.validValues.forEach(function (v) {
            if (v == key) {
                _this.getValues(key);
            }
        });
    };
    Converter.prototype.getKeyValues = function () {
        var _this = this;
        document.onkeyup = function (keyEvent) {
            var key = keyEvent.key;
            _this.filterKeyValues(key);
        };
    };
    Converter.prototype.restrictRun = function (unit) {
        console.log('restrictRun' + unit);
        if (unit == 'convert') {
            if (this.displayValue == '' || this.steps != 'type a value') {
                return true;
            }
        }
        if (this.unit1 == unit) {
            return true;
        }
    };
    Converter.prototype.run = function (unit) {
        if (this.restrictRun(unit)) {
            return;
        }
        if (this.steps == 'select first unit') {
            this.unit1 = unit;
            this.steps = 'select 2nd unit';
            this.answerDisplayMesseage = this.unit1 + ' selected';
            this.clearDisplayForNextStep();
            return;
        }
        if (this.steps == 'select 2nd unit') {
            this.unit2 = unit;
            this.steps = 'type a value';
            this.answerDisplayMesseage = 'convert ' + this.unit1 + ' to ' + this.unit2;
            this.clearDisplayForNextStep();
            return;
        }
        if (unit == 'convert') {
            this.convert();
        }
    };
    Converter.prototype.doConversion = function () {
        var num = parseFloat(this.displayValue);
        if (this.unit1 == 'cm' && this.unit2 == 'm') {
            this.result = num / 100;
        }
        if (this.unit1 == 'm' && this.unit2 == 'cm') {
            this.result = num * 100;
        }
        this.result = parseFloat(this.result.toPrecision(4));
    };
    Converter.prototype.convert = function () {
        this.doConversion();
        var result = this.result + this.unit2;
        this.clearAll();
        this.setDisplay(result);
    };
    Converter.prototype.clearDisplayForNextStep = function () {
        this.setAnswerDisplay();
        this.clearDisplay();
        this.setDisplayPlaceholder();
    };
    Converter.prototype.clearDisplay = function () {
        this.displayValue = '';
        this.periodIsFound = false;
        this.setDisplay();
    };
    Converter.prototype.clearAll = function () {
        this.steps = 'select first unit';
        this.unit1 = '';
        this.unit2 = '';
        this.result = 0;
        this.displayValue = '';
        this.answerDisplayMesseage = '';
        this.setAnswerDisplay();
        this.setDisplay();
        this.setDisplayPlaceholder();
    };
    Converter.prototype.setAnswerDisplay = function (value) {
        if (value === void 0) { value = this.answerDisplayMesseage; }
        document.getElementById('answerDisplay').innerHTML = value + '';
    };
    Converter.prototype.setDisplay = function (value) {
        if (value === void 0) { value = this.displayValue; }
        document.getElementById('display').value = value + '';
    };
    Converter.prototype.setDisplayPlaceholder = function (value) {
        if (value === void 0) { value = this.steps; }
        document.getElementById('display').placeholder = value + '';
    };
    return Converter;
}());
var c = new Converter();
