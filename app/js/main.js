function AppViewModel() {
    this.firstName = ko.observable("John");
    this.lastName = ko.observable("Bertington");

    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);

    this.capitalizeLastName = function() {
        var currentVal = this.lastName();
        this.lastName(currentVal.toUpperCase());
    };
}

var avm = new AppViewModel();
ko.applyBindings(avm);