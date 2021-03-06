var contactChannels = require('./data/contact-channels.js');

function urlHelper(base, arg) {
	if (!arg) {
		arg = '';
	}
	else {
		arg = '/' + arg;
	}
	return base + arg;
}

function base() {
	return urlHelper('/');
}
exports.base = base;

function pub(path) {
	return urlHelper('/public', path);
}
exports.pub = pub;

function resume() {
	return urlHelper('/resume');
}
exports.resume = resume;

function contact(channel) {
	return urlHelper('/contact', channel);
}
exports.contact = contact;

function contact_facebook() {
	return contact(contactChannels.facebook.key);
}
exports.contact_facebook = contact_facebook;

function projectCategory(catkey) {
	return urlHelper('/projects', catkey);
}
exports.projectCategory = projectCategory;

function projectCategory_tech() {
	/*
	 * TODO don't hardcode this, or assert that
	 * 		such a category exists
	 */
	return projectCategory('tech');
}
exports.projectCategory_tech = projectCategory_tech;

function projectDetail(projkey) {
	return urlHelper('/project', projkey);
}
exports.projectDetail = projectDetail;

function recruitme() {
	return urlHelper('/recruitme');
}
exports.recruitme = recruitme;

function notfound() {
	return urlHelper('/error/404-notfound');
}
exports.notfound = notfound;