var Greeter = /** @class */ (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
}());
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
    var alerter = new Alerter();
    alerter.alert('ALERT');
};
var Alerter = /** @class */ (function () {
    function Alerter() {
    }
    Alerter.prototype.alert = function (message) {
        alert(message);
    };
    return Alerter;
}());
//# sourceMappingURL=Tiling.js.map