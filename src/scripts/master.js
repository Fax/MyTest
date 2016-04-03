// States
import AppState from './services/app.state';
import DublinBusServices from './services/dublin.bus.services';



// third part libraries
import { Underscore, Geolocation } from './services/vendor.libs';
import HttpInterceptor from './services/http.interceptor';
//directives
import HaBoxBusStopRt from './directives/ha.box.bus.stop.rt';



angular.module('homeapp',['ui.bootstrap'])

  .constant('system', {
    ver: '0.0.1'
  })

  .factory('_', Underscore)
  .factory('Geolocation', Geolocation)
  
  .service('AppState', AppState)
  .service('HttpInterceptor', HttpInterceptor)
  .service('DublinBusServices', DublinBusServices)
  
  .directive('haBoxBusStopRt',HaBoxBusStopRt)

  .filter('htmlTrust', ['$sce', function($sce) {
    return $sce.trustAsHtml;
  }])

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
  }]);
  
  
  
  
  
moment.locale('en', {
  ordinal : function (number, token) {
      var b = number % 10;
      var output = (~~ (number % 100 / 10) === 1) ? 'th' :
          (b === 1) ? 'st' :
          (b === 2) ? 'nd' :
          (b === 3) ? 'rd' : 'th';
      return number + '<sup>' + output + '</sup>';
  }
});
