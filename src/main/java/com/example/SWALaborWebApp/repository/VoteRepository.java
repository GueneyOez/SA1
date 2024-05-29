package com.example.SWALaborWebApp.repository;

import com.example.SWALaborWebApp.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Integer> {
    Optional<Vote> findByUserIdAndPostId(Integer userId, Integer postId);
    void deleteByPostId(Integer postId);
}