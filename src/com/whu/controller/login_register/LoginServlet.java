package com.whu.controller.login_register;

import com.whu.database.User2DataBase;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import javax.script.*;


public class LoginServlet extends HttpServlet {
    private static String errorMessige = null;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //从表单中取值
        String id = request.getParameter("id_login");
        String password = request.getParameter("password_login");
        String password_DB = User2DataBase.select(id);//根据id从数据中select到对应的password


        String message = "";//出错信息

        try {
            //判断账号是否已注册
            if (("0").equals(User2DataBase.select(id))) {
                message = "此账号未注册";
                request.setAttribute("message", message);
              //  request.getRequestDispatcher("/Login.jsp").forward(request, response);
                response.sendRedirect("/Login.jsp");
            } //判断密码是否正确
            else if (password.equals(password_DB)) {
                //登录成功之后跳转到目标界面
              //  request.getRequestDispatcher("/index.jsp").forward(request, response);
                response.sendRedirect("/index.jsp");
            } else {
                message = "密码输入错误";
                request.setAttribute("message", message);
              //  request.getRequestDispatcher("/Login.jsp").forward(request, response);
                response.sendRedirect("/Login.jsp");
            }
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }
}
