package com.recommerceAPI.repository;

import com.recommerceAPI.domain.PurchaseListItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseListItemRepository extends JpaRepository<PurchaseListItem, Long> {

    // 특정 구매 목록 ID에 속하는 모든 구매 목록 아이템을 조회하는 메서드
    @Query("select pli from PurchaseListItem pli where pli.purchaseList.id = :purchaseListId")
    List<PurchaseListItem> findByPurchaseListId(@Param("purchaseListId") Long purchaseListId);

    // 특정 상품 번호를 포함하는 구매 목록 아이템을 조회하는 메서드
    @Query("select pli from PurchaseListItem pli where pli.product.pno = :productPno")
    List<PurchaseListItem> findByProductPno(@Param("productPno") Long productPno);
}
