'use strict';
var gulp = require('gulp');
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var _ = require('lodash');

var prompts = {
  themeName: 'Prototype',
  themeId: 'prototype',
  packageManager: 'bower',
  gridFramework: 'susy'
};

/**
 * Path to test theme
 * The default task will watch for changes to the templates directory
 * It will run the generator in the below path. This task will fail without this
 * variable set.
 */
// var pathToTestTheme = '/absolute/path/to/test/theme';

/**
 * Default task
 */
gulp.task('default', function () {
  gulp.watch('./app/templates/**/*', ['build']);
});

/**
 * Build task
 */
gulp.task('build', function () {
  helpers.run(path.join(__dirname, './app'))
    .inDir(pathToTestTheme)
    .withOptions({ 'skip-install': true })
    .withPrompt(prompts).
    on('end', function(){
      console.log('Generated in: ', pathToTestTheme);
    });
});
