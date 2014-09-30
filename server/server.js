Exercise = new Meteor.Collection('exercise');
Pictures = new Meteor.Collection('pictures');
Workout = new Meteor.Collection('workout')
Category = new Meteor.Collection('category');
WorkoutSaved = new Meteor.Collection('workoutSaved');
WorkoutHistory = new Meteor.Collection('workoutHistory');
WorkoutHistoryDate = new Meteor.Collection('workoutHistoryDate');

Meteor.publish('workoutHistoryDate',function(){
  return WorkoutHistoryDate.find({});
})

Meteor.publish("pictures",function(){
  return Pictures.find({});
});
Meteor.publish("category",function(){
  return Category.find({});
});

Meteor.publish("exercise", function () {
  return Exercise.find({});
});
Meteor.publish("workout",function(){  
  return Workout.find({});
})
Meteor.publish("workoutSaved",function(){
  return WorkoutSaved.find({});
})
Meteor.publish("workoutHistory",function(){
  return WorkoutHistory.find({});
})

Meteor.methods({
  'saveWorkout':function(user,name){
    var cursor = Workout.find({user:user,name:null});

    if (!cursor.count()) return;

    var exerciseNames = [];
    cursor.forEach(function (row) {
        console.log(row.title);
        exerciseNames.push(row.title);
    }); 
    WorkoutSaved.insert({user:user,name:name,ex:exerciseNames});
    Workout.update({user:user,name:null},{$set:{name:name}},{multi:true});
  },
  'loadPrevWorkout':function(user,workoutName){
    Meteor.call('removeWorkout');
    var list = WorkoutSaved.findOne({user:user,name:workoutName}).ex;
    var arrayLength = list.length;
    for (var i = 0; i < arrayLength; i++) {
        Meteor.call('addExerciseByTitle',user,list[i]);
    }
  },
  'addExerciseByTitle':function(user,title){
    var tempExercise = Exercise.findOne({title:title});
    var number = Workout.find({name:null}).count() + 1;
    Workout.insert({name:null,user:user,title:tempExercise.title,number:number,series:null,reps:null,weight:null,status:null});
  },
  'addExercise':function(id,user){
    var tempExercise = Exercise.findOne(id);
    var number = Workout.find().count() + 1;
    Workout.insert({name:null,user:user,title:tempExercise.title,number:number,series:null,reps:null,weight:null,status:null});
  },
  'updateWorkout':function(id,series,reps,weight){
    Workout.update({_id:id},{$set:{series:series,reps:reps,weight:weight,status:1}});
  },
  'removeExercise':function(id){
    Workout.remove(id);
  },
  'moveExerciseUp':function(id){
    var number = Workout.findOne(id).number;
    if(number>1){
      Workout.update({number:(number-1)},{$set:{number:number}});
      Workout.update(id,{$set:{number:(number-1)}});
    }
  },
  'moveExerciseDown':function(id){
    var number = Workout.findOne(id).number;
    if(number<Workout.find().count()){
      Workout.update({number:(number+1)},{$set:{number:number}});
      Workout.update(id,{$set:{number:(number+1)}});
    }
  },
  'removeWorkout':function(user){
      Workout.remove({user:user});
  },
  'saveResults':function(user){
    var timestamp = new Date();
    var temp = Workout.findOne();
    WorkoutHistoryDate.insert({date:timestamp,name:temp.name});

    for (var i = 1; i < Workout.find({user:user}).count()+1; i++) {
      var temp = Workout.findOne({user:user,number:i});
      WorkoutHistory.insert({date:timestamp,user:temp.user,title:temp.title,series:temp.series,reps:temp.reps,weight:temp.weight,name:temp.name});
    }
  }
});

Meteor.startup(function() {
  if(Category.find().count()==0){
    Category.insert({category:"Chest"});
    Category.insert({category:"Leg"});
    Category.insert({category:"Back"});
  };
  if(Exercise.find().count()==0){
    Exercise.insert({category:"Chest",title:"Barbell benchpress"});
    Exercise.insert({category:"Chest",title:"Dumbell benchpress"});
    Exercise.insert({category:"Chest",title:"Flyes"});
    Exercise.insert({category:"Chest",title:"Incline flyes"});
    Exercise.insert({category:"Chest",title:"Push-ups"});
    Exercise.insert({category:"Chest",title:"Pullover "});
    Exercise.insert({category:"Chest",title:"Cable crossovers"});
    Exercise.insert({category:"Chest",title:"Decline benchpress"});
    Exercise.insert({category:"Chest",title:"Chest dips"});

    Exercise.insert({category:"Leg",title:"Squat"});
    Exercise.insert({category:"Leg",title:"Front squat"});
    Exercise.insert({category:"Leg",title:"Barbell hack squat"});
    Exercise.insert({category:"Leg",title:"Machine hack squat "});
    Exercise.insert({category:"Leg",title:"Leg press"});
    Exercise.insert({category:"Leg",title:"Lunge"});
    Exercise.insert({category:"Leg",title:"Leg curls"});
    Exercise.insert({category:"Leg",title:"Bulgarian split squat"});
    Exercise.insert({category:"Leg",title:"Standing calf raise"});
    Exercise.insert({category:"Leg",title:"Seated calf raise"});
    Exercise.insert({category:"Leg",title:"Sled Standing Calf Raise"});
    Exercise.insert({category:"Leg",title:"Donkey Calf Raise"});

    Exercise.insert({category:"Back",title:"Deadlift"});
    Exercise.insert({category:"Back",title:"Rack pull"});
    Exercise.insert({category:"Back",title:"Barbell rows"});
    Exercise.insert({category:"Back",title:"Dumbell rows"});
    Exercise.insert({category:"Back",title:"Bent over rows"});
    Exercise.insert({category:"Back",title:"Chins"});
    Exercise.insert({category:"Back",title:"Lat pulldowns"});
    Exercise.insert({category:"Back",title:"Close grip pulldown"});
    Exercise.insert({category:"Back",title:"T-bar rows"});
    Exercise.insert({category:"Back",title:"Back hyperextensions"});


    Exercise.insert({category:"Back",title:"Deadlift"});
    };


  if(!Meteor.users.findOne({ emails: { $elemMatch: { address: "hans" } } })){
      var profile = {
        email:"hans",
        role: "admin"
      };

      Accounts.createUser({
      email: "hans", 
      password : "123",
      profile:profile
    });
      console.log("Admin created");

      var profile = {
        email:"dans",
        role: "user"
      };
      Accounts.createUser({
      email: "dans", 
      password : "123",
      profile:profile
    });
      console.log("User created");
    }
});
