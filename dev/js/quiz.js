/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */ 

'use strict';

var possibleAnswers = [
	'Jurassic Park',
	'The Lost World',
	'Igby Goes Down',
	'The Life Aquatic',
	'The Grand Budapest Hotel',
	'The Fly',
	'Death Wish',
	'Cats and Dogs',
	'Annie Hall',
	'Independence Day'
];




function randomNumber(lowest, highest) {
	return Math.floor(Math.random() * (highest - lowest) + lowest); 
}


// Quiz constructor


function Quiz(questions) {
	this.questions = questions;
	this.score = 0;
	this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function(answer) {
	if(this.getCurrentQuestion().isCorrectAnswer(answer)) {
		this.score++;
	}
	this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function() {
	return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
  return this.currentQuestionIndex >= this.questions.length;
};

// Question constructor

function Question(text, correct, source) {
	this.text = text;
	this.correct = correct;
	this.source = source;
}

Question.prototype.randomChoiceArray = function(arrayLength, min, max) {
	// remove correct answer from array
	var correctIndex = possibleAnswers.indexOf(this.correct);
	possibleAnswers.splice(correctIndex, 1);
	var lowest = min;
	var highest = max;
	var randomArr = [];
	// create array of non-repeating random numbers
	while(randomArr.length < arrayLength) {
		var newNumber = randomNumber(lowest, highest);
		var used = false;
		for(var i = 0; i < randomArr.length; i++) {
			if(randomArr[i] == newNumber) {
				used = true;
			}
		}
		if(!used) {
			randomArr.push(newNumber);
		}
	}
	// use random num
	var choiceArray = [];
	for (var j = 0; j < randomArr.length; j++) {
		choiceArray.push(possibleAnswers[randomArr[j]]);
	}
	choiceArray.splice(randomNumber(0, choiceArray.length + 1), 0, this.correct);
	// replace correct answer
	possibleAnswers.splice(correctIndex, 0, this.correct);
	return choiceArray;
};

Question.prototype.isCorrectAnswer = function(choice) {
	return this.correct === choice;
};

// Quiz UI
var QuizUI = {
	displayNext: function() {
    if(quiz.hasEnded()) {
      this.displayScore();
    } else {
      this.displayQuestion();
    }
  },
  displayQuestion: function() {
	  var toHTML = '<img src="'+quiz.getCurrentQuestion().source+'" alt="Image of Jeff Goldblum" />';
		var choices = quiz.getCurrentQuestion().randomChoiceArray(3, 0, 8);
		var quizHolder = document.getElementById('quiz__image');
		quizHolder.innerHTML = toHTML;
		for(var i = 0; i < choices.length; i++) {
			this.populateIdWithHTML('guess'+i, choices[i]);
			this.guessHandler('guess'+i, choices[i]);
		}
  },
  displayScore: function() {
  	var message;
  	if(quiz.score == quiz.questions.length) {
  		message = "Congratulations. You could be the Jeff!";
  	} else if (quiz.score >= quiz.questions.length / 2) {
  		message = "Well done";
  	} else {
  		message = "You need more Jeff in your life!";
  	}
  	var gameOver = '<div id="game-over" class="block quiz__game-over">';
  	gameOver += '<h1 class="centered">Game Over</h1>';
  	gameOver += '<h2 class="centered">'+message+'</h2>';
  	gameOver += '<h2 class="centered">You scored: ' + quiz.score + ' out of '+questions.length+'</h2>';
  	gameOver += '<button id="retry" class="button centered" onclick="location.reload()">Retry?</button>';
  	gameOver += '</div>';
  	document.getElementById('quiz').innerHTML = gameOver;
  },
  populateIdWithHTML: function(id, text) {
  	var element = document.getElementById(id);
  	element.innerHTML = text;
  },
  guessHandler: function(id, guess) {
  	var button = document.getElementById(id);
  	button.onclick = function() {
  		quiz.guess(guess);
  		QuizUI.displayNext();
  	};
  }
};


var questions = [
	new Question('Jurassic Park', 'Jurassic Park', 'img/jp.jpg'),
	new Question('Igby Goes Down', 'Igby Goes Down', 'img/igby.jpg'),
	new Question('The Fly', 'The Fly', 'img/fly.jpg'),
	new Question('Death Wish', 'Death Wish', 'img/death-wish.png'),
	new Question('Cats and Dogs', 'Cats and Dogs', 'img/cats.jpg'),
	new Question('The Lost World', 'The Lost World', 'img/jp2.jpg'),
	new Question('The Life Aquatic', 'The Life Aquatic', 'img/aqua.jpg'),
	new Question('The Grand Budapest Hotel', 'The Grand Budapest Hotel', 'img/grand.jpg'),
	new Question('Independence Day', 'Independence Day', 'img/ind.jpg'),
	new Question('Annie Hall', 'Annie Hall', 'img/annie.jpg')
];

var quiz = new Quiz(questions);

QuizUI.displayNext();



