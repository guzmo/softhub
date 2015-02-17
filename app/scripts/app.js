'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Softhub', ['ionic', 'config', 'angular-google-gapi'])

.run(function($ionicPlatform, $rootScope, GAuth, GApi) {


    $rootScope.CLIENT_APK = 'AIzaSyAbAFrNtfUMaIs_AvBGSM2Zd2aQz4kkZvQ';
    $rootScope.CLIENT_ID = '816277150372-krd6kau1lq9t6k3njgl7o8sl6om4bvbs.apps.googleusercontent.com';
    $rootScope.SCOPES = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive';

    GApi.load('drive', 'v2');

    GAuth.setClient($rootScope.CLIENT_ID);
    GAuth.setScopes($rootScope.SCOPES);

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

      $scope.file = {};
      $scope.disabled = true;
      /**
       * Check if the current user has authorized the application.
       */
      $scope.checkAuth = function() {
        GAuth.login().then(function(){
                // your application can access their Google account.
                console.log("login");
                $scope.disabled = false;
            }, function() {
                console.log('login fail');
            });
      };

      var filePicker = document.getElementById('filePicker');
      filePicker.onchange = uploadFile;

      /**
       * Start the file upload.
       *
       * @param {Object} evt Arguments from the file selector.
       */
      function uploadFile(evt) {
          GApi.executeAuth('drive', 'files.list').then( function(resp) {
              console.log(resp);
              $scope.value = resp;
          }, function() {
              console.log("error");
          });
      };

}]);
