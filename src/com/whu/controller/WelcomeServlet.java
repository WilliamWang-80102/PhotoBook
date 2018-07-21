package com.whu.controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.whu.database.Book2Database;
import com.whu.database.Photo2Database;
import com.whu.entity.Photo;
import com.whu.entity.PhotoBook;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

public class WelcomeServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = (String)request.getSession().getAttribute("id");
        String book_id = request.getParameter("book_id");
        List list = Photo2Database.selectByIdAndBook(id,book_id);
        //将实体对象转换为JSON Object转换
        Gson gson = new Gson();
        String jsonArr = photoArrToJsonString(list);

        PhotoBook photoBook = Book2Database.selectBook((String)request.getSession().getAttribute("id"),book_id);
        String cover = photoBook.getCover();
        String background = photoBook.getContent();

        PhotoImages images = new PhotoImages();
        images.setPhotos(jsonArr);
        images.setCover(cover);
        images.setBackground(background);
        String jsonObj = gson.toJson(images);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");
        PrintWriter out = null;
        try {
            System.out.println("返回是\n");
            System.out.println(jsonObj);
            out = response.getWriter();
            out.append(jsonObj);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (out != null) {
                out.close();
            }
        }

    }



    protected  String photoArrToJsonString(List list){
        //找出书本页数photoNumbers
        int pageNumbers =  -1;
        for (Object o:list) {
            Photo photo = (Photo) o;
            if(photo.getPage() > pageNumbers){
                pageNumbers = photo.getPage();
            }
        }
        pageNumbers += 1;
        //生成三维数组，第一维标志页码，第二维标志第几张照片，第三维的8个信息为照片信息
        List pages = new ArrayList();
        List photosInPage = new ArrayList();
        String jsonArr = null;
        int page = 0;
        for(Object o: list){
            Photo photo = (Photo) o;
            //需翻面
            for(;page < photo.getPage();page++) {
                pages.add(photosInPage);
                photosInPage = new ArrayList();
            }
            //当前页增加图片
            String[] photoArr = new String[8];
            photoArr[0] = photo.getPath();
            photoArr[1] = ((Double)photo.getX()).toString();
            photoArr[2] = ((Double)photo.getY()).toString();
            photoArr[3] = ((Double)photo.getWidth()).toString();
            photoArr[4] = ((Double)photo.getHeight()).toString();
            photoArr[5] = ((Double)photo.getCx()).toString();
            photoArr[6] = ((Double)photo.getHeight()).toString();
            photoArr[7] = ((Double)photo.getArc()).toString();
            photosInPage.add(photoArr);
            //最后一张图片存入数组中后，完成整本书的页面数组pages，并将其转换为String[][][]类型的数组，再转换为字符串
            if(list.get(list.size()-1).equals(o)){
                pages.add(photosInPage);
                Gson gson = new Gson();
                jsonArr = gson.toJson(pages);
            }
        }
        return jsonArr;
    }
}

class PhotoImages{
    String cover;
    String background;
    String photos;

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public String getPhotos() {
        return photos;
    }

    public void setPhotos(String photos) {
        this.photos = photos;
    }
}