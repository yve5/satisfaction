var GenerateOptionText = function(value) {
    return value + '%';
}
 
var Question = function (label, importance) {
    var self = this;
    var randomValue;
 
    self.label = label;
    self.importance = importance;
 
    self.availableAnswers = ko.observableArray();
    for (var i = 0; i <= 100; i += 5) {
        self.availableAnswers.push(i);
    }
 
    randomValue = Math.floor(Math.random() * self.availableAnswers().length);
    self.answer = ko.observable(self.availableAnswers()[randomValue]);
}
 
var SurveyViewModel = function () {
    var self = this;
 
    self.questions = ko.observableArray([
        new Question('Votre salaire vous convient-il ?', 0.2),
        new Question('Aimez-vous réellement faire les tâches de votre poste ?', 0.2),
        new Question('Exercer ce travail vous rapproche-t-il de vos objectifs professionnels ?', 0.2),
        new Question('Avez-vous du temps pour vos projets personnels ?', 0.2),
        new Question('Vos collègues sont-ils d’accord avec vous ?', 0.2),
        new Question('Votre société se porte-t-elle bien ?', 0.2),
        new Question('Aimez-vous votre lieu de travail ?', 0.2),
        new Question('Appréciez-vous la qualité du travail d’équipe ?', 0.2),
        new Question('Vos perspectives d’évolution professionnelles vous convient-elles', 0.2),
        new Question('L’intéraction avec les personnes en ou hors de l’entreprise vous satisfait-elle ?', 0.2)
    ]);
 
    self.result = ko.computed(function() {
        var total = 0;
        var average = 0;
 
        for (var i = 0; i < self.questions().length; i++) {
            total += Number(self.questions()[i].answer()) + self.questions()[i].importance;
        }
 
        average = Math.floor(total / self.questions().length);
 
        return average;
    });
 
    self.showSuccess = function() {
        return self.result() > 90;
    }
 
    self.showInfo = function() {
        return self.result() > 75 && self.result() <= 90;
    }
 
    self.showWarning = function() {
        return self.result() > 60 && self.result() <= 75;
    }
 
    self.showDanger = function() {
        return self.result() <= 60;
    }
}
 
var svm = new SurveyViewModel();
ko.applyBindings(svm);