
var panel = $('#quiz-area');
var countStartNumber = 10;

//setup on-clicks...
$(document).on('click', '#start-over', function(e) {
    game.reset();
  });
  
  $(document).on('click', '.answer-button', function(e) {
    game.clicked(e);
  });
  
  $(document).on('click', '#start', function(e) {
    $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">10</span> Seconds</h2>');
    game.loadQuestion();
  });
  
//create questions...
  var questions = [{
    question: 'Who sang "Blame It On the Rain"?',
    answers: ["Milli Vanilli", "Snow","New Kids on the Block", "The Jets"],
    correctAnswer: "Milli Vanilli",
    image:"assets/images/mv1.jpg"
  }, {
    question: '"Straight Up" was a number one hit in 1989 for what well-known artist?',
    answers: ["Samantha Fox", "Debbie Gibson", "Jennifer Lopez", "Paula Abdul"],
    correctAnswer: "Paula Abdul",
    image:"assets/images/pa1.jpg"
  }, {
    question: "Who had the most number one Billboard hits during the eighties?",
    answers: ["Madonna", "Michael Jackson", "Prince", "Boy George"],
    correctAnswer: "Michael Jackson",
    image:"assets/images/mj1.jpg"
  }, {
    question: 'Bruce Springsteen likes "Dancing in the ___"?',
    answers: ["Rain", "Street", "Dark", "Shower"],
    correctAnswer: "Dark",
    image:"assets/images/bs1.jpg" 
  }, {
    question: 'According to Toni Basil, who is "so fine"?',
    answers: ["Ricky", "Billy", "Vicky", "Mickey"],
    correctAnswer: "Mickey",
    image:"assets/images/tb1.jpg"
  }, {
    question: 'Who was considered "The Most Dangerous Band"?', 
    answers: ["Metallica", "Guns N Roses", "NWA", "Motley Crue"],
    correctAnswer: "Guns N Roses",
    image:"assets/images/gnr1.jpg", 
  }, {
    question: 'Aerosmith and Run DMC joined forces in 1986 to collaborate what song?',
    answers: ["Jingle Bells", "Dream On", "My Adidas", "Walk This Way"],
    correctAnswer: "Walk This Way",
    image:"assets/images/dmc1.jpg"
  }, {
    question: "Before going solo, George Michael was part of what band?",
    answers: ["Culture Club", "Wham!", "2 Live Crew", "Pet Shop Boys"],
    correctAnswer: "Wham!",
    image:"assets/images/wham.jpg"
  }];


//start trivia...
var game = {
    
    questions:questions,
    currentQuestion:0,
    counter:countStartNumber,
    correct:0,
    incorrect:0,

 //set timer...   
    countdown: function(){
      game.counter--;
      $('#counter-number').html(game.counter);
  
      if (game.counter === 0){
        console.log('TIME UP');
        game.timeUp();
      }
  },


  //load questions...
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h3>' + questions[this.currentQuestion].question + '</h3>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },

  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

//when run out of time...
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

  panel.html('<h2>Out of Time!</h2>');
  panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
  panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
    setTimeout(game.results, 1 * 1000);
    } 
    
    else {
    setTimeout(game.nextQuestion, 1 * 1000);
    }
},

//results....
  results: function() {
   clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  
    clicked: function(e) {
        clearInterval(timer);

        if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
        this.answeredCorrectly();
        } 

        else {
        this.answeredIncorrectly();
        }
    },

    answeredIncorrectly: function() {
        game.incorrect++;
        clearInterval(timer);
        panel.html('<h2>Nope!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 1 * 1000);
        } 

        else {
        setTimeout(game.nextQuestion, 1 * 1000);
        }
    },

    answeredCorrectly: function(){
        clearInterval(timer);
        game.correct++;
        panel.html('<h2>Correct!</h2>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 1 * 1000);
        } 
    
        else {
        setTimeout(game.nextQuestion, 1 * 1000);
        }
    },

  //game reset...
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};