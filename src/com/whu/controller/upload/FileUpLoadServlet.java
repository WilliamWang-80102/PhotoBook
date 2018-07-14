package com.whu.controller.upload;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.List;

import com.whu.img.*;
import com.whu.database.*;

public class FileUpLoadServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        doGet(request, response);
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 处理中文 防止乱码
        String name = new String(request.getParameter("name").getBytes("ISO8859-1"), "UTF-8");
        File file=new File(name);
        try {
            List list= Image2Byte.image2ByteFolder(file);
            List2DataBase.list2DataBase(list);
        } catch (IOException e) {
            e.printStackTrace();
        }catch(Throwable throwable){
            throwable.printStackTrace();
        }
    }
}
