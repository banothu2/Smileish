var express = require('express');
var router = express.Router();


var databaseUrl = "smileish"; // "username:password@example.com/mydb"
var collections = ["responses"]
var db = require("mongojs").connect(databaseUrl, collections);


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/api/submitVideo/:videoToken/:videoID', function(req, res) {
	var videoTokenRes = req.params.videoToken;
	var videoIDRes = req.params.videoID;


// db.responses.find({videoToken: videoTokenRes}, function(err, responses) {
//   if( err || !responses){
//   	db.responses.save({
//   		videoToken: videoTokenRes, 
//   		videoID: videoID
//   	}, function(err, saved) {
// 	  if( err || !saved ) 
// 	  	console.log("response not saved");
// 	  else 
// 	  	console.log("response saved");
//   	})
//   } else {
//   	db.responses.save({
//   		videoToken: videoTokenRes, 
//   		videoID: videoID
//   	}, function(err, saved) {
// 	  if( err || !saved ) 
// 	  	console.log("response not saved");
// 	  else 
// 	  	console.log("response saved");
//   	});

//   }
// });


	db.responses.save(
		{
			videoToken: videoTokenRes,
			videoID: videoIDRes
		}, function(err, saved) {
		  if( err || !saved ) console.log("response not saved");
		  else console.log("response saved");
		}
	);

	// Trigger the face detection thingy 
	// **
	// **
	// **

	// Respond with the face detection result
  	res.send({ some: "Something about the face detection result" });
});



module.exports = router;
