import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(name = "FileUpLoadServlet")
public class FileUpLoadServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

       // response.setContentType("text/html;charset=UTF-8");
        // 处理中文 防止乱码
        //String name = new String(request.getParameter("name").getBytes("ISO8859-1"), "UTF-8");
        String name=request.getParameter("name");
     //   String name1= name.replaceAll("\\\\","/");
        File file=new File(name);
        try {
            List list=Image2Byte.image2ByteFolder(file);
            List2DataBase.list2DataBase(list);
        } catch (IOException e) {
            e.printStackTrace();
        }

     //   PrintWriter out=response.getWriter();
     //   out.println(name);
    //    out.println(name1);

    }
}
