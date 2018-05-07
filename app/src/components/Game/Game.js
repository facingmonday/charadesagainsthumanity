import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import View from 'base/View';
import template from './Game.ejs';
import TimerComponent from 'components/Timer';
import CardComponent from 'components/Card';
import StartStopButtonComponent from 'components/StartStopButton';

require('./Game.less');

export default View.extend({
    initialize: function (options = {}) {
        var _this = this;
        this.template = template;
        this.Timer = new TimerComponent();
        this.Card = new CardComponent();

        this.listenTo(this.Timer, 'times_up', function () {
            _this.Card.timesUp();
        });
        this.listenTo(this.Timer, 'done', function(){
            console.log('done');
            Backbone.history.navigate('next', {trigger: true})
        });
        this.listenTo(this.Timer, 'started', this.Card.unbindEvents);
        this.listenTo(this.Timer, 'reset done', this.Card.bindEvents);

        this.render();
    }

    , events: {
        'click .some-button': 'eventHandler'
    }

    , render: function () {
        this.$el.html(this.template());

        /*
         * Assign a component to a class or id container
         * { '.MyComponent-component-container': MyComponent }
         */
        this.assign({
            ".Timer-component-container": this.Timer,
            ".Card-component-container": this.Card,
        });
    }

    /** Custom Function **/
    , eventHandler: function (evt) {
        evt.preventDefault();
        var $elm = $(evt.currentTarget);

        return false;
    }
});
