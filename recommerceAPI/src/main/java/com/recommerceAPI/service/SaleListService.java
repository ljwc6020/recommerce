package com.recommerceAPI.service;

import com.recommerceAPI.domain.SaleList;
import com.recommerceAPI.domain.SaleListItem;
import com.recommerceAPI.dto.SaleListDTO;
import com.recommerceAPI.dto.SaleListItemDTO;

import java.util.List;

/**
 * 판매 목록과 판매 아이템에 대한 서비스 인터페이스를 제공합니다.
 * 이 인터페이스는 판매 관련 데이터의 조회, 생성, 삭제 작업을 정의합니다.
 */
public interface SaleListService {
    SaleListDTO getSaleList(Long id); // 주어진 ID를 가진 판매 목록을 조회합니다.

    SaleListItemDTO getSaleListItem(Long id); // 주어진 ID를 가진 판매 아이템을 조회합니다.

    List<SaleListItemDTO> getSaleListItemsBySaleListId(Long saleListId); // 특정 판매 목록 ID에 속하는 모든 판매 아이템을 조회합니다.

    SaleListDTO createSaleList(SaleListDTO saleListDTO); // 새로운 판매 목록을 생성합니다.

    SaleListItemDTO createSaleListItem(SaleListItemDTO saleListItemDTO); // 새로운 판매 아이템을 생성합니다.

    SaleListDTO updateSaleList(SaleListDTO saleListDTO); // 판매 목록을 업데이트합니다.

    void deleteSaleList(Long id); // 주어진 ID를 가진 판매 목록을 삭제합니다.

    void deleteSaleListItem(Long id); // 주어진 ID를 가진 판매 아이템을 삭제합니다.
}
