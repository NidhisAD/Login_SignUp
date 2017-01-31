/*Creating your own server*/
/*Express is a module to create servers*/

var Datastore = require('nedb');
var express = require('express')
var bodyParser = require('body-parser');
var app = express()

var db = new Datastore({filename: 'store.db', autoload: true});

app.set('view engine', 'ejs');

app.use(express.static('public'));	/*Creates a middleware*/
app.use(bodyParser.urlencoded({extended: false}));	/*Encoding mechanism*/

app.get('/', function(req,res)
			{
				console.log('Listening at 3000')
				res.sendFile('public/login.html', {
						 								root: __dirname
												}
							);
			}
		);


app.post('/login', function(req,res)
					{
						console.log(req.body);	/*req.query.username - username, req.query.password - password*/
						var user=req.body.username;
						var pass=req.body.password;
						/*if((user == 'nitin') && (pass == 'amrita'))
						{
							res.sendFile('public/success.html', {
							 										root: __dirname
																}
										);
						}
						else
						{
							res.sendFile('public/error.html', {
																	root: __dirname
																}
										);
						}*/
						db.find({username:user,password:pass},function(err,result)
													{
														if (err)
															throw err;
														if(result.length==0)
														{
															res.render('error', {name: req.body.username});
														}
														else
														{
															/*res.sendFile('public/success.html', {
																									root: __dirname
																								  }
																		  );*/
															res.render('logged_in', {
																					name: req.body.username,
																					pass: req.body.password
																				  }
																	  );
														}
													}
								);
					}
			);

app.post('/register', function(req, res)
						{
							console.log(req.body);
							var username1 = req.body.username;
							var password1 = req.body.password;
							db.insert({username: username1, password: password1}, function(err, insertedDoc)
													{	
														if(err)
															throw err;
														console.log(insertedDoc);
														res.render('success', {
																				name: req.body.username,
																				pass: req.body.password
																			  }
																  );
													}
										);
						}
		);

app.post('/update_name1', function(req, res)
						{
							var updated_name = req.body.update_username;
							db.update({username: updated_name}, function(err, insertedDoc)
													{	
														if(err)
															throw err;
														console.log(insertedDoc);
														res.sendFile('public/login.html', {
						 																	root: __dirname
																						  }
																	);
													}
										);
						}
		);

app.post('/update_pass1', function(req, res)
						{
							var updated_pass = req.body.update_password;
							db.update({password: updated_pass}, function(err, insertedDoc)
													{	
														if(err)
															throw err;
														console.log(insertedDoc);
														res.sendFile('public/login.html', {
						 																	root: __dirname
																						  }
																	);
													}
										);
						}
		);
 
app.listen(3000)