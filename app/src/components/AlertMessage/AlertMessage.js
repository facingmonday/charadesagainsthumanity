import $ from 'jquery';
import _ from 'underscore';
var Backbone = require('backbone');
import View from 'base/View';
import template from './AlertMessage.ejs';

require('./AlertMessage.less');

var v =  Backbone.View.extend({
  initialize: function(options = {}){
    this.template = template;
    this.render();
	}

	,events: {
    'click #AlertMessage-body': 'hideAlertMessageHandler'
  }

	,render: function(){
	  this.$el.html(this.template());
	}
	
	,showAlertMessageHandler: function(msg,type='info'){//expected types - info, error, success, warning
		 $('#AlertMessage-body').removeClass('alert-info alert-success alert-warning alert-danger alert-hidden');
		 //hide command for while validation in process 
		 //rough implementation
		 var message,msgType;
		 msgType = type;
		 if(type=='info'){
			 message = msg;
		 }else if(type=='error'){
			 msgType = 'danger';
			 message = '<strong>Error!</strong> '+msg;
		 }else{
			 message = '<strong>'+type+'!</strong> '+msg;
		 }
		 $('#AlertMessage-body').html(message).addClass('alert-'+msgType).fadeIn('fast').delay(4000).fadeOut('fast');
	 }
	 ,hideAlertMessageHandler: function(){
		 console.log('hide');
		 $('#AlertMessage-body').removeClass('alert-info alert-success alert-warning alert-danger');
		//hide message 
		 $('#AlertMessage-body').addClass('alert-hidden').html('').fadeOut('fast');
	 }
});

export default new v();
