package com.whu.controller;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ModuleServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        /*
        String url = req.getScheme()+"://"+ req.getServerName()+req.getRequestURI()+"?"+req.getQueryString();
        System.out.println("获取全路径（协议类型：//域名/项目名/命名空间/action名称?其他参数）url="+url);
        String url2=req.getScheme()+"://"+ req.getServerName();//+req.getRequestURI();
        System.out.println("协议名：//域名="+url2);
        int port = req.getServerPort();
        System.out.println("获取项目名="+req.getContextPath());
        System.out.println("获取参数="+req.getQueryString());
        System.out.println("获取全路径="+req.getRequestURL());
        */

        String prefix = req.getScheme()+"://"+ req.getServerName() + ":" +req.getServerPort() + "/";
        String cover = req.getParameter("cover").replace(prefix,"");
        String background = req.getParameter("background").replace(prefix,"");
        req.getSession().setAttribute("cover",cover);
        req.getSession().setAttribute("background",background);
        RequestDispatcher rd = req.getRequestDispatcher("/Uploader.jsp");
        rd.forward(req,resp);
    }
}
