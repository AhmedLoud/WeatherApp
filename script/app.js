angular.module('Weather',['ngCookies'])

    .controller('weatherController',function($scope, $http,$location,$cookies){
        

        $scope.city='';
        $scope.Math = Math;



        $scope.HomeActivate=1;//flag equal 1 when we are in the home page

        $scope.units='°C';
        var cookieSearchTest=0;

        httpSuccess=function (response) {

            $scope.weather=response;
        }

        $scope.changeParam=function()
        {
            $scope.city=1;
        };

        console.log("ok");


        //manage cookies for previous research
        $scope.myCookie=$cookies.get('cookie');
        $scope.setCookie=function(val){
            $cookies.put('cookie',val);
        };

        $scope.search=function(){


            if($scope.myCookie==0)
            {
                var cityName=$scope.myCookie;
            }
            else
            {
                var cityName=document.getElementById('city').value;
            }
            
            $scope.city=cityName;
            var forecast=document.getElementById('forecastId').value;
            var unit=document.getElementById('unitId').value;
            var language=document.getElementById('languageId').value;

            if(unit=='metric')
            {
                $scope.units='°C';
            }
            if (unit=='imperial')
            {
                $scope.units='°F';
            }



            var url='http://api.openweathermap.org/data/2.5/forecast/daily?q='+cityName+'&mode=json&units='+unit+'&cnt='+forecast+'&lang='+language+'&APPID=1b2ab4451203e5c0f8d09fd7cf51cc54';
            $http.get(url).success(httpSuccess).error(function(){
                alert('erreur');
            });
        };



        $scope.selectHome=function(test)
        {
            if(test==1) {
                $scope.HomeActivate = 1;
            }

            if(test==0)
            {
                $scope.HomeActivate=0;
            }

        };



        if($scope.myCookie!=null && cookieSearchTest==0)//if we have a cookie and we havn't searched for the weather of this cookie
        {
            $scope.HomeActivate=0;
            document.getElementById('city').value=$scope.myCookie;
            document.getElementById('forecastId').value=3;
            document.getElementById('unitId').value='metric';
            document.getElementById('languageId').value='en';
            $scope.search();
            cookieSearchTest=1;
        };







    });
