<?php

namespace WP_Plugin_Name\Inc\Frontend;

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @author    Your Name or Your Company
 */
class Frontend {

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
	public function __construct( $plugin_name, $version, $plugin_text_domain, $environment) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
		$this->plugin_text_domain = $plugin_text_domain;
		$this->environment = $environment;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
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
			wp_enqueue_style( $this->plugin_name, 'http://localhost:9001/assets/build/css/test-one-frontend.css', array( ), time(), false );
		}
		else {
			wp_enqueue_style( $this->plugin_name, plugins_url( $this->plugin_name . '/assets/build/css/test-one-frontend.css' ), array(), $this->version, 'all' );
		}
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

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
			wp_enqueue_script( $this->plugin_name, 'http://localhost:9001/assets/build/js/test-one-frontend.js', array( 'jquery' ), time(), false );
		}
		else{
			wp_enqueue_script( $this->plugin_name, plugins_url( $this->plugin_name . '/assets/build/js/test-one-frontend.js' ), array( 'jquery' ), $this->version, false );
		}
	}

	/**
	 * Register a custom shortcode
	 *
	 * @since    1.0.0
	 */
	public function create_shortcode(){
		
		add_shortcode( 'custom_shortcode', function ($atts) {
			$attributes = shortcode_atts( array(
				'value' => null,
			  ), $atts );
		
			return "<div class='test-one-shortcode' data-props='".json_encode($attributes)."'></div>";
		} );
	}

}
