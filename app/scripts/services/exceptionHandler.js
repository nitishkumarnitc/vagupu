'use strict';

/**
 * @ngdoc factory service
 * @name vagupuApp.$exceptionHandlerFactoryService
 * @description
 * # $exceptionHandlerFactoryService
 * Factory in the vagupuApp.
 */

/*Modifying $exceptionalHandler such that it parses and pushes the error to firebase server*/
app.factory(
  "$exceptionHandler",
  [ /*Dependencies*/
    "$log",
    "$window",
    "deviceDetector",
    "$injector",

    function ($log, $window,deviceDetector,$injector) {

      function error(exception, cause) {

      // preserve the default behaviour of $exceptionHandler service which will log the error
      // to the console, and allow the application to continue running.
        $log.error.apply($log, arguments);

        // injecting the $firebaseArray Service on which we will push the client side error
        var $firebaseArray= $injector.get('$firebaseArray');

        // now try to log the error to the server side.
        try {

          var errorMessage = exception.toString();

          // this is a callback function which parses the exception/error, adds browser info and pushes
          // the error on firebase server
          var callback = function(stackframes) {

            var stringifiedStack = stackframes.map(function(sf) {
              return sf.toString();
            }).join('\n');

            // gathering browser data
            var deviceData= {
              os:deviceDetector.os,
              browser:deviceDetector.browser,
              browser_version:deviceDetector.browser_version,
              device:deviceDetector.device
            };

            // gathering data that we are going to push on server
            var data=angular.toJson({
              url: $window.location.href.replace('#!/',''),
              message: errorMessage,
              type: "exception",
              stackTrace: stringifiedStack,
              cause: cause,
              deviceData: deviceData
            });

            $log.error("Client side Error/stack trace is  : "+ data);

            //connecting with correct path on firebase and getting array on which stacktrace has to be pushed.
            var path="error/"+$window.location.href.replace('#!/','')+"/"+deviceData.browser;
            var ref = firebase.database().ref(path);
            var dataArray = $firebaseArray(ref);

            //pushing stacktrace/error/exception to firebaseArray
            dataArray.$add(data).then(function(ref) {
              console.log("Error looged");
              var id = ref.key;
              dataArray.$indexFor(id); // returns location in the array
            });
          };

          //call back function. Called when StackTrace.get() promise is rejected
          var errback = function(err) {
            console.log("errback is "+err.message);
          };

          //Getting StackTrace
          StackTrace.get().then(callback).catch(errback);

        } catch (loggingError) {
          $log.warn("Error : server-side logging failed");
          $log.log(loggingError);
        }
    }
    return (error);
  }]);
