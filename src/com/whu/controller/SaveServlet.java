package com.whu.controller;

import com.google.gson.*;
import com.whu.database.Book2Database;
import com.whu.database.Photo2Database;
import com.whu.entity.Photo;
import com.whu.entity.PhotoBook;
import org.apache.commons.io.FileUtils;

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
        String basePath = servletContext.getRealPath("/");
        Properties property = System.getProperties();
        property.setProperty( "user.dir", basePath );

        //插入封面和背景
        String cover = req.getParameter("cover").replace("http://localhost:8080/","");
        String background = req.getParameter("background").replace("url(\"","")
                .replace("\")","").replace("http://localhost:8080/","");
        PhotoBook pBook = new PhotoBook();
        pBook.setUser("William");
        pBook.setBookId("book_id");
        pBook.setCover(basePath + cover);
        pBook.setContent(basePath + background);
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
            Photo book = new Photo();
            JsonArray page = json.get(i).getAsJsonArray();
            //空页
            if(page.size() == 0) continue;
            //将读取的每本书的数组信息赋值到相应实体类PhotoBook中
            for (int j = 0; j < page.size(); j++) {
                JsonArray photo = page.get(j).getAsJsonArray();
                //book.setUser((String) req.getSession().getAttribute("id"));
                book.setUser("William");
                book.setBookId(req.getParameter("book_id"));
                //先将用到的图片复制到用户文件夹下的以照片书名命名的文件夹中
                //源文件
                //读出http://localhost:8080/
                String imgRowPath = photo.get(0).getAsString();
                String imgPath = imgRowPath.replace("http://localhost:8080/","");
                File source = new File(basePath + imgPath);
                String path = basePath + "uploadDir/img/" + book.getUser() + "/" + book.getBookId() + "/";
                //目标文件的目录
                File dir = new File(path);
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                //目标文件对象
                File dest = new File(path + source.getName());
                //文件复制函数
                FileUtils.copyFile(source, dest);
                //再将这个文件的路径初始化给PhotoBook
                book.setPath(dest.getPath());
                book.setX(photo.get(1).getAsDouble());
                book.setY(photo.get(2).getAsDouble());
                book.setWidth(photo.get(3).getAsDouble());
                book.setHeight(photo.get(4).getAsDouble());
                book.setCx(photo.get(5).getAsDouble());
                book.setCy(photo.get(6).getAsDouble());
                book.setArc(photo.get(7).getAsDouble());
                book.setPage(i);
                //book存入数据库
                Photo2Database.insert(book);
            }
        }
    }
}


