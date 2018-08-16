<?php function render_test_one_custom_post_meta_box($post){ ?>
    <?php
        $custom_field_value = get_post_meta( $post->ID, '_custom_field', true );
   ?>
    <div class='test-one-custom-post-meta-box' data-props='{ "fieldValue": "<?php echo $custom_field_value; ?>" }'></div>
<?php } ?>