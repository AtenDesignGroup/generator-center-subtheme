<?php
/**
 * @file
 * Boxes hooks.
 */

/**
 * Implements theme_boxes_box.
 */
function <%= themeId %>_boxes_box($variables) {
  $block = $variables['block'];

  $empty = '';

  // Box is empty
  if ((empty($block['title']) || ($block['title'] == '<none>') ) && empty($block['content'])) {

    // add a class to mark the box as empty
    $empty = ' box-empty';

    // show something if the block is empty but the user has the permission to edit it
    if (boxes_access_edit()) {
      $block['content'] = t('This box appears empty when displayed on this page. This is simply placeholder text.');
    }
    else {
      return;
    }
  }

  $output = $block['content'];
  return $output;
}
