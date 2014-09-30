WorkoutHistory = new Meteor.Collection('workoutHistory');
WorkoutHistoryDate = new Meteor.Collection('workoutHistoryDate');

Meteor.subscribe('workoutHistory');
Meteor.subscribe('workoutHistoryDate');

Template.analysis.analysisDateList = function(){
	return WorkoutHistoryDate.find({});
}

Template.workoutHistory.analysisList = function(){
	var temp = WorkoutHistoryDate.findOne(Session.get("selected_HistoryName")).date;
	return WorkoutHistory.find({date:temp});
}

Template.workoutHistory.events({
	'click .workoutHistoryName':function(){
		if(Session.get("selected_HistoryName")==this._id){
			Session.set("selected_HistoryName",null);
		}
		else{
			Session.set("selected_HistoryName",this._id);
		}
	}
})
Template.workoutHistory.selected_HistoryName = function(){
	if(Session.get("selected_HistoryName")==this._id){
		return true;
	}
	else{
		return false;
	}
}