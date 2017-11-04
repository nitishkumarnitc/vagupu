'use strict';

/**
 * @ngdoc service
 * @name vagupuApp.Auth
 * @description
 * # Auth
 * Factory in the vagupuApp.
 */

/*
* This factory service is used for firebase authentication*/

 app.factory('Auth', ["$firebaseAuth",
    function($firebaseAuth) {
      return $firebaseAuth();
    }
  ]);
