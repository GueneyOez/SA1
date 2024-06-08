package swa.labor.SocialNetwork.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swa.labor.SocialNetwork.model.Comment;
import swa.labor.SocialNetwork.model.Post;
import swa.labor.SocialNetwork.model.User;
import swa.labor.SocialNetwork.repository.CommentRepository;
import swa.labor.SocialNetwork.repository.PostRepository;
import swa.labor.SocialNetwork.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Comment createComment(String ctext, Double longitude, Double latitude, Integer authorId, Integer postId) {
        Optional<User> authorOptional = userRepository.findById(authorId);
        Optional<Post> postOptional = postRepository.findById(postId);

        if (authorOptional.isPresent() && postOptional.isPresent()) {
            Comment comment = new Comment();
            comment.setCtext(ctext);
            comment.setLongitude(longitude);
            comment.setLatitude(latitude);
            comment.setPostedAt(LocalDateTime.now());
            comment.setAuthor(authorOptional.get());
            comment.setPost(postOptional.get());
            return commentRepository.save(comment);
        } else {
            throw new IllegalArgumentException("Invalid author ID or post ID");
        }
    }

    public List<Comment> getCommentsByPostId(Integer postId) {
        return commentRepository.findByPostId(postId);
    }

    public Optional<Comment> getCommentById(Integer commentId) {
        return commentRepository.findById(commentId);
    }
}
