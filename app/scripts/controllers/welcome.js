'use strict';

/**
 * @ngdoc function
 * @name vagupuApp.controller:WelcomeCtrl
 * @description
 * # WelcomeCtrl
 * Controller of the vagupuApp
 */
angular.module('vagupuApp')
  .controller('WelcomeCtrl',
    [ /*Dependencies*/
      '$scope',
      'currentAuth',

      function ($scope,currentAuth) {
        // I cause an error to be thrown in nested functions.
        $scope.causeError = function() {
          foo();
        };

        function bar() {
          // NOTE: "y" is undefined.
          var x = y;
        }

        function foo() {
          bar();
        }

        // greet user function. It binds basic data with scope so that template can access it.
        $scope.greetUser=function () {
          $scope.vagapuVideo='AYMSKw8GT4U';
          //console.log("User Is : "+ JSON.stringify(currentAuth,null,2));
          $scope.name=currentAuth.displayName;
          $scope.firstName=$scope.name.substr(0,$scope.name.indexOf(' '));;
          $scope.profilePic=currentAuth.photoURL;
        }

  }]);
