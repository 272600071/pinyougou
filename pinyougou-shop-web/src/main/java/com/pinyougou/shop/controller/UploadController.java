package com.pinyougou.shop.controller;

import com.pinyougou.util.FastDFSClient;
import entity.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author jack
 * @version 1.0
 * @description com.pinyougou.shop.controller
 * @date 2018/4/28
 */
@RestController
public class UploadController {
    @Value("${IMAGE_SERVER_URL}")
    private String IMAGE_SERVER_URL;

    @RequestMapping("/upload")
    public Result upload(MultipartFile file){
        String filename = file.getOriginalFilename();
        String extName = filename.substring(filename.lastIndexOf("."));
        try {
            FastDFSClient fastDFSClient=new FastDFSClient("classpath:config/fdfs_client.properties");
            String path = fastDFSClient.uploadFile(file.getBytes(), extName);
            String url = IMAGE_SERVER_URL + path;
            return new Result(true,url);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,"上传失败");
        }

    }
}
