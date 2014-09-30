Router.map(function() {
	this.route('home',
		{path:'/'});
	this.route('home');
	this.route('exercise');
	this.route('createExercise');
	this.route('workout');
	this.route('startWorkout');
	this.route('workoutList');
	this.route('results');
	this.route('analysis');
});

Router.configure({
	layoutTemplate: 'layout'
});

