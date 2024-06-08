package swa.labor.SocialNetwork.model;

import jakarta.persistence.*;

@Entity
@Table(name = "voting")
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "COMMENT", referencedColumnName = "ID", nullable = false)
    private Comment comment;

    @ManyToOne
    @JoinColumn(name = "POST", referencedColumnName = "ID")
    private Post post;


    @ManyToOne
    @JoinColumn(name = "USERS", referencedColumnName = "ID", nullable = false)
    private User user;

    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public void setPost(Post post) { this.post = post; }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Boolean getUpvote() {
        return isUpvote;
    }

    public void setUpvote(Boolean upvote) {
        isUpvote = upvote;
    }

    private Boolean isUpvote;

    public Boolean getIsUpvote() {
        return isUpvote;
    }

    public void setIsUpvote(Boolean isUpvote) {
        this.isUpvote = isUpvote;
    }
}
