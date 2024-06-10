package swa.labor.SocialNetwork.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import swa.labor.SocialNetwork.model.Post;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer>{
    @Query(value = "SELECT p FROM Post p WHERE (6371 * acos(cos(radians(:latitude)) * cos(radians(p.latitude)) * cos(radians(p.longitude) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(p.latitude)))) < :radius")
    List<Post> findAllWithinRadius(@Param("latitude") double latitude, @Param("longitude") double longitude, @Param("radius") double radius);
}
