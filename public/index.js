var userApp = angular.module('UserApp', ['ngRoute']);

// Routes
userApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'UserController'

    })
    .when('/edit/:id', {
      templateUrl: 'editUser.html',
      controller: 'EditController'
    });
    if(window.history && window.history.pushState){
      $locationProvider.html5Mode(true);
    }
}]);

// User Controller
userApp.controller('UserController', function($scope, $http, $window) {
  // Get all users in database
  $scope.getAllUsers = function() {
    $http.get('/api/users').then((res) => {
      $scope.users = res.data;
    }).catch(e => {
      console.log(`Error: ${e}`);
    });
  }

  // Create a user in the database
  $scope.createUser = () => {
    const data = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      email: $scope.email
    };

    $http.post('/api/users/create', data).then(res => {
      $window.location.reload();
    }).catch(e => {
      console.log(`Error: ${e}`);
    });

    $scope.getAllUsers();
  }

  // Delete a user in the database
  $scope.deleteUser = id => {
    $http.delete(`/api/users/${id}/delete`).then(res => {
    }).catch(e => {
      console.log(`Error: ${e}`);
    });

    $scope.getAllUsers();
  }
});

// Edit Controller
userApp.controller('EditController', function($scope, $http, $routeParams, $location) {
  const routeId = $routeParams.id;

  // Get user info based on id
  $scope.getUserInfo = () => {
    $http.get(`/api/users/${routeId}`).then((res) => {
      $scope.user = res.data;
    });
  }

  // Update a user in the database
  $scope.updateUser = () => {
    const data = {
      firstName: $scope.user.firstName,
      lastName: $scope.user.lastName,
      email: $scope.user.email
    };

    $http.put(`/api/users/${routeId}/update`, data).then(res => {
      $location.path('/');
    }).catch(e => {
      console.log(`Error: ${e}`);
    });
  }
});