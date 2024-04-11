package com.recommerceAPI.repository;

import com.recommerceAPI.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

// UserRepository 인터페이스는 User 엔티티에 대한 데이터베이스 작업을 처리합니다.
public interface UserRepository extends JpaRepository<User, String> {

    // 로그인 시 사용자 정보와 그에 따른 역할 정보를 함께 가져오는 메서드입니다.
    // @EntityGraph를 사용하여 지연 로딩 대신 즉시 로딩을 수행합니다.
    @EntityGraph(attributePaths = {"userRoleList"})
    @Query("select u from User u where u.email = :email")
    User getWithRoles(@Param("email") String email);

    // 주어진 이메일에 해당하는 사용자를 찾되, 사용자의 역할 정보도 함께 조회합니다.
    // 주로 소셜 로그인 등 이메일 기반의 회원가입 확인 시 사용됩니다.
    @Query("select u from User u where u.email = :email")
    Optional<User> findByEmailWithRoles(@Param("email") String email);

    // 이메일을 기준으로 사용자를 조회합니다.
    // @EntityGraph를 사용하여 사용자의 역할 정보도 함께 가져옵니다.
    @EntityGraph(attributePaths = {"userRoleList"})
    Optional<User> findByEmail(String email);

    // 사용자의 현재 비밀번호가 유효한지 확인하는 메서드입니다.
    // 이 메서드는 사용자의 비밀번호 변경 시 현재 비밀번호 확인에 사용됩니다.
    // @param username 사용자의 유저네임입니다.
    // @param currentPassword 사용자가 입력한 현재 비밀번호입니다.
    // @return 비밀번호가 일치하면 true를 반환합니다.

    boolean validateCurrentPassword(String username, String currentPassword);

    // 사용자가 계정을 삭제하기 위해 제공한 비밀번호가 유효한지 확인하는 메서드입니다.
    // 이 메서드는 계정 삭제 요청 시 비밀번호 확인에 사용됩니다.
    // @param username 사용자의 유저네임입니다.
    // @param password 사용자가 계정 삭제를 위해 입력한 비밀번호입니다.
    // @return 비밀번호가 일치하면 true를 반환합니다.

    boolean validatePasswordForDeletion(String username, String password);

    // 유저네임을 기준으로 User 엔티티를 조회하는 메서드입니다.
    // 반환 타입은 Optional로, 조회된 사용자 정보가 있을 수도 있고 없을 수도 있음을 나타냅니다.
    Optional<User> findByUsername(String username);

}
