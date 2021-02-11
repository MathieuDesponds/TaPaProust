package tapaproust.backend.entity;

import org.springframework.web.bind.annotation.RequestParam;

import javax.persistence.*;

@Entity
public class Book {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String edition;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private long soldById;

    @Column(nullable = false)
    private String language;

    @Column(nullable = false)
    private String price;


    ///////////////////////////////////////
    //////////     Methodes      //////////
    ///////////////////////////////////////

    public void update(String title, String author, String edition, String state, String language, String price){
        this.title = title;
        this.author = author;
        this.edition = edition;
        this.state = state;
        this.language = language;
        this.price = price;
    }

    ///////////////////////////////////////
    //////////      Getters      //////////
    ///////////////////////////////////////

    public long getId() {
        return id;
    }

    public String getAuthor() {
        return author;
    }

    public String getEdition() {
        return edition;
    }

    public String getLanguage() {
        return language;
    }

    public String getPrice() {
        return price;
    }

    public String getState() {
        return state;
    }

    public String getTitle() {
        return title;
    }

    public long getSoldById() {
        return soldById;
    }

    ///////////////////////////////////////
    //////////      Setters      //////////
    ///////////////////////////////////////

    public void setId(long id) {
        this.id = id;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setSoldById(long soldById) {
        this.soldById = soldById;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
