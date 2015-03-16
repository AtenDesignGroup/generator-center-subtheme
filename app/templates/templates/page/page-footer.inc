<div id="footer">
  <div class="l--constrained clearfix">
    <?php print render($page['footer']); ?>
  </div>
</div>

<?php if ($page['admin_footer']): ?>
  <div id="admin-footer" class="l--constrained">
    <?php print render($page['admin_footer']); ?>
  </div>
<?php endif; // end admin_footer ?>
