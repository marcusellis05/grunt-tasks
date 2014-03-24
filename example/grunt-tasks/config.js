"use strict";

module.exports = {

    pkg: '<json:package.json>',
    folders: {
        libs      : ['public/js/libs']
      , shims     : ['public/js/shims']
      , build     : ['public/build']
    },
    build: {
        css       : ['<%= folders.build %>/css']
      , hbs       : ['<%= folders.build %>/handlebars']
      , js        : ['<%= folders.build %>/js']
    },
    files: {
        grunt     : ['gruntfile.js', 'grunt-tasks/*.js']
      , hbs       : ['public/handlebars/**/*.hbs']
      , less      : ['public/less/**/*.less']
      , js        : ['public/js/app/**/*.js']
      , helpers   : ['public/js/handlebars/*.js']
      , imgs      : ['public/images/*.png']
    }

};
