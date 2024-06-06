package swa.labor.SocialNetwork.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import swa.labor.SocialNetwork.model.Post;

public interface PostRepository extends JpaRepository<Post, Integer>{

}
