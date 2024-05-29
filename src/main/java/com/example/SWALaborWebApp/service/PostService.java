package com.example.SWALaborWebApp.service;

import com.example.SWALaborWebApp.model.Post;
import com.example.SWALaborWebApp.model.User;
import com.example.SWALaborWebApp.model.Vote;
import com.example.SWALaborWebApp.repository.PostRepository;
import com.example.SWALaborWebApp.repository.UserRepository;
import com.example.SWALaborWebApp.repository.VoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final VoteRepository voteRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository, VoteRepository voteRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.voteRepository = voteRepository;
    }

    public Post createPost(Integer userId, String content) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Post post = new Post();
        post.setUser(user);
        post.setContent(content);
        post.setDatePosted(LocalDateTime.now());
        return postRepository.save(post);
    }

    public List<Post> getPostsFromLast24Hours() {
        LocalDateTime since = LocalDateTime.now().minusDays(1);
        return postRepository.findAllPostsFromLast24Hours(since);
    }

    public Optional<Post> getPostById(Integer postId) {
        return postRepository.findById(postId);
    }

    public void votePost(Integer userId, Integer postId, boolean isUpvote) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));

        Optional<Vote> existingVote = voteRepository.findByUserIdAndPostId(userId, postId);
        Vote vote;
        if (existingVote.isPresent()) {
            vote = existingVote.get();
            if (vote.isUpvote() == isUpvote) {
                return; // User already voted the same way
            }
            // Reversing the vote
            if (isUpvote) {
                post.setUpvotes(post.getUpvotes() + 1);
                post.setDownvotes(post.getDownvotes() - 1);
            } else {
                post.setUpvotes(post.getUpvotes() - 1);
                post.setDownvotes(post.getDownvotes() + 1);
            }
            vote.setUpvote(isUpvote);
        } else {
            // New vote
            vote = new Vote();
            vote.setUser(user);
            vote.setPost(post);
            vote.setUpvote(isUpvote);
            if (isUpvote) {
                post.setUpvotes(post.getUpvotes() + 1);
            } else {
                post.setDownvotes(post.getDownvotes() + 1);
            }
        }
        voteRepository.save(vote);
        postRepository.save(post);
    }

    @Transactional
    public void deletePost(Integer postId) {
        // Delete votes associated with the post first
        voteRepository.deleteByPostId(postId);
        // Then delete the post
        postRepository.deleteById(postId);
    }
}