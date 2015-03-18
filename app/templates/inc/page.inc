<?php

/**
 * Implements hook_preprocess_page()
 */
function <%= themeId %>_preprocess_page(&$vars) {
  $preprocesses = array();

  // Set default page title behavior.
  $vars['show_title'] = TRUE;

  // Preprocess node pages by type.
  if (isset($vars['node'])) {
    $preprocesses[] = $vars['node']->type;
    $node_type = $vars['node']->type;
    $vars['theme_hook_suggestions'][] = 'page__' . $node_type;
  }

  center_preprocessors($vars, __FUNCTION__, $preprocesses);
}
