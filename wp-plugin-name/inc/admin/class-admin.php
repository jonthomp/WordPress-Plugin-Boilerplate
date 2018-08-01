<?php

namespace WP_Plugin_Name\Inc\Admin;

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @author    Your Name or Your Company
 */
class Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * The text domain of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_text_domain    The text domain of this plugin.
	 */
	private $plugin_text_domain;

	/**
	 * The current environment of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $environment    The current environment of this plugin.
	 */
	private $environment;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since       1.0.0
	 * @param       string $plugin_name        The name of this plugin.
	 * @param       string $version            The version of this plugin.
	 * @param       string $plugin_text_domain The text domain of this plugin.
	 */
	public function __construct( $plugin_name, $version, $plugin_text_domain, $environment ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
		$this->plugin_text_domain = $plugin_text_domain;
		$this->environment = $environment;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		if($this->environment == 'development'){
			wp_enqueue_style( $this->plugin_name, 'http://localhost:9001/assets/build/css/wp-plugin-name-admin.css', array(), time(), false );
		}
		else {
			wp_enqueue_style( $this->plugin_name, plugins_url( $this->plugin_name . '/assets/build/css/wp-plugin-name-admin.css' ), array(), $this->version, 'all' );
		}

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {
		/*
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		if($this->environment == 'development'){
			wp_enqueue_script( $this->plugin_name, 'http://localhost:9001/assets/build/js/wp-plugin-name-admin.js', array( 'jquery' ), $this->version, false );
		}
		else{
			wp_enqueue_script( $this->plugin_name, plugins_url( $this->plugin_name . '/assets/build/js/wp-plugin-name-admin.js' ), array( 'jquery' ), $this->version, false );
		}
		

	}

	public function register_plugin_settings(){
		register_setting( 'wp-plugin-name-settings-group', 'enable_something' );
	}

	public function add_plugin_admin_menu(){
		require_once 'views/html-wp-plugin-name-admin-settings.php';

		add_options_page( 'Custom Settings', 'Custom Settings', 'administrator', 'wp-plugin-name', 'render_wp_plugin_name_admin_settings');
	}

	public function add_custom_post_meta_boxes($post){
		require_once 'views/html-wp-plugin-name-custom-post-meta-box.php';

		add_meta_box( 
			'wp-plugin-name-custom-post-meta-box',
			__( 'Custom Field' ),
			'render_wp_plugin_name_custom_post_meta_box',
			'custom-post-type',
			'normal',
			'default'
		);
	}

	public function save_meta_box_data( $post_id ){
		
		if ( ! current_user_can( 'edit_post', $post_id ) ){
			return;
		}

		if( isset( $_POST['_custom_field'] ) ){
			$custom_field = $_POST['_custom_field'];
			
			$result = update_post_meta( $post_id, '_custom_field', $custom_field );
			
		}
		else{
			// delete data
			delete_post_meta( $post_id, '_custom_field' );
		}
	}

	public function add_media_button($editor_id){
		
		echo "<div style='display:inline-block;' class='wp-plugin-name-add-media-button'></div>";
	}

}
