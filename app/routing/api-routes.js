//Load required data
var friends = require('../data/friend.js');

module.exports = function(app){
  //route that displays JSON of all friends
  app.get('/api/friends', function(req,res){
    res.json(friends);
  });

  app.post('/api/friends', function(req,res){
    //grabs the new friend's scores and compare to friends's scores in friends array
    var newFriendScores = req.body.scores;
    var scoresArray = [];
    var friendCount = 0;
    var bestMatch = 0;

    //runs through all current friends in list
    for(var i=0; i< friends.length; i++){
      var scoresDiff = 0;
      //compare  friends scores
      for(var j=0; j<newFriendScores.length; j++){
        scoresDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriendScores[j])));
      }

      //push results into scoresArray
      scoresArray.push(scoresDiff);
    }

    //find best match
    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

    //return bestMatch 
    var bff = friends[bestMatch];
    res.json(bff);

    //pushes new submission into the friends array
    friends.push(req.body);
  });
};