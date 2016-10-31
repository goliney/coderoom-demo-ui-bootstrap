angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('PagerDemoCtrl', function($scope) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;
});