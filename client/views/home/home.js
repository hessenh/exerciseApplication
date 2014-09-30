Template.home.events({
	'click .startNew':function(evt,tmpl){
		Meteor.call('removeWorkout',Meteor.user()._id);
		Router.go('exercise');
	},
	'click .startPrev':function(){
		Meteor.call('removeWorkout',Meteor.user()._id);
		Router.go('workoutList');
	}
})