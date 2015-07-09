<?php

/**
 * Comments
 */

/**
 * Implements theme_preprocess_comment().
 */
function <%= themeId %>_preprocess_comment(&$vars) {
  $comment = $vars['elements']['#comment'];
  $uri = entity_uri('comment', $comment);
  $uri['options'] += array('attributes' => array(
    'class' => array('link--permalink'),
    'rel' => 'bookmark',
  ));

  $vars['permalink'] = l(t('link'), $uri['path'], $uri['options']);
  $vars['submitted'] = '<em class="comment-attribution">' . t('by') . '</em> ' . t('!username on !datetime',
    array(
      '!username' => $vars['author'],
      '!datetime' => $vars['created'])
  );
  $vars['content']['links']['#attributes']['class'][] = 'comment-links';
  $vars['content']['links']['#attributes']['class'][] = 'comment-nav';
}
