// States
import AppState from './services/app.state';



// third part libraries
import { Underscore, Geolocation } from './services/vendor.libs';
import HttpInterceptor from './services/http.interceptor';



angular.module('homeapp', ['ui.bootstrap', 'ui.sortable'])

  .constant('system', {
    ver: '0.0.1'
  })

  .factory('_', Underscore)
  .factory('Geolocation', Geolocation)
  
  .service('HttpInterceptor', HttpInterceptor)


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
