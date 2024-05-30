package com.example.SWALaborWebApp.repository;

import com.example.SWALaborWebApp.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    @Query("SELECT p FROM Post p ORDER BY p.datePosted DESC")
    List<Post> findAllPostsSortedByDate();

    Optional<Post> findById(Integer id);
}
