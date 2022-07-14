/* import x from './mail-list.js' ;*/
//const { firstName } = data;
var User = /** @class */ (function () {
    function User(id, firstName, lastName, country, email, phone, comments) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.country = country;
        this.email = email;
        this.phone = phone;
        this.comments = comments;
    }
    return User;
}());
var MailList = /** @class */ (function () {
    function MailList() {
        //	url:string= 'http://localhost:3500/contacts/'
        this.url = 'mail-list.json';
        this.jsonRequest = new Request(this.url);
        this.users = this.getStaticData();
        //users:User[]= this.getLocal()
        this.nextUserId = this.users.length + 1;
        this.userIndex = 0;
    }
    MailList.prototype.startup = function () {
        this.printUsers();
        this.init();
    };
    MailList.prototype.preventForm = function () {
        var form = document.getElementById('form');
        form.addEventListener('submit', function (event) {
            event.preventDefault();
        });
    };
    MailList.prototype.validateForm = function () {
        if (this.checkFormValidity('name') || this.checkFormValidity('lastName') ||
            this.checkFormValidity('country') || this.checkFormValidity('email') ||
            this.checkFormValidity('phone') || this.checkFormValidity('code')) {
            return true;
        }
    };
    MailList.prototype.checkFormValidity = function (id) {
        var element = document.getElementById(id);
        if (!element.checkValidity()) {
            this.setElementColor('red');
            this.setElementBorderColor(id, 'red');
            this.setMessage(element.validationMessage);
            if (id == 'phone') {
                this.setMessage('Phone number must be 7 characters');
            }
            if (id == 'code') {
                this.setMessage('Code must be 4 characters');
            }
            return true;
        }
        this.setMessage('');
        this.setElementBorderColor(id, 'white');
    };
    MailList.prototype.saveForm = function () {
        if (this.validateForm()) {
            return;
        }
        var name = this.getElementValue('name');
        var lastName = this.getElementValue('lastName');
        var country = this.getElementValue('country');
        var email = this.getElementValue('email');
        var phone = "+".concat(this.getElementValue('code'), " ").concat(this.getElementValue('phone'));
        var comments = this.getElementValue('comments');
        var user = new User(this.nextUserId, name, lastName, country, email, phone, comments);
        this.users.push(user);
        this.nextUserId++;
        this.setMessage('Your proflie is saved successfully');
        this.setElementColor('lime');
        //	this.saveLocal();
    };
    MailList.prototype.editUsers = function (index) {
        this.revealAllElements('data');
        this.hideAllElements();
        this.hideRowElements('data', index);
        this.revealRowElements('editbox', index);
        this.adjustEditBoxSize(index);
    };
    MailList.prototype.saveNewData = function (index) {
        var _a, _b, _c, _d, _e;
        var message = '';
        message += this.updateSave((_a = this.users[index]) === null || _a === void 0 ? void 0 : _a.firstName, this.getElementValue("editname".concat(index)), "name".concat(index), index);
        message += this.updateSave((_b = this.users[index]) === null || _b === void 0 ? void 0 : _b.lastName, this.getElementValue("editlastname".concat(index)), "lastname".concat(index), index);
        message += this.updateSave((_c = this.users[index]) === null || _c === void 0 ? void 0 : _c.country, this.getElementValue("editcountry".concat(index)), "country".concat(index), index);
        message += this.updateSave((_d = this.users[index]) === null || _d === void 0 ? void 0 : _d.email, this.getElementValue("editemail".concat(index)), "email".concat(index), index);
        message += this.updateSave((_e = this.users[index]) === null || _e === void 0 ? void 0 : _e.phone, this.getElementValue("editphone".concat(index)), "phone".concat(index), index);
        this.hideRowElements('editbox', index);
        this.revealRowElements('data', index);
        this.setDataMessage(message);
    };
    MailList.prototype.updateSave = function (oldVal, newVal, textId, index) {
        if (oldVal != newVal) {
            if (textId == "name".concat(index)) {
                this.users[index].firstName = newVal;
            }
            if (textId == "lastname".concat(index)) {
                this.users[index].lastName = newVal;
            }
            if (textId == "country".concat(index)) {
                this.users[index].country = newVal;
            }
            if (textId == "email".concat(index)) {
                this.users[index].email = newVal;
            }
            if (textId == "phone".concat(index)) {
                this.users[index].phone = newVal;
            }
            this.setElementText(textId, newVal);
            return "".concat(oldVal, " is changed to ").concat(newVal, "; ");
        }
        return '';
    };
    MailList.prototype.saveLocal = function () {
        window.localStorage.setItem('users', JSON.stringify(this.users));
    };
    MailList.prototype.getLocal = function () {
        var data = window.localStorage.getItem('users');
        return JSON.parse(data);
    };
    MailList.prototype.deleteUser = function (index) {
        var _a;
        var message = ((_a = this.users[index]) === null || _a === void 0 ? void 0 : _a.firstName) + ' deleted';
        this.setDataMessage(message);
        this.users.splice(index, 1);
        this.printUsers();
    };
    MailList.prototype.printUsers = function () {
        //this.users= this.getLocal();
        var user = '';
        this.users.forEach(function (u, index) {
            user +=
                "<tr >\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<button onclick= \"m.deleteUser(".concat(index, ")\" id= \"del\">x\t</button>\n\t\t\t\t\t</td>\t\t\t\t\t\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<button onclick= \"m.editUsers(").concat(index, ")\" class=\"edit\" \n\t\t\t\t\t\t\t\t\t\tid= 'editbtn").concat(index, "'>Edit\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button id= 'savebtn").concat(index, "' onclick= \"m.saveNewData(").concat(index, ")\" \n\t\t\t\t\t\t\t\t\t   class= \"edit\">Save</button>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>").concat(u.id, "</td> \t\t\t\t\t\n\t\t\t\t\t<td> \n\t\t\t\t\t\t<label id='name").concat(index, "'>").concat(u.firstName, "</label>\n\t\t\t\t\t\t<input id='editname").concat(index, "' value= '").concat(u.firstName, "'\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\tmaxlength= '15' class= 'editUser' placeholder= 'name'/>\t\t\t\t\t\n\t\t\t\t\t</td>\n\t\t\t\t\t<td> \n\t\t\t\t\t\t<label id='lastname").concat(index, "'>").concat(u.lastName, "</label>\n\t\t\t\t\t\t<input id='editlastname").concat(index, "' value='").concat(u.lastName, "'\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\tmaxlength='15' class='editUser' placeholder='lastname' />\t\t\t\t\t\n\t\t\t\t\t</td>\n\t\t\t\t\t<td> \n\t\t\t\t\t\t<label id='country").concat(index, "'>").concat(u.country, "</label>\n\t\t\t\t\t\t<input id='editcountry").concat(index, "' value='").concat(u.country, "'\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\tmaxlength='15' class='editUser' placeholder='country' />\t\t\t\t\t\n\t\t\t\t\t</td>\n\t\t\t\t\t<td> \n\t\t\t\t\t\t<label id='email").concat(index, "'>").concat(u.email, "</label>\n\t\t\t\t\t\t<input id='editemail").concat(index, "' value='").concat(u.email, "' maxlength='25' \t\t\t\n\t\t\t\t\t\t\t\t\ttype='email' class='editUser' placeholder='email' />\t\t\t\t\t\n\t\t\t\t\t</td>\n\t\t\t\t\t<td> \n\t\t\t\t\t\t<label id='phone").concat(index, "'>").concat(u.phone, "</label>\n\t\t\t\t\t\t<input id='editphone").concat(index, "' value='").concat(u.phone, "' maxlength='14' \t\t\t\n\t\t\t\t\t\t\t\t\t class='editUser' placeholder='phone' />\t\t\t\t\t\n\t\t\t\t\t</td>\t\t\t\t\n\t\t\t\t\t<td>").concat(u.comments, "</td>\n\t\t\t\t</tr>");
        });
        if (this.users.length <= 0) {
            user = '<tr><td>no data found</td></tr>';
        }
        document.getElementById('list').innerHTML = user;
        this.hideAllElements();
        this.revealAllElements('data');
    };
    MailList.prototype.getStaticData = function () {
        return [
            new User(1, 'John', 'Smith', 'USA', 'smith@gmail.com', '+5675 433433', 'great'),
            new User(2, 'Thoho', 'Yandou', 'RSA', 'thoho@gmail.com', '+2783 433670', 'like it'),
            new User(3, 'Mary', 'Ann', 'UK', 'mary@gmail.com', '+5672 145697', 'love it')
        ];
    };
    MailList.prototype.getUsers = function (callback) {
        var list;
        /**/ var http = new XMLHttpRequest();
        http.overrideMimeType('application/json');
        http.open('GET', './mail-list.json', true);
        //	console.log(callback())
        http.onreadystatechange = function (event) {
            callback(http.responseText);
            if (http.readyState == 4 && http.status == 200) {
                //	list= JSON.parse()
            }
            http.send(null);
        };
        /* fetch(this.jsonRequest)
        .(response => response.json())
        .(data=> data= this.users);*/
        //this.setMessage(this.users) 
    };
    MailList.prototype.init = function () {
        this.getUsers(function (response) {
            console.log('response =', response);
            var json = JSON.parse(response);
            console.log('your local JSON =', JSON.stringify(json, null, 4));
            // 4. render to your page
            var app = document.getElementById('app');
            app.innerHTML = '<pre> hey' + JSON.stringify(json, null, 4) + '</pre>';
        });
    };
    MailList.prototype.adjustEditBoxSize = function (index) {
        if (index === void 0) { index = 0; }
        var stringLength;
        stringLength = this.users[index].firstName.length;
        this.setElementWidth("editname".concat(index), stringLength);
        stringLength = this.users[index].lastName.length;
        this.setElementWidth("editlastname".concat(index), stringLength);
        stringLength = this.users[index].country.length;
        this.setElementWidth("editcountry".concat(index), stringLength);
        stringLength = this.users[index].email.length;
        this.setElementWidth("editemail".concat(index), stringLength);
        stringLength = this.users[index].phone.length;
        this.setElementWidth("editphone".concat(index), stringLength);
    };
    MailList.prototype.clear = function () {
        document.getElementById('lastName').innerHTML = 'json';
        document.getElementById('lastName').innerText = '';
    };
    MailList.prototype.setMessage = function (message) {
        document.getElementById('message').innerText = message;
    };
    MailList.prototype.setDataMessage = function (message) {
        document.getElementById('datamessage').innerText = message;
    };
    MailList.prototype.getElementValue = function (id) {
        return document.getElementById(id).value;
    };
    MailList.prototype.setElementValue = function (id, data) {
        document.getElementById(id).value = data;
    };
    MailList.prototype.setElementText = function (id, text) {
        document.getElementById(id).innerText = text;
    };
    MailList.prototype.setElementWidth = function (id, length) {
        document.getElementById(id).style.width = "".concat(length * 5 + 80, "px");
    };
    MailList.prototype.setElementColor = function (newcolor, id) {
        if (id === void 0) { id = 'message'; }
        document.getElementById(id).style.color = newcolor;
    };
    MailList.prototype.setElementBorderColor = function (id, newcolor) {
        document.getElementById(id).style.borderColor = newcolor;
    };
    MailList.prototype.hideElement = function (id) {
        document.getElementById(id).hidden = true;
    };
    MailList.prototype.revealElement = function (id) {
        document.getElementById(id).hidden = false;
    };
    MailList.prototype.hideRowElements = function (element, index) {
        if (element === void 0) { element = 'editbox'; }
        if (element == 'editbox') {
            this.hideElement("savebtn".concat(index));
            this.hideElement("editname".concat(index));
            this.hideElement("editlastname".concat(index));
            this.hideElement("editcountry".concat(index));
            this.hideElement("editemail".concat(index));
            this.hideElement("editphone".concat(index));
        }
        else {
            this.hideElement("name".concat(index));
            this.hideElement("lastname".concat(index));
            this.hideElement("country".concat(index));
            this.hideElement("email".concat(index));
            this.hideElement("phone".concat(index));
        }
    };
    MailList.prototype.hideAllElements = function (element) {
        if (element === void 0) { element = 'editbox'; }
        for (var index = 0; index < this.users.length; index++) {
            this.hideRowElements(element, index);
        }
    };
    MailList.prototype.revealRowElements = function (element, index) {
        if (element === void 0) { element = 'editbox'; }
        if (element == 'editbox') {
            this.revealElement("savebtn".concat(index));
            this.hideElement("editbtn".concat(index));
            this.revealElement("editname".concat(index));
            this.revealElement("editlastname".concat(index));
            this.revealElement("editcountry".concat(index));
            this.revealElement("editemail".concat(index));
            this.revealElement("editphone".concat(index));
        }
        else {
            this.revealElement("editbtn".concat(index));
            this.revealElement("name".concat(index));
            this.revealElement("lastname".concat(index));
            this.revealElement("country".concat(index));
            this.revealElement("email".concat(index));
            this.revealElement("phone".concat(index));
        }
    };
    MailList.prototype.revealAllElements = function (element) {
        if (element === void 0) { element = 'editbox'; }
        for (var index = 0; index < this.users.length; index++) {
            this.revealRowElements(element, index);
        }
    };
    return MailList;
}());
var m = new MailList();
