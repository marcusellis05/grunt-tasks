"use strict";

module.exports = {

    // Concat All CrUX JS
    concat: {
      js: {
          src: ['<%= folders.libs %>/**/*.js']
        , dest: '<%= build.js %>/libs.js'
      }
    },

    // Minify All JS Files
    uglify: {
      options: {
          compress  : false
        , mangle    : false
        , sourceMap : true
        , report    : 'min'
      },
      libs: {
        files: {
          '<%= build.js %>/libs.min.js' : ['<%= build.js %>/libs.js']
        }
      },
      inferior: {
        files: {
          '<%= build.js %>/shims.min.js' : [
              '<%= folders.shims %>/es5-shim.js'
            , '<%= folders.shims %>/excanvas.js'
            , '<%= folders.shims %>/json2.js'
          ]
        }
      }
    }

};