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
      {
        type: 'confirm',
        name: 'useBreakpoint',
        message: 'Would you like to include Breakpoint Sass?',
        default: true
      },
      {
        type: 'confirm',
        name: 'useSusy',
        message: 'Would you like to include the Susy Grid framework?',
        default: true
      },
    ];

    this.prompt(prompts, function (props) {
      this.themeName = props.themeName;
      this.themeId = _.snakeCase(props.themeId);
      this.themeDesc = props.themeDesc;
      this.useBreakpoint = props.useBreakpoint;
      this.useSusy = props.useSusy;
      done();
    }.bind(this));
  },

  copyMainFiles: function () {
    var context = {
      name: this.themeName,
      id: this.themeId,
      description: this.themeDesc
    };

    /**
     * Process .info file
     */
    this.template('_prototype.info', this.themeId + '.info', context);

    /**
     * Process .inc files
     */
    this.directory('inc');

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
  },

  installBower: function () {
    var options = {
          'config.directory': 'src/bower',
          'save': true
        },
        components = [];

    this.template('bower.json');
    this.copy('.bowerrc');

    if (this.useBreakpoint) components.push('compass-breakpoint');
    if (this.useSusy) components.push('susy');

    if (components.length <= 0) return;

    this.bowerInstall(components, options);
  }
});

module.exports = DrupalPrototypeGenerator;
