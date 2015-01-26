/*
 * grunt-tasks
 * http://github.com/marcusellis05/grunt-tasks
 *
 * Copyright (c) 2014 Marcus Ellis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    
    jshint: {
      all: {
        files: {
          src: ['*.js']
        },
        options: {
          jshintrc: '.jshintrc'
        }
      }
    },

    watch: {
      jshint: {
          files: ['*.js']
        , tasks: ['jshint']
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);

};
