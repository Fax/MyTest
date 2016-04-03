export default /* @ngInject */ 
function($q, $window, $rootScope, AppState, DublinBusServices ) {

  return {
    templateUrl: '/templates/ha-box-bus-stop-rt.html',
    scope: {
      
    },
    link: function(scope, elem, attrs, ctrl) {
      scope.testData = AppState.ver;
      scope.stopId = '2246'
    },
    controller: ['$scope',
      function($scope){
        
        // if(!!DublinBusServices)
          DublinBusServices.getStatusForStopId($scope.stopId).then(function(result){
            if(!!result){
              $scope.data = result;
            }
          });
      }
    ]
  };
}