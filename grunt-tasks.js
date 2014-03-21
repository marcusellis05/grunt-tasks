"use strict";

var loadGruntTasks = require('load-grunt-tasks')
  , globule = require('globule')
  , path = require('path');

/*

  gruntTasks(grunt, {
      config:   <string of path to file>   - OR - <object literal of config values>
    , tasks:    <globbing pattern for files>
    , aliases:  <string of path to file>   - OR - <object literal of aliases>
  });
  

  ### Task Configuration
  


  ### Task Aliases
  For aliases, you can pass an object literal where the key is the name to be used for 
      the task alias and the value is an array of task names.

      Example: 

        aliases: {
          'css' : ['concat:css', 'less', 'autoprefixer', 'cssmin'],
          'js'  : ['jshint', 'concat:js', 'uglify']
        }

  Optionally, you can specify the path to a `.js` file that exports an object literal.

      Example: 

        aliases: 'grunt-tasks/aliases.js'

*/

var arrayify = function(el) {
  return Array.isArray(el) ? el : [el];
};


var createPattern = function(options){
  var pattern = []
    , tasks = arrayify(options.tasks)
    , exclude = arrayify(options.exclude)
    , config = typeof options.config === 'string' ? '!' + options.config : null
    , aliases = typeof options.aliases === 'string' ? '!' + options.aliases : null;

  exclude.forEach(function(ex, i){
    exclude[i] = '!' + ex;
  });

  pattern = pattern.concat(tasks, exclude);

  if (config && pattern.indexOf(config) === -1){
    pattern.push(config);
  }
  if (aliases && pattern.indexOf(aliases) === -1){
    pattern.push(aliases);
  }

  return pattern;
};


var configureVars = function(config){
  if (typeof config === 'string'){
    config = path.join(process.cwd(), config);
    config = require(config);
  }
  return config;
};


var configureTasks = function(config, pattern){
  var files = globule.find({
          src: pattern
        , srcBase: process.cwd()
      });

  files.forEach(function(file, i){
    var filepath = path.join(process.cwd(), file)
      , def = require(filepath);

    for (var key in def){
      if (def.hasOwnProperty(key)){
        var val = def[key];
        if (config[key] === undefined){
          config[key] = val;
        } else {
          for (var k in val){
            if (val.hasOwnProperty(k)){
              config[key][k] = val[k];
            }
          }
        }
      }
    }
  });

  return config;
};


var registerAliases = function(grunt, aliases){
  if (typeof aliases === 'string'){
    aliases = path.join(process.cwd(), aliases);
    aliases = require(aliases);
  }

  for (var key in aliases){
    if (aliases.hasOwnProperty(key)){
      grunt.registerTask(key, aliases[key]);
    }
  }
};


module.exports = function(grunt, opts){
  var options = {}
    , config = {}
    , pattern = []
    , defaults = {
          config: {}
        , tasks: ['grunt-tasks/*.js']
        , exclude: []
        , aliases: []
      };

  options = _.assign({}, defaults, opts);

  pattern = createPattern(options);

  config = configureVars(options.config);
  config = configureTasks(config, pattern);

  grunt.initConfig(config);

  loadGruntTasks(grunt);

  registerAliases(grunt, options.aliases);
};

