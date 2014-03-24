"use strict";

var globule = require('globule')
  , path = require('path')
  , _ = require('lodash');



var arrayify = function(el) {
  return Array.isArray(el) ? el : [el];
};


var createGlob = function(options){
  var glob = []
    , tasks = arrayify(options.tasks)
    , exclude = arrayify(options.exclude)
    , config = typeof options.config === 'string' ? '!' + options.config : null
    , aliases = typeof options.aliases === 'string' ? '!' + options.aliases : null;

  exclude.forEach(function(ex, i){
    exclude[i] = '!' + ex;
  });

  glob = glob.concat(tasks, exclude);

  if (config && glob.indexOf(config) === -1){
    glob.push(config);
  }
  if (aliases && glob.indexOf(aliases) === -1){
    glob.push(aliases);
  }

  return glob;
};


var configureVars = function(config){
  if (typeof config === 'string'){
    config = path.join(process.cwd(), config);
    config = require(config);
  }
  return config;
};


var configureTasks = function(config, glob){
  var files = globule.find({
          src: glob
        , srcBase: process.cwd()
      });

  files.forEach(function(file, i){
    var filepath = path.join(process.cwd(), file)
      , defs = require(filepath);

    _.forOwn(defs, function(def, key){
        if (config[key] === undefined){
          config[key] = def;
        } else {
          _.forOwn(def, function(val, k){
            config[key][k] = val;
          });
        }
    });
  });

  return config;
};


var loadGruntTasks = function(grunt, options){
  var lgt = require('load-grunt-tasks');

  if (!options.pattern || options.pattern.length === 0){
    options.pattern = ['grunt-*']
  }
  options.pattern.push('!grunt-tasks');
  
  lgt(grunt, options);
}


var registerAliases = function(grunt, aliases){
  if (typeof aliases === 'string'){
    aliases = path.join(process.cwd(), aliases);
    aliases = require(aliases);
  }

  _.forOwn(aliases, function(value, key){
    grunt.registerTask(key, value);
  });
};


module.exports = function(grunt, opts){
  var options = {}
    , config = {}
    , glob = []
    , defaults = {
          config: {}
        , tasks: ['grunt-tasks/*.js']
        , exclude: []
        , aliases: {}
        , lgtOptions: {}
      };

  options = _.assign({}, defaults, opts);

  glob = createGlob(options);

  config = configureVars(options.config);
  config = configureTasks(config, glob);

  grunt.initConfig(config);

  loadGruntTasks(grunt, options.lgtOptions);

  registerAliases(grunt, options.aliases);
};

