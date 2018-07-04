package db;
import java.sql.*;

public class DBConnection {
    static final String JDBC_Driver = "com.mysql.jdbc.Driver";
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
            String sql = "INSERT INTO num" + "VALUES('1233')";
            stmt.executeUpdate(sql);
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
    }
}
