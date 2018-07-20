package com.whu.controller.upload;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.whu.database.DBConnection;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class UploadTestServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    /** 上传目录名*/
    private static final String UPLOAD_DIR = "uploadDir/img/";
    /** 上传临时文件存储目录*/
    private static final String TEMP_UPLOAD_DIR ="uploadDir/temp/";
    /** 总上传文件最大为10M*/
    private static final Long TOTAL_FILE_MAXSIZE = 10000000L;
    /** 单个上传文件最大为10M*/
    private static final int SINGLE_FILE_MAXSIZE = 2*1024*1024;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("UploadTestServlet in");
        //设置编码格式，前端后台统一是utf-8
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/json;charset=utf-8");
        //
        PrintWriter out = response.getWriter();
        // Servlet上下文对象
        ServletContext servletContext = this.getServletConfig().getServletContext();
        // tomcat的项目路径
        String realPath = servletContext.getRealPath(UPLOAD_DIR);
        String tempPath = servletContext.getRealPath(TEMP_UPLOAD_DIR);
        File tempPathFile = new File(tempPath);
        File realPathFile = new File(realPath);
        if (!tempPathFile.exists()) {
            tempPathFile.mkdirs();
        }
        if (!realPathFile.exists()) {
            realPathFile.mkdirs();
        }

        // 文件对象的工厂类
        DiskFileItemFactory factory = new DiskFileItemFactory();
        // 设置最大上传大小
        factory.setSizeThreshold(SINGLE_FILE_MAXSIZE);
        // 将临时文件夹交给文件对象的工厂类
        factory.setRepository(tempPathFile);
        // 创建一个上传文件的处理者
        ServletFileUpload upload = new ServletFileUpload(factory);
        // 设置所有请求的总大小
        upload.setSizeMax(TOTAL_FILE_MAXSIZE);
        // 解析request
        List<FileItem> items;
        //得到当前登录用户的id
        String id=(String)request.getSession().getAttribute("id");
        //清空该用户数据库temp表
        DBConnection.removeTemp(id);
        //清空该用户temp文件夹下的文件
        String tempFile=UPLOAD_DIR + id + "/temp";
        String tempFileReal=servletContext.getRealPath(tempFile);
        deleteTempFile(tempFileReal);

        try {
            items = upload.parseRequest(request);
            // 处理解析处理的请求对象
            Iterator<FileItem> iter = items.iterator();
            while (iter.hasNext()) {
                FileItem item = iter.next();
                //判断是文件还是文本
                if (!item.isFormField()) {
                    //文件名加上UUid，可以防止重复
                    //String fileName = UUID.randomUUID().toString().replace("-", "")+"_"+item.getName();
                    String fileName = item.getName();
                    System.out.println("UploadTestServlet file path:"+UPLOAD_DIR+fileName);
                    //判断空
                    if (fileName!=null && !"".equals(fileName)) {

                        String imgPath = realPath + id + "/temp/";

                        File imgDir = new File(imgPath);
                        if (!imgDir.exists()) {
                            imgDir.mkdirs();
                        }
                        //将文件写到硬盘
                        item.write(new File(imgPath + fileName));
                        //将图片地址保存到request中，再转发回给jsp
                        //UPLOAD_DIR+fileName这个是相对路径，给前端页面
                        //realPath+fileName是绝对路径s
                        //request.setAttribute("path", UPLOAD_DIR+fileName);
                        //request.getRequestDispatcher("/UploadTest.jsp").forward(request, response);
                        //存入数据库
                        DBConnection.save2Temp(id,UPLOAD_DIR  + id + "/temp/" +fileName);
                        out.write("ok");
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    protected void deleteTempFile(String path){
        File tempFile=new File(path);
        File[] tempFiles=tempFile.listFiles();
        for(int i=0;i<tempFiles.length;i++){
            tempFiles[i].delete();
        }
    }
}