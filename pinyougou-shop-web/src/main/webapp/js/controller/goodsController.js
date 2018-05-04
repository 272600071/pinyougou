 //控制层 
app.controller('goodsController' ,function($scope,$location,$controller,itemCatService,typeTemplateService,uploadService,goodsService){
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(){
        var id = $location.search()['id'];
        if (id==null){
        	return;
		}
		goodsService.findOne(id).success(
			function (response) {
                $scope.entity= response;
                //向富文本编辑器添加商品介绍
                editor.html($scope.entity.goodsDesc.introduction)
                //显示图片列表
				$scope.entity.goodsDesc.itemImages=JSON.parse($scope.entity.goodsDesc.itemImages);
                //显示扩展属性
                $scope.entity.goodsDesc.customAttributeItems=  JSON.parse($scope.entity.goodsDesc.customAttributeItems);
                //规格
				$scope.entity.goodsDesc.specificationItems=JSON.parse($scope.entity.goodsDesc.specificationItems);
				for (var i=0;i<$scope.entity.itemList.length;i++){
                    $scope.entity.itemList[i].spec=JSON.parse($scope.entity.itemList[i].spec);
				}

            }
		)
		/*goodsService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);		*/
	}
	
	//保存 
	$scope.save=function(){
        $scope.entity.goodsDesc.introduction=editor.html();
		var serviceObject;//服务层对象  				
		if($scope.entity.goods.id!=null){//如果有ID
			serviceObject=goodsService.update( $scope.entity ); //修改  
		}else{
			serviceObject=goodsService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
                   /* alert('保存成功');
                    $scope.entity={};
                    editor.html("");*/
                    location.href="goods.html";//跳转到商品列表页
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
				}						
			}
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		goodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	$scope.add=function () {
        $scope.entity.goodsDesc.introduction=editor.html();
		goodsService.add($scope.entity).success(
			function (response) {
				if (response.success){
                    editor.html('');
                    $scope.entity={};
                    alert('保存成功');
				}else {
                    alert(response.message);
				}
            }
		)
    }

    //上传图片

    $scope.uploadFile=function () {
        uploadService.uploadFile().success(
            function (response) {//result :包含里面的图片的URL
                if(response.success){
                    $scope.image_entity.url=response.message;
                }else{
                    alert("失败");
                }

            }
        )
    }

    $scope.entity={goods:{},goodsDesc:{itemImages:[]},itemList:[]};
    /**
     * 将图片对象添加到数组中
     */
    $scope.add_image_entity=function () {
        $scope.entity.goodsDesc.itemImages.push($scope.image_entity);
    }
    $scope.remove_image_entity=function(index){
        $scope.entity.goodsDesc.itemImages.splice(index,1);
    }

    //读取一级分类
	$scope.selectItemCat1List=function () {
		itemCatService.findByParentId(0).success(
			function (response) {
			$scope.itemCat1List=response;
        })
    }
    $scope.$watch('entity.goods.category1Id',function (newValue, oldValue) {
        //根据选择的值，查询二级分类
        itemCatService.findByParentId(newValue).success(
            function(response){
                $scope.itemCat2List=response;
            }
        );
    })
	$scope.$watch('entity.goods.category2Id',function (newValue, oldValue) {
		itemCatService.findByParentId(newValue).success(
			function (response) {
				$scope.itemCat3List=response;
            }
		)
    })
	$scope.$watch('entity.goods.category3Id',function (newValue, oldValue) {
		itemCatService.findOne(newValue).success(
			function (response) {
				$scope.entity.goods.typeTemplateId=response.typeId;
            }
		)
    })
    $scope.$watch('entity.goods.typeTemplateId',function (newValue, oldValue) {
        typeTemplateService.findOne(newValue).success(
            function (response) {
                $scope.typeTemplate=response;//获取类型模板
                $scope.typeTemplate.brandIds= JSON.parse( $scope.typeTemplate.brandIds);//品牌列表
				if ($location.search()['id']==null){

                    $scope.entity.goodsDesc.customAttributeItems=JSON.parse( $scope.typeTemplate.customAttributeItems);
                }
            }
        )
        typeTemplateService.findSpecList(newValue).success(
            function(response){
                $scope.specList=response;
            }
        );
    })
    //查询规格列表

	$scope.entity={ goodsDesc:{itemImages:[],specificationItems:[]} }
    $scope.updateSpecAttribute=function ($event,name,value) {
		var object = $scope.searchObjectByKey($scope.entity.goodsDesc.specificationItems ,'attributeName', name);
		if (object!=null){
			if ($event.target.checked){
                object.attributeValue.push(value);
			}else {
                object.attributeValue.splice( object.attributeValue.indexOf(value ) ,1);
                if (object.attributeValue.length==0){
                    $scope.entity.goodsDesc.specificationItems.splice(
                    	$scope.entity.goodsDesc.specificationItems.indexOf(object),1)
				}
			}
		}else {
            $scope.entity.goodsDesc.specificationItems.push({"attributeName":name,"attributeValue":[value]});
        }
    }
    //创建SKU列表
    $scope.createItemList=function(){
        $scope.entity.itemList=[{spec:{},price:0,num:99999,status:'0',isDefault:'0' } ];
        //初始
        var items=  $scope.entity.goodsDesc.specificationItems;
        for (var i=0;i<items.length;i++){
            $scope.entity.itemList = addColumn(
            	$scope.entity.itemList,items[i].attributeName,items[i].attributeValue );
		}
    }
    //添加列值
    addColumn=function(list,columnName,conlumnValues){
        var newList=[];//新的集合
        for(var i=0;i<list.length;i++){
            var oldRow= list[i];
            for(var j=0;j<conlumnValues.length;j++){
                var newRow= JSON.parse( JSON.stringify( oldRow )  );//深克隆
                newRow.spec[columnName]=conlumnValues[j];
                newList.push(newRow);
            }
        }
        return newList;
    }
    $scope.status=['未审核','已审核','审核未通过','关闭']

	$scope.itemCatList=[]
	$scope.findItemCatList=function () {
		itemCatService.findAll().success(
			function (response) {
              for(var i=0;i<response.length;i++){
                  $scope.itemCatList[response[i].id]=response[i].name;
			  }
            }
		)
    }
    $scope.checkAttributeValue=function(specName,optionName){
    	var item=$scope.entity.goodsDesc.specificationItems;
    	var object=$scope.searchObjectByKey(item,'attributeName',specName);
    	if (object==null){
    		return false;
		}else {
    		if (object.attributeValue.indexOf(optionName)>=0){
    			return true;
			}else {
                return false;
			}
		}
	}

    });
