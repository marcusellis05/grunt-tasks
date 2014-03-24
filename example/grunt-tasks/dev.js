"use strict";

var fs = require('fs')
  , jshintrc = JSON.parse(fs.readFileSync('.jshintrc', 'utf8'))

module.exports = {

    // JShint all custom JavaScript files
    jshint: {
      all: {
        options: jshintrc,
        files: {
          src: ['<%= files.grunt %>', '<%= files.js %>', '<%= files.helpers %>']
        }
      }
    },


    // Compile Handlebars Files
    handlebars: {
      compile: {
        options: {
          namespace   : 'Handlebars.templates',
          wrapped     : true,
          processName : function(filename){
            var no_ext = filename.replace('.hbs', '')
              , parts = no_ext.split('/')
              , space = parts.slice(3);

            if (space[space.length-1] === 'index') {
              space.pop();
            }

            return space.join('_');
          }
        },
        files: {
            '<%= build.hbs %>/core.js'    : 'public/handlebars/core/**/*.hbs'
          , '<%= build.hbs %>/desktop.js' : 'public/handlebars/desktop/**/*.hbs'
          , '<%= build.hbs %>/mobile.js'  : 'public/handlebars/mobile/**/*.hbs'
          , '<%= build.hbs %>/print.js'   : 'public/handlebars/print/**/*.hbs'
          , '<%= build.hbs %>/tablet.js'  : 'public/handlebars/tablet/**/*.hbs'
        }
      }
    },


    // Define "watch" tasks
    watch: {
      options: {
        livereload: true
      },
      jshint_main: {
          files: ['<%= files.grunt %>', '<%= files.js %>', '<%= files.helpers %>']
        , tasks: ['jshint:main']
      },
      handlebars: {
          files: ['<%= files.hbs %>']
        , tasks: ['handlebars']
      },
      less: {
          files: ['<%= files.less %>']
        , tasks: ['less']
      }
    }

};