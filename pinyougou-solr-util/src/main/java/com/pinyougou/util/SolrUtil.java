package com.pinyougou.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.pinyougou.mapper.TbItemMapper;
import com.pinyougou.pojo.TbItem;
import com.pinyougou.pojo.TbItemExample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.data.solr.core.SolrTemplate;
import sun.applet.Main;

import java.util.List;
import java.util.Map;

/**
 * @author jack
 * @version 1.0
 * @description com.pinyougou.util
 * @date 2018/5/8
 */
public class SolrUtil {
    @Autowired
    private TbItemMapper itemMapper;
    @Autowired
    private SolrTemplate solrTemplate;
    public void importItemData() {
        TbItemExample example=new TbItemExample();
        TbItemExample.Criteria criteria = example.createCriteria();
        criteria.andStatusEqualTo("1");
        List<TbItem> tbItems = itemMapper.selectByExample(example);
        for(TbItem item:tbItems){
            Map specMap = JSON.parseObject(item.getSpec());
            item.setSpecMap(specMap);
        }
        solrTemplate.saveBeans(tbItems);
        solrTemplate.commit();
        System.out.println("导入完成");
    }
    public static void main(String[] args){
        ApplicationContext context=new ClassPathXmlApplicationContext("classpath:spring/applicationContext-*.xml");
        context.getBean(SolrUtil.class).importItemData();
    }
}
