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
        String cover = req.getParameter("cover");
        String background = req.getParameter("background");
        req.getServletContext().setAttribute("cover",cover);
        req.getServletContext().setAttribute("background",background);
        RequestDispatcher rd = req.getRequestDispatcher("/Uploader.jsp");
        rd.forward(req,resp);
    }
}
