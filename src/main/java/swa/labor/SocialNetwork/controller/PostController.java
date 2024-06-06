package swa.labor.SocialNetwork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swa.labor.SocialNetwork.model.Post;
import swa.labor.SocialNetwork.service.PostService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody Post post) {
        try {
            Post createdPost = postService.createPost(post.getText(), post.getLongitude(), post.getLatitude(), post.getAuthor().getId());
            return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Integer id) {
        Optional<Post> postOptional = postService.getPostById(id);
        if (postOptional.isPresent()) {
            return new ResponseEntity<>(postOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Post not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Integer id) {
        try {
            postService.deletePost(id);
            return new ResponseEntity<>("Post deleted", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
