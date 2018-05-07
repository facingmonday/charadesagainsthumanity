import $ from 'jquery';
import _ from 'underscore';
import View from 'base/View';
import template from './Timer.ejs';
import Settings from 'models/Settings';
require('./Timer.less');

export default View.extend({
    initialize: function (options = {}) {
        this.template = template;
        this.interval = null;
        this.startSeconds = Settings.get('startSeconds') || 120;
        this.currentSeconds = Settings.get('startSeconds') || 120;
        this.render();
        this.$startButton.show();
        this.$pauseButton.hide();
        this.$resetButton.hide();
        this.$doneButton.hide();

        _.bindAll(this, 'updateTime', 'render');
    },

    events: {
        'click .start-button': 'startTimer',
        'click .pause-button': 'pauseTimer',
        'click .reset-button': 'resetTimer',
        'click .done-button': 'done'
    },

    render: function () {
        this.$el.html(this.template({
            currentSeconds: this.currentSeconds
        }));

        this.$startButton = this.$el.find('.start-button');
        this.$pauseButton = this.$el.find('.pause-button');
        this.$resetButton = this.$el.find('.reset-button');
        this.$doneButton = this.$el.find('.done-button');
        /*
         * Assign a component to a class or id container
         * { '.MyComponent-component-container': MyComponent }
         */
        if(this.interval){
            this.$startButton.hide();
            this.$pauseButton.show();
            this.$resetButton.show();
            this.$doneButton.show();
        } else {
            this.$startButton.show();
            this.$pauseButton.hide();
            this.$resetButton.hide();
            this.$doneButton.hide();
        }
        this.assign({});
    },

    startTimer: function(evt) {
        evt.preventDefault();
        this.$startButton.hide();
        this.$pauseButton.show();
        this.$resetButton.show();
        this.$doneButton.show();
        this.interval = setInterval(this.updateTime, 1000);
        this.trigger('started');
        return false;
    },

    pauseTimer: function(evt){
        evt.preventDefault();
        clearInterval(this.interval);
        this.render();
        this.$startButton.show();
        this.$pauseButton.hide();
        this.$resetButton.show();
        this.$doneButton.show();
        return false;
    },

    resetTimer: function(evt){
        if(evt){
            evt.preventDefault();
        }
        this.currentSeconds = this.startSeconds;
        clearInterval(this.interval);
        this.render();
        this.$startButton.show();
        this.$pauseButton.hide();
        this.$resetButton.hide();
        this.$doneButton.hide();
        this.trigger('reset');
        return false;
    },

    done: function(evt){
        evt.preventDefault();
        this.resetTimer();
        this.trigger('done');
        this.trigger('reset');
        return false;
    },

    updateTime: function(){
        this.currentSeconds = this.currentSeconds - 1;
        if(this.currentSeconds < 0){
            this.resetTimer();
            Backbone.history.navigate('timesup', {trigger:true});
        }
        this.render();
    }
});
