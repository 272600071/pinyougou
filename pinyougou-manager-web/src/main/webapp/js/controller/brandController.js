app.controller('brandController',function ($scope,$controller,brandService) {
    $controller('baseController',{$scope:$scope})
    $scope.findAll=function () {
        brandService.findAll().success(
            function (response) {
                $scope.list=response;
            })
    }

    $scope.findPage=function(page,rows){
        brandService.findPage(page,rows).success(
            function(response){
                $scope.list=response.rows;
                $scope.paginationConf.totalItems=response.total;//更新总记录数
            }
        );
    }

    //添加品牌
    $scope.add=function () {
        //var methodName='add';
        var serviceObject=brandService.add($scope.entity);
        if ($scope.entity.id != null){
            // methodName='update';
            serviceObject=brandService.update($scope.entity);
        }
        serviceObject.success(
            function (response) {
                if (response.success){
                    $scope.reloadList();
                }else {
                    alert(response.message)
                }
            }
        )
    }
    //查找一个
    $scope.findOne=function (id) {
        brandService.findOne(id).success(
            function (response) {
                $scope.entity=response;
            }
        )
    }

    $scope.dele=function(){
        //获取选中的复选框
        brandService.dele($scope.selectIds).success(
            function(response){
                if(response.success){
                    $scope.reloadList();//刷新列表
                }
            }
        );
    }
    $scope.searchEntity={};
    //条件查询
    $scope.search=function(page,rows){
        brandService.search(page,rows,$scope.searchEntity).success(
            function(response){
                $scope.paginationConf.totalItems=response.total;//总记录数
                $scope.list=response.rows;//给列表变量赋值
            }
        );
    }
})