/**
 * Global configuration data
 */
global.$ = require('jquery');
global.jQuery = require('jquery');
global._ = require('underscore');
global.moment = require('moment');
//require('jquery-validation');//validation
require('./lib/bootstrap.css');
require('./lib/bootstrap');
require('./lib/fontawesome');
require('./lib/jquery');

console.log('App start');
// Require some styles that are loaded globally
//require('bootstrap');

import Backbone from 'backbone';

/**
 * Start the Application
 */
import App from './router';

//-- DEFAULT COMPONENTS

//-- APPEND ITEMS HERE --
function isPhoneGap() {
    return (window.cordova || window.PhoneGap || window.phonegap)
        && /^file:\/{3}[^\/]/i.test(window.location.href)
        && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
}

if ( isPhoneGap() ) {
    var cordovaApp = {
        // Application Constructor
        initialize: function() {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        },

        // deviceready Event Handler
        //
        // Bind any cordova events here. Common events are:
        // 'pause', 'resume', etc.
        onDeviceReady: function() {
            App.start();
        }
    };
    cordovaApp.initialize();
} else {
    App.start();
}