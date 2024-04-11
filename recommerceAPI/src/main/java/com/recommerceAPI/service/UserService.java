package com.recommerceAPI.service;

import com.recommerceAPI.dto.UserDTO;
import org.springframework.transaction.annotation.Transactional;

// UserService 인터페이스는 사용자 관련 비즈니스 로직을 처리합니다.
// @Transactional 애너테이션을 사용하여 메서드 수행 중 발생하는 모든 변경사항이
// 성공적으로 완료되면 커밋하고, 오류가 발생하면 롤백합니다.
@Transactional
public interface UserService {

    // EmailExistException은 회원 등록 과정에서 동일한 이메일을 가진 사용자가
    // 이미 존재할 경우 발생하는 사용자 정의 예외입니다.
    static class EmailExistException extends Exception {
    }

    // join 메서드는 새로운 사용자를 시스템에 등록하는 기능을 수행합니다.
    // 이미 등록된 이메일이 있는 경우 EmailExistException을 발생시킵니다.
    // @param userDTO 사용자 등록에 필요한 정보를 담고 있는 UserDTO 객체입니다.
    // @throws EmailExistException 동일한 이메일을 가진 사용자가 이미 존재하는 경우 발생합니다.
    void join(UserDTO userDTO) throws EmailExistException;

    // modifyUser 메서드는 기존 사용자의 정보를 수정하는 기능을 수행합니다.
    // @param userDTO 수정할 사용자 정보를 담고 있는 UserDTO 객체입니다.
    void modifyUser(UserDTO userDTO);

    // validateCurrentPassword 메서드는 사용자의 현재 비밀번호가 유효한지 검증합니다.
    // @param username 사용자의 유저네임입니다.
    // @param currentPassword 사용자가 입력한 현재 비밀번호입니다.
    // @return 비밀번호가 유효하면 true, 그렇지 않으면 false를 반환합니다.
    boolean validateCurrentPassword(String email, String pw);

    // validatePasswordForDeletion 메서드는 사용자가 계정을 삭제하기 전에 입력한 비밀번호가 유효한지 검증합니다.
    // @param username 사용자의 유저네임입니다.
    // @param password 사용자가 계정 삭제를 위해 입력한 비밀번호입니다.
    // @return 비밀번호가 유효하면 true, 그렇지 않으면 false를 반환합니다.
    boolean PasswordForDeletion(String email, String pw);

    double calculateUserRating(Long userId); // 사용자 평점 계산
}
