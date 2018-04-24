app.controller('baseController',function ($scope) {
    $scope.reloadList=function(){
        //切换页码
        $scope.search( $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
    };
    $scope.paginationConf = {
        currentPage: 1,//当前的页码
        totalItems: 10,//总记录数
        itemsPerPage: 10,//每页显示多少行
        perPageOptions: [10, 20, 30, 40, 50],//可以选择的每页显示是的行数
        //当页码被改变的时候触发调用
        onChange: function(){
            // $scope.findPage();
            $scope.reloadList();
        }
    };
    $scope.selectIds=[];//选中的ID集合

    $scope.updateSelection = function ($event, id) {
        if ($event.target.checked) {//如果是被选中,则增加到数组
            $scope.selectIds.push(id);
        } else {
            var idx = $scope.selectIds.indexOf(id);
            $scope.selectIds.splice(idx, 1);//删除
        }
    }
})