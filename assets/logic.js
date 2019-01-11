//initialize firebase

var config = {
    apiKey: "AIzaSyDWe8WsKrn-v3YpRpiT7HR7KNHmjqPQA-M",
    authDomain: "train-scheduler-91ed2.firebaseapp.com",
    databaseURL: "https://train-scheduler-91ed2.firebaseio.com",
    projectId: "train-scheduler-91ed2",
    storageBucket: "train-scheduler-91ed2.appspot.com",
    messagingSenderId: "1046038861791"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var frequency = 0;
  var firstTrain = 0;
  
$("#submit-info").on("click", function(event){
    event.preventDefault();

    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    firstTrain = $("#firstTrain-input").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain,
        //minutesAway: firebase.database.ServerValue.TIMESTAMP

    });
});

database.ref().on("child_added", function(snapshot) {
    var sv = snapshot.val();

    console.log(sv.trainName);
        console.log(sv.destination);
        console.log(sv.frequency);
        console.log(sv.firstTrain);

        $("#train-info").append("<tr>" + "th scope= 'row'>" + 
        snapshot.val().name +
        "</th><td id='Train Name'>" + snapshot.val().trainName +
        "</td><td id='destination'>" + snapshot.val().destination + 
        "</td><td id='frequency'>" + snapshot.val().frequency + 
        "</td><td id='First Train'>" + snapshot.val().firstTrain + 
        "</td><tr>");
    
}, function(errorObject){
    console.log("Errors handled: " + errorObject.code);
});