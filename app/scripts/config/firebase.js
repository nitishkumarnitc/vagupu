/**
 * Created by nitish on 5/11/17.
 */
angular.module('vagupuApp').config(function () {
  var config = {
    apiKey: "AIzaSyBZxVCWX9uuv_rBCvVFKIvUEixoRk6yME0",
    authDomain: "fblogin-4177f.firebaseapp.com",
    databaseURL: "https://fblogin-4177f.firebaseio.com",
    projectId: "fblogin-4177f",
    storageBucket: "",
    messagingSenderId: "11105660300"
  };
  firebase.initializeApp(config);
});
