package com.recommerceAPI.service;

import com.recommerceAPI.dto.PurchaseListDTO;
import com.recommerceAPI.dto.PurchaseListItemDTO;

import java.util.List;

public interface PurchaseListService {
    // 구매 목록 관련 메서드
    PurchaseListDTO createPurchaseList(PurchaseListDTO purchaseListDTO);
    PurchaseListDTO updatePurchaseList(PurchaseListDTO purchaseListDTO);
    void deletePurchaseList(Long id);
    PurchaseListDTO findPurchaseListById(Long id);
    List<PurchaseListDTO> findPurchaseListsByUserEmail(String email);

    // 구매 목록 아이템 관련 메서드
    PurchaseListItemDTO createPurchaseListItem(PurchaseListItemDTO purchaseListItemDTO);
    PurchaseListItemDTO updatePurchaseListItem(PurchaseListItemDTO purchaseListItemDTO);
    void deletePurchaseListItem(Long id);
    PurchaseListItemDTO findPurchaseListItemById(Long id);
    List<PurchaseListItemDTO> findAllItemsByPurchaseListId(Long purchaseListId);
}
