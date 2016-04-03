export /* @ngInject */ function Underscore($window) {
  return $window._;
}

export /* @ngInject */ function Geolocation($window, $location) {
  var testMode = $location.search()['geo']
    , testFunc;

  /* In regular service we'll always just be using the standard
   * javascript navigator. But in order to test geolocation
   * functionality we can override it in test mode */

  if(!testMode) {
    return $window.navigator.geolocation;
  }

  if('deny' == testMode) {

    /* In "deny" mode we just execute any passed failure callback
     * and pass in a mocked PERMISSION_DENIED error object */

    testFunc = function(onSuccess, onFailure) {
      if(onFailure) {
        onFailure({ code: 1, message: 'TestMode Permission Denied' });
      }
    }
  } else {

    /* In "coords" mode we just execute any passed success callback
     * and pass in a mocked coords or position information object */

    var lat = Number(testMode.split(',')[0])
      , lng = Number(testMode.split(',')[1]);

    testFunc = function(onSuccess, onFailure) {
      if(onSuccess) {
        onSuccess({ coords: { latitude: lat, longitude: lng } });
      }
    }
  }

  /* We delay the callback by about 500 milliseconds. Long enough to
   * mimick the real calls async nature but not so long that automated
   * tests take a long time to execute */

  return {
    getCurrentPosition: function(args) {
      return setTimeout(() => testFunc(args), 500);
    }
  }

}

