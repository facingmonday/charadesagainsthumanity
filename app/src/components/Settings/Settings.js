import $ from 'jquery';
import _ from 'underscore';
import View from 'base/View';
import template from './Settings.ejs';

require('./Settings.less');

export default View.extend({
  initialize: function(options = {}){
    this.template = template;
    this.render();
	}

	,events: {
    'click .some-button': 'eventHandler'
  }

	,render: function(){
	  this.$el.html(this.template());

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
