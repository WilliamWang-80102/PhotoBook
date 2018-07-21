package com.whu.test;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

public class GsonTest {
    public static int main() {
        Gson gson = new Gson();
        List<Integer[]> list = new ArrayList<>();
        Integer[] tIntArr = null;
        for (int i = 0; i < 5; i++){
            tIntArr = new Integer[10];
            for (int j = 0; j <10; j++){
                tIntArr[j] = j;
            }
            list.add(tIntArr);
        }
        String jsonArr = gson.toJson(list);
        System.out.println(jsonArr);
        return 0;
    }
}
