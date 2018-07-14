package com.whu.controller.download;

import com.whu.img.Image2Byte;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@WebServlet(name = "FileDownLoadServlet")
public class FileDownLoadServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //response.setContentType("image/jpg");

        File file=new File("DBConnection.load()");
        /*调用DBConnection中的load方法
        * 得到数据库中所有的image
        */
        //File file=new File("D:/pic");
        List list=Image2Byte.image2ByteFolder(file);
     //   List list=Image2Byte.image2ByteFolder();

        try {
            //获得从database中下载数据存入一个List中
            for (int i = 0; i < list.size(); i++) {
                //将byte型的数组在网页上显示出来
                ServletOutputStream servletOutputStream = response.getOutputStream();
                servletOutputStream.write((byte[]) list.get(i));
                servletOutputStream.close();
            }
        }catch (Throwable throwable){
            throwable.printStackTrace();;
        }
    }
}
