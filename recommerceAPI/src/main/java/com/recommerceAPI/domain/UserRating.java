package com.recommerceAPI.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // 평점이 매겨진 사용자

    private Double rating; // 사용자에게 매겨진 평점

    private String comment; // 평점에 대한 추가적인 코멘트 (선택 사항)

}
