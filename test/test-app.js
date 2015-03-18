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
  this.timeout(15000);

  var prompts = {
    themeName: 'Proto Test',
    themeId: 'proto-test'
  };

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': false })
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
      'src/scss/screen.scss',
    ]);
  });

  it('Installs Bower Components', function (done) {
    assert.file([
      '.bowerrc',
      'src/bower/susy/bower.json',
      'src/bower/compass-breakpoint/bower.json',
    ]);

    assert.fileContent('bower.json', 'version');
    done();
  });

  it('Updates bower.json', function (done) {
    assert.file('bower.json');
    assert.fileContent([
      ['bower.json', 'compass\-breakpoint'],
      ['bower.json', 'susy'],
      ['bower.json', '"name": "' + prompts.themeName + '"'],
    ]);
    done();
  });
});

