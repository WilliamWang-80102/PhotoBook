import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.sql.*;
import javax.servlet.http.Part;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;


public class DBConnection {


    public static Connection getConnection() {
        Connection conn = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            String DB_URL = "jdbc:mysql://localhost/photo?serverTimezone = GMT";
            String USER = "root";
            String PASS = "zhangwei123";
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            System.out.println("Success");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }
/*public static void main(String[] args){
        byte[] a = {10,001};
       // DBConnection.getConnection();
        DBConnection.save(a);
}*/





    public static void save(byte[] item)
    {
        Connection conn = DBConnection.getConnection();
        // Statement stat = null;

        InputStream inputStream = null;


        try{

            //  item = new byte[]{};
            inputStream = new ByteArrayInputStream(item);
            //  inputStream = item.getInputStream();
            //stat = conn.createStatement();
            //  PreparedStatement statement = conn.prepareStatement(sql);
            //String// sql = "INSERT INTO num " + " VALUES () ";
            //String sql = "INSERT INTO num values ('"+ mi() + "')";
            String sql = "INSERT INTO num1 (id) VALUES (?)";

            PreparedStatement stmt = conn.prepareStatement(sql);

            stmt.setBlob(1,inputStream);



            stmt.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
        }catch (Exception e){
            e.printStackTrace();
        }
    }


    public static int mi()
    {
        int a =2, b= 3;
        int c = a + b;
        return c;
    }



}
  /*  static final String JDBC_Driver = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost/photo?serverTimezone = GMT";
    static final String USER = "root";
    static final String PASS = "zhangwei123";

    public static void main(String[] args){
        Connection conn = null;
        Statement stmt = null;
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            System.out.println("连接数据库");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            System.out.println("连接成功");
            System.out.println("插入数据");
            stmt = conn.createStatement();

            String sql = "INSERT INTO num " + "VALUES (1233) ";
            stmt.executeUpdate(sql);
            String sql1 = "INSERT INTO num " + "VALUES (4567) ";
            stmt.executeUpdate(sql1);
        }catch (SQLException se){
            se.printStackTrace();
        }catch (Exception e){
            e.printStackTrace();
        }finally{
            try{
                if(stmt!=null)
                    conn.close();
            }catch (SQLException se){
             se.printStackTrace();
            }
        }
        System.out.println("bye");
}*/