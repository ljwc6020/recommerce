package com.recommerceAPI.repository;

import com.recommerceAPI.domain.SaleList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface SaleListRepository extends JpaRepository<SaleList, Long> {

    // 판매자의 이메일을 기반으로 모든 판매 목록을 조회하는 쿼리 메서드
    @Query("select sl from SaleList sl where sl.seller.email = :email")
    List<SaleList> findAllBySellerEmail(@Param("email") String email);

    // 판매자의 이메일과 상품 번호를 기반으로 해당 상품을 포함한 판매 목록을 조회하는 쿼리 메서드
    @Query("select sl from SaleList sl join sl.seller s join sl.items si where s.email = :email and si.product.pno = :productPno")
    List<SaleList> findBySellerEmailAndProductPno(@Param("email") String email, @Param("productPno") Long productPno);
}