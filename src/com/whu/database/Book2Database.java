package com.whu.database;

import com.whu.entity.PhotoBook;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class Book2Database {
    public static void delete(String username, String bookID){
        Connection conn = DBConnection.getConnection();
        try{
            String sql = "delete from photobook where user = '"+ username +"' and bookID = '" + bookID +"'";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public static void insert(PhotoBook PhotoBook){
        Connection conn = DBConnection.getConnection();
        try{
            String sql = "insert into photobook(user,bookid,cover,content,type) values(?,?,?,?,?)";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1,PhotoBook.getUser());
            stmt.setString(2,PhotoBook.getBookId());
            stmt.setString(3,PhotoBook.getCover());
            stmt.setString(4,PhotoBook.getContent());
            stmt.setString(5,PhotoBook.getType());
            stmt.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
        }catch (Exception e){
            e.printStackTrace();
        }
    }


    public static List selectAllBook(String user){
        Connection conn = DBConnection.getConnection();
        List<PhotoBook> list  = new ArrayList<>();
        try{
            String sql = "select* from photobook where user = '" + user +"'";
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            PhotoBook photoBook = null;

            while(rs.next()){
                photoBook = new PhotoBook();
                photoBook.setUser(user);
                photoBook.setBookId(rs.getString("bookid"));
                photoBook.setCover(rs.getString("cover"));
                photoBook.setContent(rs.getString("content"));
                photoBook.setType(rs.getString("type"));
                list.add(photoBook);
            }
        }catch (SQLException e){
            e.printStackTrace();
        }catch (Exception e){
            e.printStackTrace();
        }
        return  list;
    }
}
