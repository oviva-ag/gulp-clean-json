(PLUGIN AUTHOR: Please read [Plugin README conventions](https://github.com/wearefractal/gulp/wiki/Plugin-README-Conventions), then delete this line)

# gulp-clean-json
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

> clean-json plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-clean-json` as a development dependency:

```shell
npm install --save-dev gulp-clean-json
```

Then, add it to your `gulpfile.js`:

```javascript
var clean-json = require("gulp-clean-json");

gulp.src("./src/*.ext")
	.pipe(clean-json({
		msg: "Hello Gulp!"
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### clean-json(options)

#### options.msg
Type: `String`  
Default: `Hello World`

The message you wish to attach to file.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-clean-json
[npm-image]: https://badge.fury.io/js/gulp-clean-json.png

[travis-url]: http://travis-ci.org/arturkp/gulp-clean-json
[travis-image]: https://secure.travis-ci.org/arturkp/gulp-clean-json.png?branch=master

[coveralls-url]: https://coveralls.io/r/arturkp/gulp-clean-json
[coveralls-image]: https://coveralls.io/repos/arturkp/gulp-clean-json/badge.png

[depstat-url]: https://david-dm.org/arturkp/gulp-clean-json
[depstat-image]: https://david-dm.org/arturkp/gulp-clean-json.png
