export default /* @ngInject */ function($q, $window, $rootScope) {

  $window.addEventListener('offline', function(e) {
    $rootScope.$apply(function() {
      $rootScope.showNetworkError = true;
    });
  }, false);

  $window.addEventListener('online', function(e) {
    $rootScope.$apply(function() {
      $rootScope.showNetworkError = false;
    });
  }, false);

  $rootScope.hideNetworkError = function() {
    $rootScope.showNetworkError = false;
  }

  return {

    // Set timeout to something explicit
    'request': function(config) {
      config.timeout = 15000;
      return config;
    },

    // Check for server response code
    'response': function(response) {
      $rootScope.showNetworkError = response.status != 200;
      return response;
    },

    // Definite failure!
    'responseError': function(rejection) {
      $rootScope.showNetworkError = true;
      return $q.reject(rejection);
    }
  };

}

