
Template.startWorkout.activExercise = function(){
	return Workout.find({number:Session.get('activeWorkout')});
}


Template.startWorkout.events({
	'click #nextButton':function(evt,tmpl){
		var series = $('#inputSeries').val();
		var reps = $('#inputReps').val();
		var weight = $('#inputWeight').val();

		Meteor.call('updateWorkout',this._id,series,reps,weight);

		var temp = Session.get("activeWorkout");
		if(temp == Workout.find().count()){
			Router.go("results");
			Meteor.call('saveResults',Meteor.user()._id);
		}
		else{
			Session.set("activeWorkout",temp+1);
		}
	},
	'click #prevButton':function(evt,tmpl){
		var series = $('#inputSeries').val();
		var reps = $('#inputReps').val();
		var weight = $('#inputWeight').val();

		Meteor.call('updateWorkout',this._id,series,reps,weight);
		var temp = Session.get("activeWorkout");
		Session.set("activeWorkout",temp-1);
	},
})