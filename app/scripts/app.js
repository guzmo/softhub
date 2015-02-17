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
          console.log(evt.target.files[0]);
          var fileData = evt.target.files[0];
          var boundary = '-------314159265358979323846';
          var delimiter = "\r\n--" + boundary + "\r\n";
          var close_delim = "\r\n--" + boundary + "--";

          var reader = new FileReader();
          reader.readAsBinaryString(fileData);
          reader.onload = function(e) {
            var contentType = fileData.type || 'application/octet-stream';
            var metadata = {
              'title': fileData.name,
              'mimeType': contentType
            }

          var base64Data = btoa(reader.result);
          var multipartRequestBody =
              delimiter +
              'Content-Type: application/json\r\n\r\n' +
              JSON.stringify(metadata) +
              delimiter +
              'Content-Type: ' + contentType + '\r\n' +
              'Content-Transfer-Encoding: base64\r\n' +
              '\r\n' +
              base64Data +
              close_delim;

          var request = {
              'path': '/upload/drive/v2/files',
              'method': 'POST',
              'params': {'uploadType': 'multipart'},
              'headers': {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
              },
              'body': multipartRequestBody
            };

            GApi.executeAuth('drive', 'files.insert', request).then( function(resp) {
              console.log(resp);
              $scope.value = resp;
            }, function() {
                console.log("error");
            });
        }

      };

      $scope.getAllFiles = function() {
          GApi.executeAuth('drive', 'files.list').then( function(resp) {
              console.log(resp);
              $scope.value = resp;
          }, function() {
              console.log("error");
          });
      }

}]);
