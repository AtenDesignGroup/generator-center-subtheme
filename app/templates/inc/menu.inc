<?php
/**
 * @file
 * Menu hooks.
 */

/**
 * Overrides theme_menu_tree().
 */
function <%= themeId %>_menu_tree__main_menu($variables) {
  return '<ul class="nav nav--main">' . $variables['tree'] . '</ul>';
}

/**
 * Implements hook_preprocess_menu_link().
 */
function <%= themeId %>_preprocess_menu_link(&$vars) {

  // Set shortcut variables. Hooray for less typing!
  $menu = $vars['element']['#original_link']['menu_name'];
  $mlid = $vars['element']['#original_link']['mlid'];
  $item_classes = &$vars['element']['#attributes']['class'];
  $link_classes = &$vars['element']['#localized_options']['attributes']['class'];

  // Add global classes to all menu links.
  $item_classes[] = 'nav-item';
  $link_classes[] = 'nav-link';
}
