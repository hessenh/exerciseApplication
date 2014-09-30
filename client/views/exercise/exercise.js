Exercise = new Meteor.Collection('exercise');
Category = new Meteor.Collection('category');

Meteor.subscribe('exercise');
Meteor.subscribe('category');


Template.categoryItem.exerciseList = function(){
	var category = Category.findOne(Session.get('selected_category')).category;
	return Exercise.find({category:category});
}

Template.category.categoryList = function(){
	return Category.find({});
}
Template.category.events({
	'click .categoryItem':function(evt,tmpl){
		if(Session.get('selected_category')==this._id){
			Session.set('selected_category',null);
		}
		else{
			Session.set('selected_category',this._id);
		}
	}
})
Template.categoryItem.selected_category = function(){
	if(Session.get("selected_category")==this._id){
		return "selected_category";
	}
	else{
		return "";
	}
}

Template.exercise.events({
	'click .exerciseItem':function(evt,tmpl){
		Meteor.call('addExercise',this._id,Meteor.user()._id);
		Session.set('selected',this._id);

		setTimeout(function(){
        	Session.set("selected",null);
   		}, 500);
	},
	'click .next':function(evt,tmpl){
		Router.go('workout');
	}
})
Template.exerciseItem.selected = function(){
	 if(Session.get("selected")==this._id){
	 	return "selected";
	 }
	 else{
	 	return "";
	 }
}

Template.createExercise.events({
	'click #createButton':function(evt,tmpl){
		var category = $('#inputCategory').val();
		var tilte = $('#inputTitle').val();
		Meteor.call('createExercise',category,tilte);
	}
})
