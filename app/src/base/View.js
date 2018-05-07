var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
import Radio from 'backbone.radio';
let notifyChannel = Radio.channel('notify');
import AlertMessage from 'components/AlertMessage';

var formDirty = false;

module.exports = Backbone.View.extend({
  notify: function(data){
    //console.log('notify', data);
    //notifyChannel.trigger('show:notification', data);
  }
	,assign : function (selector, view) {
		var selectors;
		if (_.isObject(selector)) {
			selectors = selector;
		}
		else {
			selectors = {};
			selectors[selector] = view;
		}
		if (!selectors) return;
		_.each(selectors, function (view, selector) {
  		if(view){
			  view.setElement(this.$(selector)).render();
      }
		}, this);
	}

	,addEvent: function(evt){
    this.delegateEvents(_.extend(this.events, evt));
  }

  ,removeEvent: function(){

  }
  ,showLoading: function(){
    $("<div style='width: 96px'><i style='font-size: 40px' class='fa fa-refresh fa-spin'></i></div>").modal({
      showClose: false
    });
  }
  ,hideLoading: function(){
    $.modal.close();
  }
  ,markDirty: function(){
	  console.log('form dirty');
	  formDirty = true;
  }
  ,markClean: function(){
	  console.log('form clean');
	  formDirty = false;
  }
  ,confirmChanges: function(callback){
  	var _this = this;
	confirmAllChanges(callback);
  }
  ,showConfirm: function(config, callback){
	  showConfirmPrompt(config,callback);
   }
  ,showAlert: function(msg,type='info'){//expected types - info, error, success, warning
	 AlertMessage.showAlertMessageHandler(msg,type);
  }
  ,hideAlert: function(){
	 AlertMessage.hideAlertMessageHandler();
  }
   ,gaTrack: function(type=null,data=null){
	  if (typeof ga !== "undefined" && ga !== null) {
		  
		 //page track
		 if(type=='pageView'){
			 if(data==null){
				 data = '/'+Backbone.history.getFragment();
			 }
		    console.log('ga pageview: ',data);
		    ga('send', 'pageview', data);//VPV
		 }
		 
	    //TODO: event tracking
	  }
  }
   ,fbTrack: function(type=null,data=null){
	  if (typeof fbq !== "undefined" && fbq !== null) {
		  
		 //page track
		 if(type=='pageView'){
			 if(data==null){
				 data = '/'+Backbone.history.getFragment();
			 }
		    console.log('fb pageview: ',data);
		    fbq('track', 'ViewContent', {
			  content_name: data
			 });
		 }else if(type=='trialSignup'){
			 console.log('fb trial signup ');
			 fbq('trackCustom', 'trialSignup', {content_name: data});
		 }
	  }
  }
  ,adRollTrack: function(type=null,data=null){
	  if (typeof __adroll !== "undefined" && __adroll !== null) {
		  
		 //page track
		 if(type=='pageView'){
			 //console.log('ar pageview');
		 }else if(type=='trialSignup'){
			 console.log('adroll trial signup');
			 __adroll.record_user({"adroll_currency": "USD", "adroll_conversion_value" : "149.99", "adroll_segments" : "dae54b4f","qty_ordered" : "1"});
		 }
	  }
  }
});

function confirmAllChanges(callback){
  var _this = this;
  console.log('confirmChanges');
  if (formDirty == true){
  	showConfirmPrompt({'msg':'You have pending changes. Do you want to abandon them and continue?','continue':'Abandon','cancel':'Cancel'},function(){formDirty = false;});
  	formDirty = false;
  }
}
function showConfirmPrompt(config, callback){
	var _this = this;
	  var msg;
	  var cncl;
	  var cont;
	  
	  if (typeof config.msg !='undefined'){
	  	msg = config.msg;		  
	  }
	  else {
		msg = 'Are you sure?';  
	  }

	  if (typeof config.cont !='undefined'){
	  	cont = config.cont;		  
	  }
	  else {
		cont = 'Continue';  
	  }
	  
	  if (typeof config.cancel !='undefined' && config.cancel == false){
		cncl = ''; //supress the cancel button
	  }
	  else if (typeof config.cancel !='undefined'){
	  	cncl = '<button type="button" data-dismiss="modal" class="btn cancel-btn">'+config.cancel+'</button>';		  
	  }
	  else {
		cncl = '<button type="button" data-dismiss="modal" class="btn cancel-btn">Cancel</button>';  
	  }

	  //replace with styled alert / confirm box
	  var confirm = '<div id="confirm" class="modal"><div class="modal-body">'+msg+'</div><div class="modal-footer">'+cncl+'<button type="button" data-dismiss="modal" class="btn btn-primary continue-btn">'+cont+'</button></div></div><style>.modal a.close-modal{display:none;}</style>';
	  $('.dropModal').remove();
	  $('.App-container').append(confirm);
	  $('#confirm').modal({ backdrop: 'static', keyboard: false }).one('click', '.continue-btn', function (e) {
          $('.modal').modal('hide').data('bs.modal', null).remove();
          $('.jquery-modal').remove();
          callback();
        }).one('click', '.cancel-btn', function (e) {
           $('.modal').modal('hide').data('bs.modal', null).remove();
          $('.jquery-modal').remove();
          return false;
		}); 
}
