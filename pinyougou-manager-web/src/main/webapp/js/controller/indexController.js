app.controller('indexController',function ($scope,loginService) {
    $scope.getLoginName=function () {
        loginService.getLoginName().success(function (respone) {
            $scope.loginName=respone.loginName;
        })
    }
})