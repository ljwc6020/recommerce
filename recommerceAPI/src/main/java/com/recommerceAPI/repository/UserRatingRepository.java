package com.recommerceAPI.repository;

import com.recommerceAPI.domain.UserRating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRatingRepository extends JpaRepository<UserRating, Long> {
    List<UserRating> findByUserId(Long userId); // 특정 사용자에 대한 모든 평점 조회
}
