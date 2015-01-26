"use strict";

var gruntTasks = require('grunt-tasks');

module.exports = function(grunt) {

  gruntTasks(grunt, {
    tasks: 'grunt/tasks/*.js',  // this line could be omitted as this matches the default
    config: 'grunt/config.js',
    aliases: 'grunt/aliases.js'
  });

};