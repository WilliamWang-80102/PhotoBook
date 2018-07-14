package com.whu.database;

import com.whu.database.DBConnection;

import java.util.List;

//add to database
public class List2DataBase {
    public static byte[] list2DataBase(List list) {

        byte[] a = null;
        for (int i = 0; i < list.size(); i++) {
            a = (byte[]) list.get(i);
            DBConnection.save(a);
        }
        return a;
    }
}