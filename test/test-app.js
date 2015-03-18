'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var _ = require('lodash');

var prompts = {
  themeName: 'Prototype Test',
  themeId: 'prototype-test'
};

var snakeThemeId = _.snakeCase(prompts.themeId);

describe('drupal-prototype:files', function () {
  this.timeout(15000);

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt(prompts)
      .on('end', done);
  });

  it('Copies files', function () {
    assert.file([
      snakeThemeId + '.info',
      'template.php',
      'screenshot.png',
      'logo.png',
      '.gitignore',
      'polyfills/boxsizing.htc',
      'src/js/main.js',
      'src/scss/screen.scss',
    ]);
  });

  it('Creates .inc files', function () {
    assert.file([
      'inc/block.inc',
      'inc/field.inc',
      'inc/form.inc',
      'inc/menu.inc',
      'inc/node.inc',
    ]);

    // Check preprocess function names.
    assert.fileContent([
      ['inc/block.inc', snakeThemeId + '_preprocess_block'],
      ['inc/field.inc', snakeThemeId + '_preprocess_field'],
      ['inc/form.inc', snakeThemeId + '_form_alter'],
      ['inc/menu.inc', snakeThemeId + '_menu_tree__main_menu'],
      ['inc/menu.inc', snakeThemeId + '_preprocess_menu_link'],
      ['inc/node.inc', snakeThemeId + '_preprocess_node'],
      ['inc/page.inc', snakeThemeId + '_preprocess_page'],
    ]);

  });
});

describe('drupal-prototype:bower', function () {
  this.timeout(30000);

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': false })
      .withPrompt(prompts)
      .on('end', done);
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

describe('drupal-prototype:styleguide', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': false })
      .withPrompt(prompts)
      .on('end', done);
  });

  it('Copies styleguide', function (done) {
    assert.file([
      'styleguide/index.php'
    ]);

    done();
  });
});

