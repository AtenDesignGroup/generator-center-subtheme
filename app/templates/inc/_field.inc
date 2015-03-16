<?php

/**
 * @file
 * Field hooks.
 */

/**
 * Implements hook_preprocess_field().
 */
function <%= id %>_preprocess_field(&$vars) {

  // Set shortcut variables. Hooray for less typing!
  $name = $vars['element']['#field_name'];
  $bundle = $vars['element']['#bundle'];
  $mode = $vars['element']['#view_mode'];
  $classes = &$vars['classes_array'];
  $title_classes = &$vars['title_attributes_array']['class'];
  $content_classes = &$vars['content_attributes_array']['class'];
  $item_classes = array();

  // Global field styles.
  $classes = array(
    'field',
    'field--' . str_replace('_', '-', $name),
  );
  $title_classes = array('field-label');
  $content_classes = array('field-items');
  $item_classes = array('field-item');

  // Handle inline label classes.
  if (!$vars['label_hidden'] && $vars['element']['#label_display'] == 'inline') {
    $classes[] = 'field--inline-label';
  }

  // Uncomment the lines below to see variables you can use to target a field.
  // This requires http://drupal.org/project/devel to be installed.
  // dpm($name, 'Name:');
  // dpm($bundle, 'Bundle:');
  // dpm($mode, 'Mode:');

  // Example: Using an alternative theme function.
  // if($name == 'field_tags') {
  //   $vars['theme_hook_suggestions'][] = 'field__custom_separated';
  // }

  // Apply odd or even classes along with our custom classes to each item.
  foreach ($vars['items'] as $delta => $item) {
    $vars['item_attributes_array'][$delta]['class'] = $item_classes;
    $striping = $delta % 2 ? 'even' : 'odd';
    $vars['item_attributes_array'][$delta]['class'][] = $striping;
  }
}
