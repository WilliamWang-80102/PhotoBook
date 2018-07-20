package com.whu.controller;

import com.google.gson.*;
import com.whu.database.Book2Database;
import com.whu.database.Photo2Database;
import com.whu.entity.Photo;
import com.whu.entity.PhotoBook;
import org.apache.commons.io.FileUtils;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.Properties;

public class SaveServlet extends HttpServlet {
    ServletContext servletContext = null;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        servletContext = req.getServletContext();
        //basePath项目的根目录
        String basePath = servletContext.getRealPath("/");
        //prefix服务器前缀
        String prefix = req.getScheme()+"://"+ req.getServerName() + ":" +req.getServerPort() + "/";

        //所有的“相对路径”均指相对整个项目的根目录的路径
        //根路径basePath通过basePath = servletContext.getRealPath("/")获得
        //插入封面和背景
        String cover = ((String)req.getSession().getAttribute("cover"))
                .replace(prefix,"");//封面的相对路径
        String background = ((String)req.getSession().getAttribute("background"))
                .replace("url(\"","")
                .replace("\")","")
                .replace(prefix,"");//背景的相对路径
        String type = (String)req.getSession().getAttribute("type");
        PhotoBook pBook = new PhotoBook();
        pBook.setUser((String)req.getSession().getAttribute("id"));
        pBook.setBookId(req.getParameter("book_id"));
        pBook.setCover(cover);
        pBook.setContent(background);
        pBook.setType(type);
        Book2Database.insert(pBook);

        //插入照片书中所使用的所有照片
        String jsonArr = req.getParameter("photobook");
        JsonArray json = null;
        try {
            JsonParser parser = new JsonParser();  //创建json解析器
            json = (JsonArray) parser.parse(jsonArr);  //创建jsonObject对象
        } catch (Exception e) {
            e.printStackTrace();
        }
        for (int i = 0; i < json.size(); i++) {
            Photo myPhoto = new Photo();
            JsonArray page = json.get(i).getAsJsonArray();
            //空页
            if(page.size() == 0) continue;
            //将读取的每本书的数组信息赋值到相应实体类PhotoBook中
            for (int j = 0; j < page.size(); j++) {
                JsonArray photo = page.get(j).getAsJsonArray();
                myPhoto.setUser((String)req.getSession().getAttribute("id"));
                myPhoto.setBookId(req.getParameter("book_id"));
                //先将用到的图片复制到用户文件夹下的以照片书名命名的文件夹中
                //源文件
                //读出http://localhost:8080/
                String imgRowPath = photo.get(0).getAsString();
                String imgPath = imgRowPath.replace(prefix,"");
                File source = new File(basePath + imgPath);
                String path = "uploadDir/img/" + myPhoto.getUser() + "/" + myPhoto.getBookId() + "/";
                //目标文件的目录
                File dir = new File(path);
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                //目标文件对象
                File dest = new File(basePath + path + source.getName());
                if(!dest.exists()){
                    //文件复制函数
                    FileUtils.copyFile(source, dest);
                }
                //再将这个文件的路径初始化给PhotoBook
                myPhoto.setPath(path);
                myPhoto.setX(photo.get(1).getAsDouble());
                myPhoto.setY(photo.get(2).getAsDouble());
                myPhoto.setWidth(photo.get(3).getAsDouble());
                myPhoto.setHeight(photo.get(4).getAsDouble());
                myPhoto.setCx(photo.get(5).getAsDouble());
                myPhoto.setCy(photo.get(6).getAsDouble());
                myPhoto.setArc(photo.get(7).getAsDouble());
                myPhoto.setPage(i);
                //book存入数据库
                Photo2Database.insert(myPhoto);
            }
        }

        //请求分派回主页面

        RequestDispatcher rd = req.getRequestDispatcher("/welcome.jsp");
        rd.forward(req,resp);

        //resp.sendRedirect("/welcome.jsp");
    }
}


