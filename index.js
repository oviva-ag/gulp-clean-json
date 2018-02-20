const through = require("through2");
const gutil = require("gulp-util");

module.exports = function (param) {
	"use strict";

	param = param || {};

	// if necessary check for required param(s), e.g. options hash, etc.
	if (!param) {
		throw new gutil.PluginError("gulp-clean-json", "No param supplied");
	}

	// see "Writing a plugin"
	// https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/README.md
	function cleanJson(file, enc, callback) {
		/*jshint validthis:true*/

		// Do nothing if no contents
		if (file.isNull()) {
			this.push(file);
			return callback();
		}

		if (file.isStream()) {
			// accepting streams is optional
			this.emit("error",
				new gutil.PluginError("gulp-clean-json", "Stream content is not supported"));
			return callback();
		}

		// check if file.contents is a `Buffer`
		if (file.isBuffer()) {

			// manipulate buffer in some way
			// http://nodejs.org/api/buffer.html
			var content = JSON.parse(String(file.contents));

			var isEmpty = function (obj) {
			    for(var prop in obj) {
			        return false
			    }
			    return true;
			}

			let stripJson = function(node){
				
				// leave node?
				if(node === '' || node === null || node === undefined){
					return null;
				}

				// skip non-objects
				if(!(node instanceof Object)){
					return node;
				}

				// strip subtrees
				for(let childKey of Object.keys(node)){
					let child = node[childKey];
					child = stripJson(child);
					if(child === null){
						delete node[childKey];
					}
				}

				if(Object.keys(node).length === 0){
					return null;
				}

				return node;
			}

			content = stripJson(content);

			file.contents = new Buffer(JSON.stringify(content, null, "\t"));

			this.push(file);

		}
		return callback();
	}

	return through.obj(cleanJson);
};
