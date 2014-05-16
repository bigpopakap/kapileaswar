var assert = require('../util/assert.js');
var projects = require('./json-projects.js');

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
 * add all key attributes and
 * convert all project id's to objects
 */
for (var ckey in categories) {
	var category = categories[ckey];
	
	assert.assert(!category.key);
	category.key = ckey;
	
	for (var pi in category.projects) {
		var pkey = category.projects[pi];
		
		var project = projects[pkey];
		assert.assert(project, "category " + ckey + "'s project key " + pkey + " doesn't reference any projects");
		
		category.projects[pi] = project;
	}
}
	
module.exports = categories;