<?php
/**
 * @file
 * Breadcrumb hooks.
 */

/**
 * Implements theme_breadcrumb().
 */
function <%= themeId %>_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];
  if (!empty($breadcrumb)) {
    // Provide a navigational heading to give context for breadcrumb links to
    // screen-reader users. Make the heading invisible with .element-invisible.
    $output = '<h2 class="breadcrumb-label element-invisible">' . t('You are here') . '</h2>';
    $crumbs = '<ul class="breadcrumb-list">';
    $array_size = count($breadcrumb);
    $i = 0;
    while ( $i < $array_size) {
      $class = NULL;
      if ($i == 0) {
        $class = ' first';
      }
      $crumbs .= '<li class="breadcrumb-item' . $class .'">' . $breadcrumb[$i] . '</li>';
      $i++;
    }
    $crumbs .= '<li class="breadcrumb-item active last">'. drupal_get_title() .'</li>';
    $crumbs .= '</ul>';
    return $crumbs;
  }
}
