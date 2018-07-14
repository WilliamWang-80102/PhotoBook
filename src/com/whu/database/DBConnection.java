package com.whu.database;

import java.io.ByteArrayInputStream;
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

    public static void save(byte[] item) {
        Connection conn = DBConnection.getConnection();
        InputStream inputStream = null;
        try {
            inputStream = new ByteArrayInputStream(item);
            String sql = "INSERT INTO num1 (image) VALUES (?)";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setBlob(1, inputStream);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static List load() {
        List list = new ArrayList();
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = null;
        ResultSet rs = null;
        InputStream inputStream = null;
        try {
            String sql = "select id,image from num1 where id>0";
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();
            while (rs.next()) {
                int id = rs.getInt(1);
                Blob image = rs.getBlob(2);
                inputStream = image.getBinaryStream();
                byte[] buffer = new byte[1024];
                int len = 0;
                while ((len = inputStream.read(buffer)) != -1) {
                    inputStream.read(buffer, 0, len);
                }
                inputStream.read(buffer);
                list.add(buffer);
                inputStream.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}