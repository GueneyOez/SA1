package swa.labor.SocialNetwork.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swa.labor.SocialNetwork.model.Post;
import swa.labor.SocialNetwork.model.User;
import swa.labor.SocialNetwork.repository.PostRepository;
import swa.labor.SocialNetwork.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Post createPost(String text, Float longitude, Float latitude, Integer authorId) {
        Optional<User> userOptional = userRepository.findById(Long.valueOf(authorId));
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("Author not found");
        }

        Post post = new Post();
        post.setText(text);
        post.setLongitude(longitude);
        post.setLatitude(latitude);
        post.setPostedAt(LocalDateTime.now());
        post.setAuthor(userOptional.get());

        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Integer id) {
        return postRepository.findById(id);
    }

    public void deletePost(Integer id) {
        postRepository.deleteById(id);
    }
}
