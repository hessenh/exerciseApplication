Workout = new Meteor.Collection('workout');
WorkoutSaved = new Meteor.Collection('workoutSaved');
Meteor.subscribe('workout');
Meteor.subscribe('workoutSaved');


Template.workout.workoutList = function(){
	return Workout.find({user:Meteor.user()._id,status:null},{sort:{number:1}});
}

Template.workout.events({
	'click #startButton':function(evt,tmpl){
		Session.set("activeWorkout",1);
		Router.go('startWorkout');
	},
	'click #saveWorkout':function(evt,tmpl){
		var name = $('#inputName').val();
		Meteor.call('saveWorkout',Meteor.user()._id,name);
		Session.set("change_name",false);
		$('')
	},	
	'click #saveWorkoutPop':function(){
		console.log("YEEE");
	}
})

Template.workoutItem.events({
	'click .workoutItem':function(evt,tmpl){
		if(Session.get('selected_exercise')==this._id){
			Session.set('selected_exercise',null);
		}
		else{
			Session.set('selected_exercise',this._id);
		}
	},
	'click .remove':function(evt,tmpl){
		Meteor.call('removeExercise',this._id);
	},
	'click .up':function(evt,tmpl){
		Meteor.call('moveExerciseUp',this._id);
	},
	'click .down':function(evt,tmpl){
		Meteor.call('moveExerciseDown',this._id);
	}
})

Template.saveWorkout.events({
	'click':function(){
		Session.set("change_name",true);
	}
})
Template.saveWorkout.change_name = function(){
	return Session.get("change_name");
}
Template.workout.change_name = function(){
	return Session.get("change_name");
}
Template.workoutItem.selected_exercise = function(){
	if(Session.get("selected_exercise")==this._id){
		return "selected_exercise";
	}
	else{
		return "";
	}
}