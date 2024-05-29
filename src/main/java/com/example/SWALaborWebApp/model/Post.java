package com.example.SWALaborWebApp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String content;

    @Column(name = "date_posted", nullable = false)
    private LocalDateTime datePosted;

    @Column(name = "date_edited")
    private LocalDateTime dateEdited;

    private int upvotes = 0;
    private int downvotes = 0;

    // Getters and setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(LocalDateTime datePosted) {
        this.datePosted = datePosted;
    }

    public LocalDateTime getDateEdited() {
        return dateEdited;
    }

    public void setDateEdited(LocalDateTime dateEdited) {
        this.dateEdited = dateEdited;
    }

    public int getUpvotes() {
        return upvotes;
    }

    public void setUpvotes(int upvotes) {
        this.upvotes = upvotes;
    }

    public int getDownvotes() {
        return downvotes;
    }

    public void setDownvotes(int downvotes) {
        this.downvotes = downvotes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return upvotes == post.upvotes &&
                downvotes == post.downvotes &&
                Objects.equals(id, post.id) &&
                Objects.equals(user, post.user) &&
                Objects.equals(content, post.content) &&
                Objects.equals(datePosted, post.datePosted) &&
                Objects.equals(dateEdited, post.dateEdited);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, content, datePosted, dateEdited, upvotes, downvotes);
    }
}