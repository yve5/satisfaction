// function AppViewModel() {
//     this.firstName = ko.observable("John");
//     this.lastName = ko.observable("Bertington");

//     this.fullName = ko.computed(function() {
//         return this.firstName() + " " + this.lastName();
//     }, this);

//     this.capitalizeLastName = function() {
//         var currentVal = this.lastName();
//         this.lastName(currentVal.toUpperCase());
//     };
// }

// var avm = new AppViewModel();
// ko.applyBindings(avm);


// function Answer(text) {
// 	this.answerText = text;
// 	this.points = ko.observable(1);
// }

function Question(label) {
	var self = this;

	self.label = label;
	self.answer = ko.observable(50);
}

function SurveyViewModel() {
	var self = this;

	self.questions = ko.observableArray([
		new Question("Le salaire (est-ce que le job paye bien ?)"),
		new Question("La satisfaction à faire le job (aimez-vous réellement faire ce en quoi consiste le poste ?)"),
		new Question('L’employabilité qui en découle (exercer ce boulot vous rapproche-t-il de vos objectifs pros ?)'),
		new Question('La possibilité d’avoir du temps pour soi (avez-vous du temps pour vos projets persos ?)'),
		new Question('La culture de l’entreprise (vos collègues sont-ils d’accord avec vous ?)'),
		new Question('La santé de l’organisation'),
		new Question('Le lieu de travail'),
		new Question('La qualité du travail d’équipe'),
		new Question('Les perspectives d’évolution professionnelles'),
		new Question('L’interaction avec des personnes en ou hors de l’entreprise (vous satisfont-elles ?)')
	]);


    // this.question = question;
    // this.pointsBudget = pointsBudget;
    // this.answers = $.map(answers, function(text) { return new Answer(text) });
    // // this.answers = null;
    // this.save = function() { alert('To do') };
                   
    self.result = ko.computed(function() {
        var total = 0;

        for (var i = 0; i < self.questions().length; i++) {
            total += Number(self.questions()[i].answer());
        }

        return total;
    });
}

var svm = new SurveyViewModel();
ko.applyBindings(svm);