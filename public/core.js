//Angulur specific front end things are kept here
//

var app = angular.modeule('myapp',[]);



function mainController($scope,$http) {
    $scope.form= {};
    
    
    
    //Get all users from the list from landing page
    
    $http.get('/api/users')
         .success(function (data) {
             $scope.users = data;
             console.log(data);
         })
         .error(function (data) {
            console.log('Error :'+data); 
         });
         
         // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/users', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.users = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/users/' + id)
            .success(function(data) {
                $scope.users = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}