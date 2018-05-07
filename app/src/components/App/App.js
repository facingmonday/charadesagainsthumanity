import $ from 'jquery';
import _ from 'underscore';
import View from 'base/View';
import template from './App.html';
import AlertMessage from 'components/AlertMessage';
import Navigation from '../Navigation';

//import Header from 'components/Header';
require('./App.less');

var AppView = View.extend({
    el: $("#js-app"),

    initialize: function (options = {}) {
        this.template = _.template(template);
        //$(window).on("resize", this.resizeLayout);
    }

    , events: {}

    , render: function () {
        this.$el.html(this.template());
        var assignment = {
            '.Navigation-component-container': new Navigation()
        };
        this.assign(assignment);
    }

    /** Custom Function **/
    , eventHandler: function (evt) {
        evt.preventDefault();
        var $elm = $(evt.currentTarget);

        return false;
    }
    , showPage: function (View) {

        this.render();
        var _this = this;

        $('.Login-bg-container').remove();

        //animate page transition
        _this.$el.find('.App-page-container').fadeOut('fast', function () {
            _this.$el.find('.App-page-container')
                .empty()
                .append(View.$el)
                .fadeIn('fast');
        });

    }
    , showFullPage: function (View) {
        this.$el.empty().append(View.$el);
    }
    , gaTrackHandler: function (type = null, data = null) {
        this.gaTrack(type, data);//helper function in view
    }
});

export default new AppView();