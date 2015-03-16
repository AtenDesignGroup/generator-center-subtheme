'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
/*global describe, before, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('drupal-prototype:app', function () {
  var prompts = {
    themeName: 'Proto Test',
    themeId: 'proto-test'
  };

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt(prompts)
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      prompts.themeId + '.info',
      'template.php',
      'screenshot.png',
      'logo.png',
      '.gitignore',
      'inc/block.inc',
      'inc/field.inc',
      'inc/form.inc',
      'inc/menu.inc',
      'inc/node.inc',
      'polyfills/boxsizing.htc',
      'src/js/main.js',
      'src/scss/screen.scss'
    ]);
  });
});

