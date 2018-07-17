package com.whu.database;

import com.whu.entity.Photo;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Photo2Database {
    public static void insert(Photo p){
        Connection conn = DBConnection.getConnection();
        String sql = "INSERT INTO photos VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        PreparedStatement stmt = null;
        try{
            stmt = conn.prepareStatement(sql);
            stmt.setString(1,p.getUser());
            stmt.setString(2,p.getBookId());
            stmt.setString(3,p.getPath());
            stmt.setDouble(4,parser(p.getX()));
            stmt.setDouble(5,parser(p.getY()));
            stmt.setDouble(6,parser(p.getWidth()));
            stmt.setDouble(7,parser(p.getHeight()));
            stmt.setDouble(8,parser(p.getCx()));
            stmt.setDouble(9,parser(p.getCy()));
            stmt.setDouble(10,parser(p.getArc()));
            stmt.setInt(11,p.getPage());
            stmt.executeUpdate();
            conn.close();
        }catch (SQLException e){
            e.printStackTrace();
        }
    }
    public static List selectAll(){
        Connection conn = DBConnection.getConnection();
        String sql = "SELECT * FROM photos";
        PreparedStatement stmt = null;
        ResultSet rs = null;
        List<Photo> list = new ArrayList<>();
        try{
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();
            while(rs.next()){
                Photo book = new Photo();
                book.setUser(rs.getString("user"));
                book.setBookId(rs.getString("bookid"));
                book.setPath(rs.getString("path"));
                book.setX(rs.getDouble("x"));
                book.setY(rs.getDouble("y"));
                book.setWidth(rs.getDouble("Width"));
                book.setHeight(rs.getDouble("Height"));
                book.setCx(rs.getDouble("cx"));
                book.setCy(rs.getDouble("cy"));
                book.setPage(rs.getInt("page"));
                list.add(book);
            }
        }catch (SQLException e){
            e.printStackTrace();
            return null;
        }
        return list;
    }
    //保留小数点后5位
    private static double parser(double d){
        BigDecimal b = new BigDecimal(d);
        return b.setScale(5, BigDecimal.ROUND_HALF_UP).doubleValue();
    }
}
