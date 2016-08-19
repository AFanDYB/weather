
var app = angular.module('weatherapp',['ngRoute']);
app.config(function($routeProvider){
	$routeProvider.when('/current',{
		controller: 'currentCtrl',
		templateUrl: 'view/current.html'
	}).when('/place',{
		controller: 'placeCtrl',
		templateUrl: 'view/place.html'
	})
	//如果找不到对应的路由那就跳到current模版文件
	.otherwise({
		redirectTo: '/current'
	})
});
// 首页控制器
app.controller('currentCtrl',['$scope','$http',function($scope,$http){
	$scope.bodyClass = document.getElementsByTagName('body')[0];
	$scope.bodyClass.setAttribute('class','');
	$scope.onOff = false;
	$scope.search = function(){
		$scope.onOff = false;
		$scope.getCity = document.getElementById('city');
		if($scope.getCity.value === ''){
			$scope.cityPhp('广州');
			alert('请输入正确的城市');
		}else{
			$scope.cityPhp($scope.getCity.value);
			$scope.getCity.value = '';
		}
	}
	$scope.cityPhp = function(c){
		$http({
			method: 'get',
			url: 'weather.php',
			params: {
				city:c,
			},
		}).success(function(data) {
			$scope.onOff = true;
			$scope.data = data["HeWeather data service 3.0"][0];
			$scope.month = $scope.data.daily_forecast[0].date.split('-')[1];
			$scope.day = $scope.data.daily_forecast[0].date.split('-')[2];
			$scope.date = new Date();
			$scope.daily = $scope.data.daily_forecast;
			function fnWeek(newDate){
				// 星期的获取
				var nWeek = newDate.getDay();
				var arrWeek = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六',]
				return arrWeek[nWeek];
			}
			$scope.week = fnWeek($scope.date);
			$scope.c = document.getElementById("myCanvas");
			$scope.cxt = $scope.c.getContext("2d");
			$scope.cxt.clearRect(0,0,980,260);
			$scope.X = 20;
			$scope.Y = 70;
			$scope.cxt.beginPath();
			// $scope.imgData=$scope.cxt.createImageData();
			for(var i=0; i<$scope.daily.length; i++){
				if(i===0){
					$scope.cxt.moveTo($scope.X,$scope.Y);
					$scope.cxt.fillText($scope.daily[i].tmp.max+'°',$scope.X-10,$scope.Y-10);
					$scope.cxt.fillText($scope.daily[i].tmp.min+'°',$scope.X-10,$scope.Y+20);
				}else{
					if((parseInt($scope.daily[i].tmp.max)+parseInt($scope.daily[i].tmp.min))<(parseInt($scope.daily[i-1].tmp.max)+parseInt($scope.daily[i-1].tmp.min))){
						$scope.Y += 10;
						$scope.cxt.lineTo($scope.X,$scope.Y);
						$scope.cxt.fillText($scope.daily[i].tmp.max+'°',$scope.X-10,$scope.Y-10);
						$scope.cxt.fillText($scope.daily[i].tmp.min+'°',$scope.X-10,$scope.Y+20);
					}else if((parseInt($scope.daily[i].tmp.max)+parseInt($scope.daily[i].tmp.min))==(parseInt($scope.daily[i-1].tmp.max)+parseInt($scope.daily[i-1].tmp.min))){
						$scope.cxt.lineTo($scope.X,$scope.Y);
						$scope.cxt.fillText($scope.daily[i].tmp.max+'°',$scope.X-10,$scope.Y-10);
						$scope.cxt.fillText($scope.daily[i].tmp.min+'°',$scope.X-10,$scope.Y+20);
					}else{
						$scope.Y -= 10;
						$scope.cxt.lineTo($scope.X,$scope.Y);
						$scope.cxt.fillText($scope.daily[i].tmp.max+'°',$scope.X-10,$scope.Y-10);
						$scope.cxt.fillText($scope.daily[i].tmp.min+'°',$scope.X-10,$scope.Y+20);
					}
				}
				$scope.cxt.stroke();
				$scope.X += 43;
			}
			$scope.cxt.closePath();
			console.log(data);
		})
	}
	$scope.cityPhp('广州');
}]);
// 城市页面控制器
app.controller('placeCtrl',['$scope','$http',function($scope,$http){
	$scope.bodyClass = document.getElementsByTagName('body')[0];
	$scope.bodyClass.setAttribute('class','add');
	$scope.fnReturn = function(){}
	$scope.fnMenu  = function(){}
	$scope.getCityName = function(){
	 	$scope.cName = document.getElementsByTagName('input')[0].value;
		$http({
			method: 'get',
			url: 'weather.php',
			params: {
				city:$scope.cName,
			},
		}).success(function(data){
			console.log(data["HeWeather data service 3.0"][0]);
		});
	}
}]);