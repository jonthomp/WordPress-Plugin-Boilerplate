<?php

/**
 * Provide a settings page for the plugin
 *
 * This file is used to markup the admin settings page
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @author    Your Name or Your Company
 */

?>

<?php function render_wp_plugin_name_admin_settings(){ ?>
    <div class="wrap">
        <h2>Custom Settings</h2>

        <form method="post" action="options.php">
            <?php settings_fields( 'wp-plugin-name-settings-group' ); ?>
            <?php do_settings_sections( 'wp-plugin-name-settings-group' ); ?>
            
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Enable something?</th>
                    <td>
                        <input type="checkbox" name="enable_something" value="checked" <?php if(esc_attr( get_option('enable_something') ) === 'checked'): ?>checked="checked"<?php endif; ?> />
                    </td>
                </tr>
            </table>
            
            <?php submit_button(); ?>

        </form>
    </div>
<?php } ?>