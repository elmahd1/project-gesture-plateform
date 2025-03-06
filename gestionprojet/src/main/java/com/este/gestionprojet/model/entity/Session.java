package com.este.gestionprojet.model.entity;


public class Session {
    private static Session instance;
    private int userId;
    private String userName;
    private String userRole;
    Boolean isLogged = false;

    // Private constructor to enforce Singleton pattern
    private Session() {}

    // Get the single instance of the Session class
    public static Session getInstance() {
        if (instance == null) {
            instance = new Session();
            
        }
        return instance;
    }

    // Getter and Setter for userId
    public int getUserId() {
        return this.userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    // Getter and Setter for userName
    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    // Getter and Setter for userRole
    public String getUserRole() {
        return this.userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
    public Boolean getIsLogged() {
        return this.isLogged;
    }
    public void setLoggedIn(boolean isLogged) {
        this.isLogged = isLogged;
    }

    // Clear session data
    public void clear() {
        userId = 0;
        userName = null;
        userRole = null;
    }
}