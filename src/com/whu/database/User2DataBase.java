package com.whu.database;

import com.whu.database.DBConnection;
import com.whu.entity.login;

import java.sql.*;


public class User2DataBase {

    public static void insert(String id, String password_2) {
        Connection conn = DBConnection.getConnection();

        try {

            String sql = "insert into pass (user, password) values (?, ?)";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1,id);
            stmt.setString(2,password_2);
            stmt.executeUpdate();

        }catch (SQLException e){
            e.printStackTrace();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public static String select(String userid){
        Connection conn = DBConnection.getConnection();
        String passwordyz = null;
        try{
            String sql = "select password from pass where user = '"+ userid +"'";
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()){
                //System.out.println(rs.getString(1));
                 passwordyz = rs.getString(1);
            }

        }catch(SQLException e){
            e.printStackTrace();
        }catch (Exception e){
            e.printStackTrace();
        }
        return passwordyz;
    }

    public static void update(login login){
        Connection conn = DBConnection.getConnection();
        int i = 0;

        String sql = "update pass set sex = '" + login.getSex() + "', password = '" + login.getPassword() + "' where user = '"+ login.getUser() + "'" ;
        PreparedStatement stmt;
        try{
            stmt = (PreparedStatement) conn.prepareStatement(sql);
            i = stmt.executeUpdate();
            System.out.println(i);
        }catch (SQLException e){
            e.printStackTrace();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public static int test(String userid){
        Connection conn = DBConnection.getConnection();
            int count = 0;
        try{
            String sql = "select count(*) from pass where user = '"+ userid +"'";
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            while(rs.next()){
                 count = rs.getInt(1);
            //    System.out.println(count);

            }
        }catch (SQLException e){
            e.printStackTrace();
        }catch (Exception e){
            e.printStackTrace();
        }
        return count;
    }

}
