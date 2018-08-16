import React from "react";
import ReactDOM from "react-dom";

import initReactDomByClass from "./utils/initReactDomByClass";

import "../scss/test-one-frontend.scss";

import Shortcode from "./components/Shortcode.react";

(function($) {
  "use strict";

  /**
   * All of the code for your public-facing JavaScript source
   * should reside in this file.
   *
   * Note: It has been assumed you will write jQuery code here, so the
   * $ function reference has been prepared for usage within the scope
   * of this function.
   *
   * This enables you to define handlers, for when the DOM is ready:
   *
   * $(function() {
   *
   * });
   *
   * When the window is loaded:
   *
   * $( window ).load(function() {
   *
   * });
   *
   * ...and/or other possibilities.
   *
   * Ideally, it is not considered best practise to attach more than a
   * single DOM-ready or window-load handler for a particular page.
   * Although scripts in the WordPress core, Plugins and Themes may be
   * practising this, we should strive to set a better example in our own work.
   *
   * The file is enqueued from inc/frontend/class-frontend.php.
   */
  $(function() {
    initReactDomByClass("test-one-shortcode", Shortcode);
  });
})(jQuery);
