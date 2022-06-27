var Converter = /** @class */ (function () {
    function Converter() {
        this.displayValue = '';
        this.unit1 = '';
        this.unit2 = '';
        this.steps = 'select first unit';
        this.result = 0;
    }
    Converter.prototype.getNumberInput = function (val) {
        this.displayValue += val;
        this.setDisplay();
    };
    Converter.prototype.run = function (unit) {
        if (this.steps == 'select first unit') {
            this.unit1 = unit;
            this.steps = 'select 2nd unit';
            this.clearScreenForNextStep();
        }
        else if (this.steps == 'select 2nd unit') {
            this.clearScreenForNextStep();
            this.unit2 = unit;
            this.steps = 'type value';
        }
        else if (unit == 'convert') {
            //	this.result= parseFloat(this.displayValue);
            console.log('result:' + this.result);
            this.runConvert();
            this.setDisplay(this.result);
        }
        console.log('unit1:' + this.unit1 + '; unit2:' + this.unit2);
    };
    Converter.prototype.runConvert = function () {
        var num = parseFloat(this.displayValue);
        if (this.unit1 == 'cm' && this.unit2 == 'meter') {
            this.result = num * 100;
        }
        if (this.unit1 == 'meter' && this.unit2 == 'cm') {
            this.result = num / 100;
        }
    };
    Converter.prototype.clearScreenForNextStep = function () {
        this.setAnswerDisplay();
        this.clearDisplay();
        this.setDisplayPlaceholder();
    };
    Converter.prototype.clearDisplay = function () {
        this.displayValue = '';
        this.setDisplay();
    };
    Converter.prototype.clearAll = function () {
        this.steps = 'select first unit';
        this.unit1 = '';
        this.unit2 = '';
        this.result = 0;
        this.displayValue = '';
        this.setAnswerDisplay('');
        this.setDisplay();
        this.setDisplayPlaceholder();
    };
    Converter.prototype.setAnswerDisplay = function (value) {
        if (value === void 0) { value = this.result; }
        document.getElementById('answerDisplay').innerHTML = value + ' ' + this.unit1 + ' to ' + this.unit2;
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
