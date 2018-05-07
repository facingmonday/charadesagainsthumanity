import $ from 'jquery';
import Backbone from 'base/Backbone';

/* Import View Classes */
//require('lib/theme-base.less');
import AppView from 'components/App';
import UAParser from 'ua-parser-js';

//Page Components
import WelcomeComponent from 'components/Welcome';
import GameComponent from 'components/Game';
import SettingsComponent from 'components/Settings';
import NextTeam from 'components/NextTeam';
import TimesUp from 'components/TimesUp';

var App = Backbone.Router.extend({
    loaded: false
    , routes: {
        'game': 'showGame',
        'settings': 'showSettings',
        'next': 'showNextTeam',
        'timesup':'showTimesUp',
        '*path': 'welcome'
    }

    , initialize: function () {
        var _this = this;
    }

    , welcome: function(){
        AppView.showPage(new WelcomeComponent)
    }

    ,showGame: function(){
        AppView.showPage(new GameComponent());
    }

    ,showNextTeam: function(){
        console.log('showTema');
        AppView.showPage(new NextTeam());
    }

    ,showTimesUp: function(){
        AppView.showPage(new TimesUp());
    }
    ,showSettings: function(){
        AppView.showPage(new SettingsComponent());
    }

    , start: function () {

        Backbone.history.start();

        //Ga Tracking Event
        Backbone.history.on("route", function () {
            //return App.gaTrackRelay('pageView');
        });

        //enable less-aggressive caching for IE/Edge
        var parser = new UAParser();
        var ua = parser.getResult();
        if (ua.browser.name == 'IE' || ua.browser.name == 'Edge') {
            console.log('is IE/edge. enable less caching');
            $.ajaxSetup({cache: false});
        }
        this.loaded = true;
    }

    , gaTrackRelay: function (type = null, data = null) {//pass through to view helper from backbone history event in main.js
        AppView.gaTrackHandler(type, data);
    }

});
AppView.render();
export default new App();