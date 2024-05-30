package com.example.SWALaborWebApp.controller;

import com.example.SWALaborWebApp.model.Post;
import com.example.SWALaborWebApp.model.User;
import com.example.SWALaborWebApp.service.PostService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public String getPosts(Model model) {
        List<Post> posts = postService.getAllPostsSortedByDate();
        model.addAttribute("posts", posts);
        return "posts_page";
    }

    @GetMapping("/{id}")
    public String getPost(@PathVariable("id") Integer id, Model model) {
        Post post = postService.getPostById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        model.addAttribute("post", post);
        return "post_detail";
    }

    @GetMapping("/create")
    public String createPostForm(HttpSession session, Model model) {
        User user = (User) session.getAttribute("userLogin");
        if (user == null) {
            return "redirect:/login";
        }
        model.addAttribute("user", user);
        return "create_post";
    }

    @PostMapping
    public String createPost(@RequestParam("userId") Integer userId, @RequestParam("content") String content) {
        postService.createPost(userId, content);
        return "redirect:/posts";
    }

    @PostMapping("/{id}/vote")
    public String votePost(@PathVariable("id") Integer id, @RequestParam("userId") Integer userId, @RequestParam("isUpvote") boolean isUpvote) {
        postService.votePost(userId, id, isUpvote);
        return "redirect:/posts";
    }

    @PostMapping("/{id}/delete")
    public String deletePost(@PathVariable("id") Integer id, HttpSession session) {
        User user = (User) session.getAttribute("userLogin");
        if (user == null) {
            return "redirect:/login";
        }

        Post post = postService.getPostById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        if (!post.getUser().getId().equals(user.getId())) {
            return "error_page"; // Or any other appropriate response
        }

        postService.deletePost(id);
        return "redirect:/posts";
    }

}
