package com.whu.entity;

public class Login {
    //   private String Id;
    private String user;
    private String sex;
    private String password;

    Login(String user, String password, String sex) {
//        this.Id = null; //default
        this.user = user;
        this.sex = sex;
        this.password = password;
    }

    //   public String getId() {
    //      return Id;
    //  }

    //  public void setId(String Id) {
    //       this.Id = Id;
    //  }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}