import Backbone from 'backbone';

var _sync = Backbone.sync;

Backbone.sync = function(method, model, options) {
  options.timout = 10000;
  if(typeof Administrator != "undefined" && Administrator.getToken()){
    options.beforeSend = function (xhr) {
      xhr.setRequestHeader('authorization', "Bearer " + Administrator.getToken());
    };
    if(!options.error){
      options.error = function(xhr) {
        if (xhr.status == "401" || xhr.status == 401) {
          Backbone.history.navigate("#login", {
            trigger: true
          });
        }
      };
    }
  }

return _sync(method, model, options);
};
export default Backbone;