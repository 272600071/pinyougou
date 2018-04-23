package com.pinyougou.sellergoods.service;

import com.pinyougou.entity.PageResult;
import com.pinyougou.pojo.TbBrand;

import java.util.List;

/**
 * @author jack
 * @version 1.0
 * @description com.pinyougou.sellergoods.service
 * @date 2018/4/21
 */
public interface BrandService {
    /**
     *查找所有的方法
     */
    public List<TbBrand> findAll();
    /**
     *分页查找的方法
     */
    public PageResult findPage(Integer pageNum,Integer pageSize);
    //插入一条数据
    void add(TbBrand tbBrand);
    //修改商品
    public void update(TbBrand tbBrand);
    //回显一个品牌
    public TbBrand findOne(Long id);
    //删除品牌
    public void delete(Long[] ids);
    //条件查询
    public PageResult findPage(TbBrand brand, int pageNum,int pageSize);
}
