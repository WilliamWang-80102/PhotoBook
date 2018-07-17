package com.whu.database;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;


public class DBConnection {

    public static Connection getConnection() {
        Connection conn = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            String DB_URL = "jdbc:mysql://localhost/photo?serverTimezone = GMT";
            String USER = "root";
            String PASS = "";
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            System.out.println("Success");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }

    public static void save2Temp(String id,String path) {
        Connection conn = DBConnection.getConnection();
        try {
            String sql = "INSERT INTO temp (id, path) VALUES (?,?)";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1,id);
            stmt.setString(2,path);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void removeTemp(String UserId){
        Connection conn=DBConnection.getConnection();
        try{
            String sql="delete from temp where id='"+UserId+"'";
            PreparedStatement stmt=conn.prepareStatement(sql);
            stmt.executeUpdate();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
    public static List load(String UserId) {
        List list = new ArrayList();
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = null;
        ResultSet rs = null;
        try {
            String sql = "select id,path from temp where id='"+UserId+"'";
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();
            while (rs.next()) {
                String path=rs.getString("path");
                list.add(path);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}