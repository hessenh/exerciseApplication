Template.workoutList.workoutNames = function(){
	if(Meteor.user() != null){
		return WorkoutSaved.find({user:Meteor.user()._id});	
	}
	
}


Template.workoutName.workoutNameExerciseList = function(){
	return WorkoutSaved.findOne({user:Meteor.user()._id,name:Session.get("selected_workoutName")}).ex;
}

Template.workoutName.events({
	'click .workoutName':function(){
		if(Session.get("selected_workoutName") == WorkoutSaved.findOne(this._id).name){
			Session.set("selected_workoutName",null);
		}
		else{
			Session.set("selected_workoutName",WorkoutSaved.findOne(this._id).name);
		}
	},
	'click #startWorkout':function(){
		console.log("Starting " + Session.get("selected_workoutName"));
		Meteor.call("loadPrevWorkout",Meteor.user()._id,Session.get("selected_workoutName"));
		Router.go('workout');
	}
})

Template.workoutName.selected_workoutName = function(){
	if(Session.get("selected_workoutName") == WorkoutSaved.findOne(this._id).name){
		return "selected_workoutName";
	}
	else{
		return "";
	}
}