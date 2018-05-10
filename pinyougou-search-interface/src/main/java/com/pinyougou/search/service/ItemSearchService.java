package com.pinyougou.search.service;

import java.util.Map;

/**
 * @author jack
 * @version 1.0
 * @description com.pinyougou.search.service
 * @date 2018/5/9
 */
public interface ItemSearchService {
    /**
     * 搜索
     * @param
     * @return
     */
    public Map<String,Object> search(Map searchMap);
}
