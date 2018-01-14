module.exports = function (app,passport,picture,Account) {


var path = process.cwd();
function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
		  //console.log(req.isAuthenticated());
			return next();
		} else {
			res.redirect('/');
		}
	}


app.get("/api/get-pictures", function (request, response) {
	picture.find({}).sort({createdAt: 'descending'}).exec(function (err,results) {
      if(err) throw err;
      console.log("fund all");
      response.status(200).json({results:results});
	    
	});
});

app.post("/api/save-picture",isLoggedIn, function (request, response) {
	let userPicture = {
    	  picUrl: request.body.picUrl,
        description: request.body.description,
        tags:request.body.tags,
        owner: {
          id: request.user._id,
          name: request.user.local.name || ''
        },
	    };
	console.log(userPicture);
    if( userPicture ){
      let new_picture = new picture(userPicture);
      new_picture.save(function (err) {
        if (err) throw err;
          //picture saved!
          console.log("picture saved");
          response.status(200).end("successfully saved");
      });
    } else {
      response.status(400).end("Nothing to save");
    }
});
app.delete("/api/delete-picture/:picture_id", isLoggedIn, function (request, response) {
	let delPicture = request.params.picture_id;
	console.log(delPicture);
  if (!delPicture) {
    response.status(400).end("Nothing to delete!");
  }
  picture.deleteOne({ "_id" : delPicture}, function (err){
          if (err) throw err;
          console.log("Deleted Successfull");
          response.status(200).end("Deleted Successfull");
  });
});

app.put("/api/like-picture", isLoggedIn, function (request, response) {
	let likedPicture = request.body;
	let user = request.user;
// 	console.log(user._id);
  if (!likedPicture) {
    response.status(400).end("Nothing to like!");
  }
  picture.findOne({'_id': likedPicture.pictureId}, function(err, results) { 
      if (err) throw err;
      if( results.likes.includes(user._id.toString()) ){
        return response.status(402).end("Already Liked");
      } else {
      picture.update({'_id': likedPicture.pictureId},{
                        $push: { 'likes': user._id } 
                        },function (err,data) {
                        if (err) throw err;
                        console.log("Like Successfull");
                        return  response.status(200).end("Like Successfull");
                        });  
      }
  });
  
});

app.put("/api/unlike-picture",isLoggedIn, function (request, response) {
	let likedPicture = request.body;
	let user = request.user;
// 	console.log(user._id);
  if (!likedPicture) {
    response.status(400).end("Nothing to unlike!");
  }
  picture.findOne({'_id': likedPicture.pictureId}, function(err, results) { 
      if (err) throw err;
      if (results.likes.includes(user._id.toString()) ){
        picture.update({'_id': likedPicture.pictureId},{
                        $pull: { 'likes': user._id } 
                        },function (err,data) {
                        if (err) throw err;
                        console.log("unLike Successfull");
                        return  response.status(200).end("unLike Successfull");
                        });  
      } else {
        return response.status(402).end("Already done");
      }
  });
  
});

app.put("/api/picture-linking",isLoggedIn, function (request, response) {
	let linkedPicture = request.body;
	let user = request.user;
// 	console.log(user._id);
  if (!linkedPicture) {
    response.status(400).end("Nothing to link to!");
  }
  picture.findOne({'_id': linkedPicture.pictureId}, function(err, results) { 
      if (err) throw err;
      if( results.linkers.includes(user._id.toString()) ){
        return response.status(402).end("Already Linked");
      } else {
      picture.update({'_id': linkedPicture.pictureId},{
                        $push: { 'linkers': user._id } 
                        },function (err,data) {
                        if (err) throw err;
                        console.log("Linked Successfull");
                        return  response.status(200).end("Linked Successfull");
                        });  
      }
  });
  
});

app.put("/api/picture-unlinking",isLoggedIn, function (request, response) {
	let linkedPicture = request.body;
	let user = request.user;
// 	console.log(user._id);
  if (!linkedPicture) {
    response.status(400).end("Nothing to unlink to!");
  }
  picture.findOne({'_id': linkedPicture.pictureId}, function(err, results) { 
      if (err) throw err;
      if (results.linkers.includes(user._id.toString()) ){
        picture.update({'_id': linkedPicture.pictureId},{
                        $pull: { 'linkers': user._id } 
                        },function (err,data) {
                        if (err) throw err;
                        console.log("unLinked Successfull");
                        return  response.status(200).end("unLinked Successfull");
                        });  
      } else {
        return response.status(402).end("Already done");
      }
  });
  
});

app.get("/", function (request, response) {
  response.sendFile(path + '/client/index.html');
});


app.get('*', function(request, response) {
  response.sendFile(path + '/client/index.html');
});

};


