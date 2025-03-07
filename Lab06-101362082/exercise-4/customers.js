"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
var Customer = /** @class */ (function () {
    function Customer(firstName, lastName, Age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.Age = Age;
    }
    Customer.prototype.greeter = function () {
        console.log("Hello ".concat(this.firstName, " ").concat(this.lastName));
    };
    Customer.prototype.GetAge = function () {
        console.log("".concat(this.firstName, " ").concat(this.lastName, "'s age is ").concat(this.Age));
    };
    return Customer;
}());
exports.Customer = Customer;
var customer = new Customer("Cheng", "Shi", 23);
customer.greeter();
customer.GetAge();
