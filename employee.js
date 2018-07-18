var app = angular.module('myApp', ["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
        .when('/home',
            {
                controller: 'employeeCtrl2',
                templateUrl: 'home.html'
            })

        .when('/list',
            {
                controller: 'employeeCtrl',
                templateUrl: 'employee_list.html'
            })

        .otherwise({ redirectTo: 'home' });
});

app.service('myservice',function( $http ) {
    this.getdata=function(){
        return $http.get("Employee_Data.JSON");
    };
});

app.controller('employeeCtrl', function($scope, myservice) {

       myservice.getdata().then(function (response) {
       $scope.myData = response.data;
           $scope.editData = false;
           $scope.addData = false;
           $scope.emplist = true;
    });



    $scope.del = function(a) {

       // $scope.myData.splice($index, 1);
        $scope.new = $scope.myData;
        $scope.new.splice(a-1,1);

        for(i=0;i<$scope.new.length;i++){
            $scope.myData[i].id = i+1;
        }
        $scope.myData = $scope.new;
    };

    $scope.edit = function(a){
       // console.log("edit index"+index);
       // $scope.enabledEdit[$index] = true;
       $scope.emplist = false;
        $scope.editData = true;
        $scope.firstname = $scope.myData[a-1].firstname;
        $scope.lastname = $scope.myData[a-1].lastname;
        $scope.city = $scope.myData[a-1].city;
        $scope.age = $scope.myData[a-1].age;
        $scope.change = function(){
            $scope.myData[a-1].firstname = $scope.firstname;
            $scope.myData[a-1].lastname = $scope.lastname;
            $scope.myData[a-1].city = $scope.city;
            $scope.myData[a-1].age = $scope.age;
            $scope.editData = false;
            $scope.emplist = true;
        }
    };

    $scope.add = function(){
        $scope.emplist = false;
        $scope.addData = true;

        $scope.idd="";
        $scope.firstname = "";
        $scope.lastname = "";
        $scope.city = "";
        $scope.age = "";
        $scope.addnew = function(){
            console.log($scope.id);
            $scope.myData.push({  id:$scope.idd, firstname: $scope.firstname, lastname: $scope.lastname, city: $scope.city, age: $scope.age });
            $scope.addData = false;
            $scope.emplist = true;
        };

        // var emp ={ firstName:"",lastName:"",city:"",
        //     age:"",disableEdit:false};
        // $scope.myData.push(emp);
        // $scope.enabledEdit[$scope.empoyees.length-1]=true;
    };

});

app.controller('employeeCtrl2', function($scope, myservice, $routeParams, $location,$window) {
          $scope.cancel=function(){
              $window.close();
          };

    $scope.login=function(){
           $location.url('/list');
    };
});