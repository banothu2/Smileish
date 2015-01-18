var express = require('express');
var router = express.Router();

/* Process API requests */
// 				$.get( "/api/submitVideo/"+data.video.token+"/"+videoID, function( data ) {

router.get('/api/submitVideo/:videoToken/:videoID', function(req, res) {
  res.render('error', { title: 'Express' });
});




module.exports = router;
