package com.whu.controller.login_register;

import com.whu.database.User2DataBase;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.Response;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;

public class RegisterServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


        //从表单中取值
        String id = request.getParameter("id_register");
        String password_1 = request.getParameter("password_register");
        String password_2 = request.getParameter("password_register_2");


        String message = "";//出错信息

        try {
            //判断账号是否已注册
            if ((0)!=(User2DataBase.test(id))) {
                message = "此账号已经注册";
                //request.setAttribute("message", message);
                request.getSession().setAttribute("message",message);
                response.sendRedirect("/Register.jsp");
                //  request.getRequestDispatcher("/Login.jsp").forward(request, response);
                //response.sendRedirect("Login.jsp");
            } //判断密码是否正确

            //判断两次输入的密码是否一致
            else if (password_1.equals(password_2)) {
                message = "注册成功，请登陆";
                //request.setAttribute("message", message);
                request.getSession().setAttribute("message",message);
                /*
                 * 注册成功之后
                 * 将id和password_2存入数据库
                 * 然后跳转到登录界面*/
                User2DataBase.insert(id,password_2);
              //  RequestDispatcher rd = request.getRequestDispatcher("/Login.jsp");
              //  rd.forward(request, response);
                response.sendRedirect("Login.jsp");

            } else {
                message = "两次密码不一致";
                request.getSession().setAttribute("message",message);
              //  request.setAttribute("message", message);
              //  request.getRequestDispatcher("/Register.jsp").forward(request, response);
                response.sendRedirect("/Register.jsp");
            }
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }
}
