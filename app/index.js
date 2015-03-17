'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var _  = require('lodash');

var DrupalPrototypeGenerator = yeoman.generators.Base.extend({
  promptUser: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    var prompts = [
      {
        name: 'themeName',
        message: 'What is your theme\'s name?',
        default: _.startCase(this.appname)
      },
      {
        name: 'themeId',
        message: 'What is your theme\'s machine name?',
        default: _.snakeCase(this.appname)
      },
      {
        name: 'themeDesc',
        message: 'What is your theme\'s description?',
        default: 'A custom theme implemtation for ' + _.startCase(this.appname) + '. Based on the Prototype starter theme.'
      },
    ];

    this.prompt(prompts, function (props) {
      this.themeName = props.themeName;
      this.themeId = props.themeId;
      this.themeDesc = props.themeDesc;
      done();
    }.bind(this));
  },

  copyMainFiles: function () {
    var that = this;

    var context = {
      name: this.themeName,
      id: this.themeId,
      description: this.themeDesc
    };

    /**
     * Process Inc Files
     */
    var incFiles = [
      'block',
      'field',
      'form',
      'menu',
      'node'
    ];

    function processIncFile(file) {
      that.template('inc/_' + file + '.inc', 'inc/' + file + '.inc', context);
    };

    function processIncFiles(files) {
      _.forEach(files, processIncFile);
    };

    processIncFiles(incFiles);

    /**
     * Process .info file
     */
    this.template('_prototype.info', this.themeId + '.info', context);

    /**
     * Process static directories and files
     */
    this.copy('template.php');
    this.copy('screenshot.png');
    this.copy('logo.png');
    this.copy('.gitignore');
    this.directory('polyfills');
    this.directory('src');
    this.directory('templates');
  }
});

module.exports = DrupalPrototypeGenerator;
