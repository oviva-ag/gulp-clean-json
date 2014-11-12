var through = require("through2"),
	gutil = require("gulp-util");

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

			// http://nodejs.org/api/stream.html
			// http://nodejs.org/api/child_process.html
			// https://github.com/dominictarr/event-stream

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

			var remove_empty = function ( target ) {

			  Object.keys( target ).map( function ( key ) {

			    if ( target[ key ] instanceof Object ) {

			      if ( ! Object.keys( target[ key ] ).length && typeof target[ key ].getMonth !== 'function') {

			        delete target[ key ];

			      }

			      else {

			        remove_empty( target[ key ] );

			      }

			    }

			    else if ( target[ key ] === null || target[ key ] === '') {

			      delete target[ key ];

			    }

			  } );

			  return target;

			};

			remove_empty( content ); // Let's
			remove_empty( content ); // Do three
			remove_empty( content ); // Runs :D

			file.contents = new Buffer(JSON.stringify(content, null, "\t"));

			this.push(file);

		}
		return callback();
	}

	return through.obj(cleanJson);
};
