Meteor.subscribe("pictures");

Pictures  = new Meteor.Collection("pictures");
/*
Template.carousel.pictures = function(){
	return Pictures.find({id:Session.get('editing_post')});
}*/

Template.carousel.helpers({
  pictures: function() {
    return Pictures.find({id:Session.get('editing_post')},{sort: {timeStamp: -1}}).map(function(picture, index) {
      if (index === 0)
        picture.isFirst = true;
      return picture;
    });
  }
});