package com.whu.controller;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;

import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "ModulDownLoadServlet")
public class ModulDownLoadServlet extends HttpServlet {
    private static String Module_Cover="/cover/";
    private static String Module_Content="/content/";
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }
    protected static List path2List(String realPath,String dic){
        File realFile=new File(realPath);
        List list=new ArrayList();
        File[] array=realFile.listFiles();
        for(int i=0;i<array.length;i++){
            list.add(dic +  array[i].getName());
        }
        return list;
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String prefix = request.getScheme()+"://"+ request.getServerName() + ":" +request.getServerPort() + "/";
        String type = request.getParameter("type").replace(prefix,"");
        request.getSession().setAttribute("type",type);


        /**
        * 首先根据文件名获取其绝对路径
        * 然后根据绝对路径读取文件夹中的所有图片的相对路径
         * 根据相对路径在module中显示出来**/
        //String path=(String)request.getSession().getAttribute("module");
        String path=request.getParameter("moduleName");
        //得到绝对路径
        String realPathCover=request.getRealPath(path + "/cover/");
        String realPathContent=request.getRealPath(path + "/content/");

        String cover=path + Module_Cover;
        String content=path + Module_Content;
        List listCover=path2List(realPathCover,cover);
        List listContent=path2List(realPathContent,content);

        try{
            //HttpSession sessionModule=request.getSession();
            //sessionModule.setAttribute("listModule",listModule);
            request.getSession().setAttribute("listCover",listCover);
            request.getSession().setAttribute("listContent",listContent);
            response.sendRedirect("/module.jsp");
        }catch (Throwable t){
            t.printStackTrace();
        }
    }
}
