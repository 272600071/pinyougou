app.controller('baseController',function ($scope) {
    $scope.reloadList=function(){
        //切换页码
        //$scope.findPage( $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
        $scope.search( $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
        //brandService.search($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
    }
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
    $scope.updateSelection=function ($event,id) {
        if ($event.target.checked){
            $scope.selectIds.push( id);
        }else{
            var idx = $scope.selectIds.indexOf(id);
            $scope.selectIds.splice(idx, 1);//删除
        }
    }
    /**
         *
         * @param jsonString 被传递过来的JSON字符串  [{"id":1,"text":"联想"},{"id":3,"text":"三星"},{"id":7,"text":"中兴"}]
         * @param key 要提取的某一个key的值对应的KEY ---》  text
         */
        //var o = {key:1}
        // o.key=1
        //o['key']=1
        $scope.jsonToString=function(jsonString,key){
            var fromJson = angular.fromJson(jsonString);
            var str="";
            for (var i=0;i<fromJson.length;i++){
                str+= fromJson[i][key]+","
            }

            if(str.length>=1){
                str= str.substring(0,str.length-1);
            }
            return str;

        }
        //从集合中按照key查询对象
        	$scope.searchObjectByKey=function(list,key,keyValue){
        		for(var i=0;i<list.length;i++){
        			if(list[i][key]==keyValue){
        				return list[i];
        			}
        		}
        		return null;
        	}

})