'use strict';

/**
 * @ngdoc function
 * @name vagupuApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the vagupuApp
 */
angular.module('vagupuApp')
  .controller('LoginCtrl',
    [/*Dependencies*/
      '$scope',
      '$log',
      'Auth',
      '$location',
      function ($scope,$log,Auth,$location) {

      $scope.authObj = Auth;
      //function for login using Email and Password Combination
      $scope.loginUsingEmail=function () {
        $scope.authObj.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
          $location.path("/welcome");
        }).catch(function(error) {
          $log.error("Authentication failed:", error);
        });

      };

      //function for login using Google
      $scope.loginUingGoogle=function(){
        $scope.authObj.$signInWithPopup("google").then(function(result) {
          $location.path("/welcome");
        }).catch(function(error) {
          $log.error("Authentication failed:", error);
        });
      };

      //function for login using Facebook
      $scope.loginUsingFacebook=function () {
        $scope.authObj.$signInWithPopup("facebook").then(function(result) {
          $location.path("/welcome");
        }).catch(function(error) {
          $log.error("Authentication failed:", error);
        });
      };

    }]);
