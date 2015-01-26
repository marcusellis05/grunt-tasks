"use strict";

module.exports = {

    // Concat All CrUX JS & CSS
    concat: {
      css: {
          src: ['<%= folders.libs %>/**/*.css']
        , dest: '<%= build.css %>/libs.css'
      }
    },

    // Compile LESS into CSS
    less: {
      options: {
          sourceMap: true
        , outputSourceFiles: true
      },
      all: {
        files: {
            '<%= build.css %>/mobile.css'  : 'public/less/mobile/index.less'
          , '<%= build.css %>/desktop.css' : 'public/less/desktop/index.less'
          , '<%= build.css %>/ie.css'      : 'public/less/desktop/ie.less'
          , '<%= build.css %>/print.css'   : 'public/less/print/index.less'
          , '<%= build.css %>/tablet.css'  : 'public/less/tablet/index.less'
        }
      }
    },

    // Automatically Prefix where Necessary
    autoprefixer: {
      options: {
          browsers: ['last 2 version', 'ie 8', 'ie 9']
        , mapInline: true
      },
      all: {
        files: {
            '<%= build.css %>/mobile.css'  : '<%= build.css %>/mobile.css'
          , '<%= build.css %>/desktop.css' : '<%= build.css %>/desktop.css'
          , '<%= build.css %>/ie.css'      : '<%= build.css %>/ie.css'
          , '<%= build.css %>/print.css'   : '<%= build.css %>/print.css'
          , '<%= build.css %>/tablet.css'  : '<%= build.css %>/tablet.css'
        }
      }
    },

    // Concat & Minify CSS
    cssmin: {
      app: {
        files: {
            '<%= build.css %>/desktop.min.css'    : ['<%= build.css %>/libs.css', '<%= build.css %>/desktop.css']
          , '<%= build.css %>/desktop.ie.min.css' : ['<%= build.css %>/libs.css', '<%= build.css %>/desktop.css', '<%= build.css %>/ie.css']
          , '<%= build.css %>/mobile.min.css'     : ['<%= build.css %>/libs.css', '<%= build.css %>/mobile.css']
          , '<%= build.css %>/tablet.min.css'     : ['<%= build.css %>/libs.css', '<%= build.css %>/tablet.css']
          , '<%= build.css %>/print.min.css'      : ['<%= build.css %>/print.css']
        }
      }
    }

};