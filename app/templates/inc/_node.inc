<?php

/**
 * Implements hook_preprocess_node()
 */
function <% id %>_preprocess_node(&$vars) {

  // Set shortcut variables. Hooray for less typing!
  $type = $vars['type'];
  $mode = $vars['view_mode'];
  $classes = &$vars['classes_array'];
  $title_classes = &$vars['title_attributes_array']['class'];
  $content_classes = &$vars['content_attributes_array']['class'];

  // Uncomment the lines below to see variables you can use to target a field.
  // This requires http://drupal.org/project/devel to be installed.
  // dpm($type, 'Type:');
  // dpm($mode, 'Mode:');

  // Example: Adding a classes base on view mode.
  // switch ($mode) {
  //   case 'photo_teaser':
  //     $classes[] = 'bg-white gutters-half l-space-trailing';
  //     break;
  // }
}
