var express = require("express");
var logfmt = require("logfmt");

var URLS = require(__dirname + '/modules/urls.js');
var RENDER_UTIL = require(__dirname + '/modules/render-util.js');

var DATA = {
	PROJECT_CATEGORIES: require(__dirname + '/modules/data/project-categories.js'),
	PROJECTS: require(__dirname + '/modules/data/projects.js'),
	HEAD_CAROUSEL_IMAGES: require(__dirname + "/modules/data/head-carousel.js"),
	CONTACT_CHANNELS: require(__dirname + "/modules/data/contact-channels.js")
}

var app = express();
app.use(logfmt.requestLogger());
app.use(URLS.pub(), express.static(__dirname + '/public'));
app.locals = {
	RENDER_UTIL: RENDER_UTIL,
	URLS: URLS,
	DATA: DATA
}

/*
 * TODO use variables to replace all string constants used in this file
 */

//remove trailing slashes
app.get('*/', function(req, res, next) {
	var path = req.url;
	if (path.substring(path.length - 1) == '/' && path.length > 1) {
		return res.redirect(path.slice(0, -1));
	}
	else {
		return next();
	}
});

app.get(URLS.base(), function(req, res) {
	return res.render('pages/home.jade');
});

app.get(URLS.resume(), function(req, res) {
	//TODO
	return res.render('pages/resume.jade');
});

app.get(URLS.contact(), function(req, res) {
	return res.render('pages/contact.jade');
});

app.get(URLS.contact(':channel'), function(req, res, next) {
	var channel = DATA.CONTACT_CHANNELS[req.params.channel];
	if (!channel) {
		return next();
	}
	
	return res.redirect(channel.url);
});

app.get(URLS.projectCategory(':categoryKey'), function(req, res, next) {
	var category = DATA.PROJECT_CATEGORIES[req.params.categoryKey];
	if (!category) {
		return res.redirect(URLS.notfound());
	}
	
	return res.render('pages/project-category.jade', {
		catkey: category.key
	});
});

app.get(URLS.projectDetail(':projectKey'), function(req, res) {
	var project = DATA.PROJECTS[req.params.projectKey];
	if (!project) {
		return res.redirect(URLS.notfound());
	}
	
	return res.render('pages/project-detail.jade', {
		pkey: project.key
	});
});

app.get(URLS.recruitme(), function(req, res) {
	//TODO
	return res.render('pages/recruitme.jade');
});

/*
 * TODO use an actual error page instead
 * TODO keep a reference to the page they were trying to get to
 */
app.get(URLS.notfound(), function(req, res) {
	return res.send('<a href="/">NOT FOUND! Go back home</a>');
});

app.get('*', function(req, res) {
	return res.redirect(URLS.notfound());
});

var port = Number(process.env.PORT || 8080);
app.listen(port, function() {
  console.log("Listening on " + port);
});