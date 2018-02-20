/*global describe, it*/
"use strict";

const fs = require("fs");
const es = require("event-stream");
const should = require("should");

require("mocha");

delete require.cache[require.resolve("../")];

const gutil = require("gulp-util");
const cleanJson = require("../");

describe("gulp-clean-json", function() {

	let filenames = [
		'hello.json',
		'nested.json',
		'deep-nested.json'
	];
	for (let fn of filenames) {
		it("should produce expected file `" + fn + "` via buffer", function(done) {

			let srcFile = new gutil.File({
				path: "test/fixtures/" + fn,
				cwd: "test/",
				base: "test/fixtures",
				contents: fs.readFileSync("test/fixtures/" + fn)
			});

			let expectedFile = new gutil.File({
				path: "test/expected/" + fn,
				cwd: "test/",
				base: "test/expected",
				contents: fs.readFileSync("test/expected/" + fn)
			});

			let stream = cleanJson("World");

			stream.on("error", function(err) {
				should.exist(err);
				done(err);
			});

			stream.on("data", function(newFile) {

				should.exist(newFile);
				should.exist(newFile.contents);

				let actual = JSON.parse(String(newFile.contents));
				let expected = JSON.parse(String(expectedFile.contents));
				should.deepEqual(actual, expected);
				done();
			});

			stream.write(srcFile);
			stream.end();
		});
	}

	it("should error on stream", function(done) {

		var expectedFile = new gutil.File({
			path: "test/expected/hello.txt",
			cwd: "test/",
			base: "test/expected",
			contents: fs.readFileSync("test/expected/hello.txt")
		});

		var srcFile = new gutil.File({
			path: "test/fixtures/hello.txt",
			cwd: "test/",
			base: "test/fixtures",
			contents: fs.createReadStream("test/fixtures/hello.txt")
		});

		var stream = cleanJson("World");

		stream.on("error", function(err) {
			should.exist(err);
			done();
		});

		stream.on("data", function(newFile) {
			newFile.contents.pipe(es.wait(function(err, data) {
				done(err);
			}));
		});

		stream.write(srcFile);
		stream.end();
	});
});