<?php
/**
 * @file
 * Template stuff.
 */

/**
 * Scan and include all files in the /inc directory ending in .inc.
 */
$files = file_scan_directory(__DIR__ . '/inc', '/.inc/');
foreach ($files as $filepath => $file) {
  include $filepath;
}
