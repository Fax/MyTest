export default /* @ngInject */ function($q, $window, $http, _){
  return {
    
    url: 'https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?',
    
    // stopid 2246 is Chapelizod main street.
    getStatusForStopId: function(stopid){
      return $http({
        url: this.url + `stopid=${stopid}&format=json&callback=rtpicb`,
        method: 'GET'
      });
    }
  };
}
//https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=184&format=xml