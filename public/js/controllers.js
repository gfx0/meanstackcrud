angular.module('meanstackapp.controllers', [])
.controller('AngularButtonClickCounter', function($scope, $http) {

  $scope.clickCount = 0;
  $scope.clickCountIncrease = function() { $scope.clickCount++; }
  $scope.deleteAllUsers = function() { 
    console.log('watt');
    $http.delete('/deleteallusers', { params: { '':''}}); }

})
.controller('CreateUserToDatabaseCtrl', function($scope, $http) {

  $scope.createUserToDatabase = function()
  {
    // NOTE:  You should always sanitize anything and everything that goes near the DB.
    //        Also checkout OWASP TOP 10 to make your app secure.
    //        $scope.userNameToAdd <- this could be a malicious injection.
    $http.post('/users', { 'username' : $scope.userNameToAdd } ).then(function (data)
    {
      if ( data.status == 200 )
        $scope.resultCreate = 'Succeeded to add a user: ' + $scope.userNameToAdd;
      else
        $scope.resultCreate = 'Failed to add user: ' + JSON.strinfify(data);
      
      $scope.userNameToAdd = '';
    }, function (error) { 
      $scope.resultCreate = 'Error with /users POST endpoint: ' + JSON.stringify(error);
    });
  }
})
.controller('ReadUsersInDatabaseCtrl', function($scope, $http) {
  $scope.dbUsers = [];
  $scope.readUsersInDatabase = function()
  {
    $http.get('/users').then( function(res) 
    {
      if ( res.data ) {
        $scope.dbUsers = res.data;
        $scope.resultGet = 'Succeeded to get users.';
      } else
        $scope.resultGet = 'User list was invalid: ' + JSON.stringify(res);
    }, function (error) {
      $scope.resultGet = 'Error with /users GET endpoint: ' + JSON.stringify(error);
    });
  };

})
.controller('UpdateUserDataInDatabaseCtrl', function($scope, $http) {
  $scope.updateUserName = function()
  {
    $http.put('/users', { 'username' : $scope.userNameToUpdate, 'newusername' : $scope.newUpdatedUserName } ).then(function (data)
    {
      // This is crude and without real output, but it's a sample.
      if ( data.status == 200 ) {
        $scope.resultPut =  'Successfully updated username: ' +
                            $scope.userNameToUpdate +
                            ' to ' +
                            $scope.newUpdatedUserName;
      } else
        $scope.resultPut = 'Failed to update username: ' + JSON.stringify(data);
       $scope.userNameToUpdate = $scope.newUpdatedUserName = '';
    }, function (error) { 
      $scope.resultPut = 'Error with /users PUT endpoint: ' + JSON.stringify(error);
    });
  }
})
.controller('DeleteUserFromDatabaseCtrl', function($scope, $http) {
  $scope.deleteUserFromDatabase = function()
  {
    // NOTE:  AngularJS 1 does not support body parameters for the DELETE verb.
    //        Have to carry over with URL params object. ID would be preferrable here. 
    $http.delete('/users', { params: { 'username' : $scope.userNameToDelete } } ).then(function (data)
    {
      // This is crude and without real output, but it's a sample.
      if ( data.status == 200 )
        $scope.resultDelete = 'Successfully deleted user: ' + $scope.userNameToDelete;
      else
        $scope.resultDelete = 'Failed to delete user: ' + JSON.stringify(data);
      
      $scope.userNameToDelete = '';
    }, function (error) { 
      $scope.resultDelete = 'Error with /users DELETE endpoint: ', JSON.stringify(data);
    });
  }
});


