package swa.labor.SocialNetwork.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swa.labor.SocialNetwork.model.Comment;
import swa.labor.SocialNetwork.model.Post;
import swa.labor.SocialNetwork.model.User;
import swa.labor.SocialNetwork.model.Vote;
import swa.labor.SocialNetwork.repository.VoteRepository;

import java.util.List;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    public Vote voteOnComment(Comment comment, User user, boolean isUpvote) {
        List<Vote> existingVotes = voteRepository.findByCommentAndUser(comment, user);

        if (!existingVotes.isEmpty()) {
            Vote existingVote = existingVotes.get(0);
            if (existingVote.getIsUpvote() == isUpvote) {
                // Abstimmung zurücksetzen (entfernen)
                voteRepository.delete(existingVote);
                return null;
            } else {
                // Abstimmung aktualisieren
                existingVote.setIsUpvote(isUpvote);
                return voteRepository.save(existingVote);
            }
        }

        // Neue Abstimmung erstellen
        Vote vote = new Vote();
        vote.setComment(comment);
        vote.setUser(user);
        vote.setIsUpvote(isUpvote);
        return voteRepository.save(vote);
    }

    public Long countUpvotesByComment(Comment comment) {
        return voteRepository.countUpvotesByComment(comment);
    }

    public Long countDownvotesByComment(Comment comment) {
        return voteRepository.countDownvotesByComment(comment);
    }

    public boolean hasUserVotedOnComment(Comment comment, User user) {
        return !voteRepository.findByCommentAndUser(comment, user).isEmpty();
    }

    public Vote getUserVoteOnComment(Comment comment, User user) {
        List<Vote> votes = voteRepository.findByCommentAndUser(comment, user);
        return votes.isEmpty() ? null : votes.get(0);
    }

}
