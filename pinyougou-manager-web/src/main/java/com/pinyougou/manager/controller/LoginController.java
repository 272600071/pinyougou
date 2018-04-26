package com.pinyougou.manager.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * @author jack
 * @version 1.0
 * @description com.pinyougou.manager.controller
 * @date 2018/4/26
 */
@RequestMapping("/login")
@RestController
public class LoginController {
    @RequestMapping("/userInfo")
    public Map name(){
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        Map map=new HashMap();
        map.put("loginName",name);
        return map;
    }

}
