package swa.labor.SocialNetwork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swa.labor.SocialNetwork.model.Comment;
import swa.labor.SocialNetwork.model.Post;
import swa.labor.SocialNetwork.model.User;
import swa.labor.SocialNetwork.model.Vote;
import swa.labor.SocialNetwork.service.CommentService;
import swa.labor.SocialNetwork.service.PostService;
import swa.labor.SocialNetwork.service.UserService;
import swa.labor.SocialNetwork.service.VoteService;

@RestController
@RequestMapping("/votes")
@CrossOrigin(origins = "http://localhost:3000")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> voteOnComment(@RequestParam(required = false) Integer commentId,
                                           @RequestParam(required = false) Integer postId,
                                           @RequestParam Integer userId,
                                           @RequestParam boolean isUpvote) {
        try {
            User user = userService.getUserById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
            if (commentId != null) {
                Comment comment = commentService.getCommentById(commentId).orElseThrow(() -> new IllegalArgumentException("Comment not found"));
                Vote vote = voteService.voteOnComment(comment, user, isUpvote);
                return ResponseEntity.ok(vote);
            } else {
                return ResponseEntity.badRequest().body("Either commentId or postId must be provided");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/count")
    public ResponseEntity<?> getVoteCounts(@RequestParam(required = false) Integer commentId, @RequestParam(required = false) Integer postId) {
        try {
            if (commentId != null) {
                Comment comment = commentService.getCommentById(commentId).orElseThrow(() -> new IllegalArgumentException("Comment not found"));
                Long upvotes = voteService.countUpvotesByComment(comment);
                Long downvotes = voteService.countDownvotesByComment(comment);
                return ResponseEntity.ok(new VoteCounts(upvotes, downvotes));
            } else {
                return ResponseEntity.badRequest().body("Either commentId or postId must be provided");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/hasVoted")
    public ResponseEntity<?> hasUserVoted(@RequestParam(required = false) Integer commentId, @RequestParam(required = false) Integer postId, @RequestParam Integer userId) {
        try {
            if (commentId != null) {
                Comment comment = commentService.getCommentById(commentId).orElseThrow(() -> new IllegalArgumentException("Comment not found"));
                User user = userService.getUserById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
                Vote vote = voteService.getUserVoteOnComment(comment, user);
                return ResponseEntity.ok(vote);
            } else {
                return ResponseEntity.badRequest().body("Either commentId or postId must be provided");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private static class VoteCounts {
        public Long upvotes;
        public Long downvotes;

        public VoteCounts(Long upvotes, Long downvotes) {
            this.upvotes = upvotes;
            this.downvotes = downvotes;
        }
    }
}
