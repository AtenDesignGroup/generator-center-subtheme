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
        type: 'list',
        name: 'packageManager',
        message: 'How would you like to manage external packages?',
        choices: [
            'Eyeglass',
            'Bower'
          ],
          default: 'Eyeglass',
          filter: function(val) { return val.toLowerCase();
        }
      },
      {
        type: 'confirm',
        name: 'useBreakpoint',
        message: 'Would you like to include Breakpoint Sass?',
        default: true
      },
      {
        type: 'list',
        name: 'gridFramework',
        message: 'Which grid framework would you like to use?',
        choices: [
            'Singularity',
            'Susy',
            'None'
          ],
          default: 'Singularity',
          filter: function(val) { return val.toLowerCase();
        }
      },
      {
        type: 'confirm',
        name: 'useStyleguide',
        message: 'Would you like to include Ken Woodworth\'s Static Styleguide?',
        default: true
      },
    ];

    this.prompt(prompts, function (props) {
      this.themeName = props.themeName;
      this.themeId = _.snakeCase(props.themeId);
      this.themeDesc = props.themeDesc;
      this.packageManager = props.packageManager;
      this.useBreakpoint = props.useBreakpoint;
      this.gridFramework = props.gridFramework;
      this.useStyleguide = props.useStyleguide;
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
    if (this.options['skip-install'] || this.packageManager !== 'bower') { return; }

    var options = {
        'config.directory': 'src/bower',
        'save': true,
      },
      components = [];

    this.template('bower.json');
    this.copy('.bowerrc');

    if (this.useBreakpoint) {
      components.push('compass-breakpoint');
    }

    switch (this.gridFramework) {
    case 'singularity':
      components.push('singularity');
      break;
    case 'susy':
      components.push('susy');
      break;
    }

    if (components.length <= 0) { return; }

    this.bowerInstall(components, options);
  },

  installNpmPackages: function () {
    if (this.options['skip-install'] || this.packageManager !== 'eyeglass') { return; }

    var exec = require('child_process').exec,
        components = [];

    components.push('eyeglass');

    if (this.useBreakpoint) {
      components.push('breakpoint-sass');
    }

    switch (this.gridFramework) {
    case 'singularity':
      components.push('singularitygs');
      break;
    case 'susy':
      components.push('susy');
      break;
    }

    function handleStd(error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    }

    function installComponent(component) {
      exec('npm install ' + component +' --save-dev', handleStd);
    }

    function installComponents(components) {
      _.forEach(components, installComponent);
    }

    if (components.length <= 0) { return; }

    installComponents(components);
  },

  copyStyleguide: function () {
    if (!this.useStyleguide) { return; }
    this.directory('styleguide');
  }
});

module.exports = DrupalPrototypeGenerator;
