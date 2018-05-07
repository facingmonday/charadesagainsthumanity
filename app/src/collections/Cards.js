import Backbone from 'base/Backbone';
import _ from 'underscore';
import $ from 'jquery';
let Collection = Backbone.Collection.extend({
    url: "",
    fetchCard: function(){
        var _this = this;
        $.get('/card', function(data){
            console.log('data', data);
            _this.add(data);
        });
    }
});

export default new Collection();