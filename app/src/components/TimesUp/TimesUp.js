import $ from 'jquery';
import _ from 'underscore';
import View from 'base/View';
import template from './TimesUp.ejs';
import CardsCollection from 'collections/Cards';
require('./TimesUp.less');

export default View.extend({
  initialize: function(options = {}){
    this.template = template;
    this.render();
	}

	,events: {
    'click .some-button': 'eventHandler'
  }

	,render: function(){
        let card = "Error getting card. Try tapping to refresh";
        if(CardsCollection.length){
            let c = CardsCollection.at(CardsCollection.length - 1);
            console.log('c', c);
            card = c.get('name');
        }
        this.$el.html(this.template({
            card: card
        }));
    /*
    * Assign a component to a class or id container
    * { '.MyComponent-component-container': MyComponent }
    */
    this.assign({});
	}

	/** Custom Function **/
	,eventHandler: function(evt){
    evt.preventDefault();
    var $elm = $(evt.currentTarget);

    return false;
  }
});
