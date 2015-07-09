<?php
/**
 * @file
 * Template stuff.
 */

/**
 * Include .inc files.
 */
$include_files = array(
  'block',
  'boxes',
  'breadcrumb',
  'comment',
  'field',
  'form',
  'menu',
  'node',
  'page',
);

foreach ($include_files as $filename) {
  include 'inc/' . $filename . '.inc';
}
