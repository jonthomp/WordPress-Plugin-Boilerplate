import React from "react";
import ReactDOM from "react-dom";

import initReactDomByClass from "./utils/initReactDomByClass";

import "../scss/wp-plugin-name-admin.scss";

import AddMediaButton from "./components/AddMediaButton.react";
import MetaBox from "./components/MetaBox.react";

(function($) {
  "use strict";

  /**
   * All of the code for your admin-facing JavaScript source
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
   * The file is enqueued from inc/admin/class-admin.php.
   */

  $(function() {
    initReactDomByClass("wp-plugin-name-add-media-button", AddMediaButton);
    initReactDomByClass("wp-plugin-name-custom-post-meta-box", MetaBox);
  });
})(jQuery);
