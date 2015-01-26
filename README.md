# Grunt Tasks

*No more monolithic Gruntfile.* 

Gruntfiles typically have 4 sections:

  1. Define some variables to be interpolated into configuration later on.
  2. Configure some Grunt tasks.
  3. Load Grunt task modules. Example: `grunt.loadNpmTasks('grunt-contrib-watch');`
  4. Register some task aliases. Example: `grunt.registerTask('js', ['jshint', 'concat', 'uglify']);`

This can lead to rather lengthy Gruntfiles. The 'grunt-tasks' module allows to to break-up your Gruntfile into multiple modules organized any way you would like. It loads files containing Grunt task definitions via [globbing][glob] patterns (#2). Variables (#1) and aliases (#4) can be set as object literals or can be specified as paths to .js files that contain those settings. It also uses the [load-grunt-tasks][lgt] module to automatically find and load npm Grunt modules (#3), and uses the [time-grunt][tg] module to report on how long each task is taking to run.


## Installation

Install with npm:

    $ npm install --save-dev grunt-tasks


## Usage

First, let's assume we have a file structure that looks like this:

  * grunt/
    * config.js
    * tasks/
      * dev.js
      * scripts.js
      * styles.js
  * lib/
  * public/
  * gruntfile.js
  * package.json


Now, our Gruntfile should be fairly simple. We require in 'grunt-tasks' and then in our exported function, we call 'grunt-tasks' with 2 parameters: 1) the 'grunt' object and 2) our options object.  Example:

    var gruntTasks = require('grunt-tasks');

    module.exports = function(grunt) {
      gruntTasks(grunt, {
          tasks: 'grunt/tasks/*.js'
        , config: 'grunt/config.js'
        , aliases: {
              'js'       : ['concat:scripts', 'concat:cruxjs', 'uglify']
            , 'css'      : ['less', 'concat:styles', 'cssmin']
            , 'build'    : ['handlebars', 'css', 'js']
            , 'base'     : ['jshint', 'handlebars', 'less']
            , 'default'  : ['base', 'watch']
          }
      });
    };

Take a look at the `example` folder of this package for a more detailed implementation example.


### Property Merging

It's important to note that 'grunt-tasks' does a 2-level-deep merge of properties found in the task definition files. This means you can have a 'concat:css' task defined in one file and a 'concat:js' task in another. However, the sub-task name (ie, 'css' or 'js' in the previous example) must be unique, or one will overwrite the other.

Your config option (whether it's an object literal or a filepath) will be loaded before the tasks. Any matching properties in the task definition files will overwrite your configuration properties.


## Options

### tasks

Type: String | Array

Default: 'grunt/tasks/*.js' 

The 'tasks' option should be a [globbing][glob] pattern or a list of globbing patterns that map to your list of task definition modules.


### config

Type: String | Object

Default: {}

Grunt allows you to set some config properties that are not necessarily task definitions. You can use these values in your task defintions as interpolated values using the `<%= some.prop %>` syntax. Use the 'config' option to configure those properties. Or you can specify a file path to a .js file that exports an object literal with the same properties.


### aliases

Type: String | Object

Default: {}

For aliases, you can pass an object literal where the key is the name to be used for the task alias and the value is an array of task names. Or you can specify the path to a file that exports a similarly formed object.


### exclude

Type: String | Array

Default: [] 

The [globbing][glob] pattern(s) specifed for excludes will be excluded from your Grunt configuration. If you specify filepaths for the 'config' and/or 'aliases' options, those files will be automatically excluded; you don't need to list them here.


### lgtOptions

Type: Object

Default: { pattern: ['grunt-*', '@*/grunt-*'] }

See the [load-grunt-tasks][lgt] documentation for configuration options.



[lgt]: https://www.npmjs.org/package/load-grunt-tasks
[tg]: https://www.npmjs.com/package/time-grunt
[glob]: https://www.npmjs.org/package/globule


## License

Copyright (c) 2014 Marcus Ellis. See the LICENSE file for license rights and limitations (MIT).
