package com.recommerceAPI.controller;

import com.recommerceAPI.dto.PurchaseListDTO;
import com.recommerceAPI.dto.PurchaseListItemDTO;
import com.recommerceAPI.service.PurchaseListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchase")
@RequiredArgsConstructor
public class PurchaseListController {

    private final PurchaseListService purchaseListService;

    // 새로운 구매 목록 생성
    @PostMapping("/lists")
    public ResponseEntity<PurchaseListDTO> createPurchaseList(@RequestBody PurchaseListDTO purchaseListDTO) {
        PurchaseListDTO created = purchaseListService.createPurchaseList(purchaseListDTO);
        return ResponseEntity.ok(created);
    }

    // 기존 구매 목록 업데이트
    @PutMapping("/lists/{id}")
    public ResponseEntity<PurchaseListDTO> updatePurchaseList(@PathVariable Long id, @RequestBody PurchaseListDTO purchaseListDTO) {
        purchaseListDTO.setId(id);
        PurchaseListDTO updated = purchaseListService.updatePurchaseList(purchaseListDTO);
        return ResponseEntity.ok(updated);
    }

    // 구매 목록 삭제
    @DeleteMapping("/lists/{id}")
    public ResponseEntity<Void> deletePurchaseList(@PathVariable Long id) {
        purchaseListService.deletePurchaseList(id);
        return ResponseEntity.ok().build();
    }

    // ID로 구매 목록 조회
    @GetMapping("/lists/{id}")
    public ResponseEntity<PurchaseListDTO> getPurchaseListById(@PathVariable Long id) {
        PurchaseListDTO purchaseList = purchaseListService.findPurchaseListById(id);
        return ResponseEntity.ok(purchaseList);
    }

    // 사용자 이메일로 모든 구매 목록 조회
    @GetMapping("/lists/user/{email}")
    public ResponseEntity<List<PurchaseListDTO>> getPurchaseListsByUserEmail(@PathVariable String email) {
        List<PurchaseListDTO> purchaseLists = purchaseListService.findPurchaseListsByUserEmail(email);
        return ResponseEntity.ok(purchaseLists);
    }

    // 구매 목록 아이템 생성
    @PostMapping("/items")
    public ResponseEntity<PurchaseListItemDTO> createPurchaseListItem(@RequestBody PurchaseListItemDTO purchaseListItemDTO) {
        PurchaseListItemDTO createdItem = purchaseListService.createPurchaseListItem(purchaseListItemDTO);
        return ResponseEntity.ok(createdItem);
    }

    // 구매 목록 아이템 업데이트
    @PutMapping("/items/{id}")
    public ResponseEntity<PurchaseListItemDTO> updatePurchaseListItem(@PathVariable Long id, @RequestBody PurchaseListItemDTO purchaseListItemDTO) {
        purchaseListItemDTO.setId(id);
        PurchaseListItemDTO updatedItem = purchaseListService.updatePurchaseListItem(purchaseListItemDTO);
        return ResponseEntity.ok(updatedItem);
    }

    // 구매 목록 아이템 삭제
    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deletePurchaseListItem(@PathVariable Long id) {
        purchaseListService.deletePurchaseListItem(id);
        return ResponseEntity.ok().build();
    }

    // 특정 구매 목록 ID에 속하는 모든 아이템 조회
    @GetMapping("/items/list/{purchaseListId}")
    public ResponseEntity<List<PurchaseListItemDTO>> getAllItemsByPurchaseListId(@PathVariable Long purchaseListId) {
        List<PurchaseListItemDTO> items = purchaseListService.findAllItemsByPurchaseListId(purchaseListId);
        return ResponseEntity.ok(items);
    }
}
