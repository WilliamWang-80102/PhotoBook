package com.whu.controller.download;

import com.whu.database.DBConnection;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "FileDownLoadServlet")
public class FileDownLoadServlet extends HttpServlet {
    private static final String UPLOAD_DIR_MAP = "uploadDir/map/";
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletContext servletContext = request.getServletContext();
        String mapPath= servletContext.getRealPath(UPLOAD_DIR_MAP);
        List mapList=new ArrayList();
        File fileMap=new File(mapPath);
        File[] arrayMap=fileMap.listFiles();

        for(int i=0;i<arrayMap.length;i++){
            String path=UPLOAD_DIR_MAP + arrayMap[i].getName();
            //将路径存入mapList中
            mapList.add(path);
        }
        try {
            int a=arrayMap.length;
            List photoList = DBConnection.load((String) request.getSession().getAttribute("id"));
            HttpSession session=request.getSession();
            session.setAttribute("a",a);
            session.setAttribute("fileList",photoList);//照片
            session.setAttribute("MapList",mapList);//贴图
            response.sendRedirect("/mainBoard.jsp");
            //response.sendRedirect("/DB2Web.jsp");
        }catch (Throwable throwable){
            throwable.printStackTrace();
        }
    }
}
