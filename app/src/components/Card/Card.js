import $ from 'jquery';
import _ from 'underscore';
import View from 'base/View';
import template from './Card.ejs';
import CardsCollection from '../../collections/Cards';
const WhiteCards = require('../../collections/white_cards.json');
require('./Card.less');

export default View.extend({
    initialize: function (options = {}) {
        this.template = template;
        _.bindAll(this, 'render', 'unbindEvents', 'bindEvents');
    }

    , events: {
        'click .card-text-container': 'clickRefreshButtonHandler'
    }

    , render: function () {
        let cards = WhiteCards;
        console.log('cards', cards);
        let min = Math.ceil(0);
        let max = Math.floor(cards.length);
        let randomNumber = Math.floor(Math.random() * (max - min)) + min;
        this.$el.html(this.template({
            card: cards[randomNumber]
        }));

        /*
         * Assign a component to a class or id container
         * { '.MyComponent-component-container': MyComponent }
         */
        this.assign({});
    }

    /** Custom Function **/
    , clickRefreshButtonHandler: function (evt) {
        evt.preventDefault();
        this.render();
    },


    timesUp: function(){
        console.log('Card.timesUp');
    },


    unbindEvents: function(){
        this.$el.off('click', '.card-text-container');
    },

    bindEvents: function(){
        this.delegateEvents();
    }

});
