package swa.labor.SocialNetwork.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import swa.labor.SocialNetwork.model.Comment;
import swa.labor.SocialNetwork.model.User;
import swa.labor.SocialNetwork.model.Vote;
import swa.labor.SocialNetwork.model.Post;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Integer> {
    @Query("SELECT COUNT(v) FROM Vote v WHERE v.comment = :comment AND v.isUpvote = true")
    Long countUpvotesByComment(Comment comment);

    @Query("SELECT COUNT(v) FROM Vote v WHERE v.comment = :comment AND v.isUpvote = false")
    Long countDownvotesByComment(Comment comment);

    List<Vote> findByCommentAndUser(Comment comment, User user);

}
