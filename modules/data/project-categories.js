var assert = require('assert');
var projects = require('./projects.js');

var categories = {
	tech: {
		name: 'Tech projects',
		projects: [
		    'some-proj-1',
		    'some-proj-2'
		]
	}
};

/*
 * add all key attributes, assert that they
 * agree, and make sure all project references exist
 */
for (var ckey in categories) {
	var category = categories[ckey];
	
	assert(!category.key);
	category.key = ckey;
	
	for (var pi in category.projects) {
		var pkey = category.projects[pi];
		
		var project = projects[pkey];
		assert(project, "category " + ckey + "'s project key " + pkey + " doesn't reference any projects");
	}
}
	
module.exports = categories;