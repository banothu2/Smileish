var express = require('express');
var router = express.Router();
var fs = require('fs');

var sys = require('sys')
var exec = require('child_process').exec;

var databaseUrl = "smileish"; // "username:password@example.com/mydb"
var collections = ["responses", "bananas"]
var db = require("mongojs").connect(databaseUrl, collections);


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/upload/path', function(req, res){

    console.log(req.body.image_name);
    console.log(req.body);

});


router.get('/kickoffSmiles', function(req, res){
	function puts(error, stdout, stderr) { sys.puts(stdout) }
	exec("open -a /Users/kirthibanothu/Documents/Projects/Smileish/myapp/JoyTube.app", puts, {uid: 0, gid: 0});
	res.send("OK");
})

router.get("/api/smileish/:response", function(req, res){
	var resp = req.params.response;

	db.bananas.save(
		{
			values: resp
		}, function(err, saved) {
		  if( err || !saved ) console.log("response not saved");
		  else console.log("response saved");
		}
	);
})

router.get("/api/allVideos/:videoID", function(req, res){
	var videoID = req.params.videoID;
	db.responses.find({videoID: videoID}, function(err, response){
		var ids = [];
		if( err || !response){
			res.send({});
		} 
		else {
			response.forEach( function(resp) {
				ids.push(resp.videoToken);
		  	} );
		  	res.send(ids)
		}
	})
})

router.get("/api/getLatest", function(req, res){
	var value = "banana";

	db.bananas.find({}).sort({_id:-1}, function(err, docs) {
		var latest = [];
		var count = 1;
	    docs.forEach(function(resp){
	    	latest.push(resp.values);
	    })

	    // Latest[0] has the response in strings of 0s and 1s
	    var stringRes = latest[0];
	    var threshold = 15;
	    if(stringRes.match(/1/g) != null){
			var funnyValue = Math.ceil((Math.max(stringRes.match(/1/g).length, 0) / stringRes.length)*100);

	    } else {
	    	var funnyValue = Math.ceil((0, 0) / stringRes.length)*100;

	    }


		var i = 0;
		var countSmiles = 0;
		var currentCounter = stringRes[0];
		for(i = 0; i < stringRes.length - 1; i++){
		    if(stringRes[i] != stringRes[i+1]){
		        if(stringRes[i] == currentCounter){
		         } else { 
		         if(stringRes[i] == 1){
		             countSmiles++;
		         }
		         }
		    }
		}
		var objectReturn = {
			funnyVal: funnyValue,
			stringResponse: stringRes,
			smilesCount: countSmiles
		}


	    res.send(objectReturn);
	});

})


// router.get('/api/base64/:base64', function(req, res){
// 	var base64Val = req.params.base64;
// 	var base64_complex = base64Val.replace(/COMPLEX/g, "/");
// 	var base64_static = base64_complex.replace(/STATIC/g, "+");

// 	console.log("\n "+base64_static+" \n ");

// 	fs.writeFile("out.png", base64_static, 'base64', function(err) {
// 	  console.log("\nERROR HAPPENED\n");
// 	});
// 	console.log("worked!?");
// 	res.send("something happened!");
// })


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
