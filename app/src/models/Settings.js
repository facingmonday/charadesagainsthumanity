import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'base/Backbone'

let Settings = Backbone.Model.extend({
    urlRoot: function () {
        return "";
    },
    defaults: {
        'startSeconds': 120
    }
});

export default new Settings();
