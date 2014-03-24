"use strict";

module.exports = {

  // Register Build Tasks
    'js'       :['concat:js', 'uglify']
  , 'css'      :['less', 'autoprefixer', 'concat:css', 'cssmin']
  , 'build'    :['handlebars', 'css', 'js']

  // Register Dev Tasks
  , 'base'     :['jshint', 'handlebars', 'less']
  , 'default'  :['base', 'watch']

};