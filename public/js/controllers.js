angular.module('meanstackapp.controllers', [])
.controller('AngularButtonClickCounter', function($scope) {

  $scope.clickCount = 0;
  $scope.clickCountIncrease = function() { $scope.clickCount++; }

})
.controller('CreateUserToDatabaseCtrl', function($scope, $http) {

  $scope.createUserToDatabase = function()
  {
    // NOTE: Sanitize anything and everything that goes near the DB.
    //       $scope.userNameToAdd <- this could be a malicious injection.
    $http.post('/createuser', { 'username' : $scope.userNameToAdd } ).then(function (data)
    {
      // This is crude and without real output, but it's a sample.
      if ( data.status == 200 ) {
        console.log("Successfully added user: ", data);
      } else {
        console.log("Failed to add user: ", data);
      }
    }, function (data) { 
      console.log("Error adding user: ", data);
    });
  }
})
.controller('ReadUsersInDatabaseCtrl', function($scope, $http) {
  $scope.dbUsers = [];
  $scope.readUsersInDatabase = function()
  {
    $http.get('/readusers').then( function(res) 
    {
      if ( res.data )
      {
        console.log("Got user data: ", res.data);
        $scope.dbUsers = res.data;
      }
    }, function error(res)
    {
      console.log("Error", res);
    });
  };

})
.controller('UpdateUserDataInDatabaseCtrl', function($scope, $http) {
  $scope.updateUserName = function()
  {
    $http.post('/updateuser', { 'username' : $scope.userNameToUpdate, 'newusername' : $scope.newUpdatedUserName } ).then(function (data)
    {
      // This is crude and without real output, but it's a sample.
      if ( data.status == 200 ) {
        console.log("Successfully updated username: ", data);
      } else {
        console.log("Failed to update username: ", data);
      }
    }, function (data) { 
      console.log("Error updating username: ", data);
    });
  }
})
.controller('DeleteUserFromDatabaseCtrl', function($scope, $http) {
  $scope.deleteUserFromDatabase = function()
  {
    $http.post('/deluser', { 'username' : $scope.userNameToDelete } ).then(function (data)
    {
      // This is crude and without real output, but it's a sample.
      if ( data.status == 200 ) {
        console.log("Successfully deleted user: ", data);
      } else {
        console.log("Failed to delete user: ", data);
      }
    }, function (data) { 
      console.log("Error deleting user: ", data);
    });
  }
});


