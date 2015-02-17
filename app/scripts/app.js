'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Softhub', ['ionic', 'config', 'angular-google-gapi'])

.run(function($ionicPlatform, $rootScope, GAuth, GApi) {


    $rootScope.CLIENT_APK = 'AIzaSyAbAFrNtfUMaIs_AvBGSM2Zd2aQz4kkZvQ';
    $rootScope.CLIENT_ID = '816277150372-krd6kau1lq9t6k3njgl7o8sl6om4bvbs.apps.googleusercontent.com';
    $rootScope.SCOPES = 'https://www.googleapis.com/auth/drive';

    GAuth.setClient($rootScope.CLIENT_ID);

    //GApi.load($rootScope.CLIENT_APK, 'v3', $rootScope.SCOPES);

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.controller('main', ['$scope', '$timeout', 'GAuth', 'GApi', function($scope, $timeout, GAuth, GApi) {



    /**
       * Check if the current user has authorized the application.
       */
      $scope.checkAuth = function() {
        GAuth.login().then(function(){
              //$state.go('webapp.home'); // action after the user have validated that
                          // your application can access their Google account.
                          console.log("login");
            }, function() {
                console.log('login fail');
            });
      }

      /**
       * Start the file upload.
       *
       * @param {Object} evt Arguments from the file selector.
       */
      function uploadFile(evt) {

      }

}]);
