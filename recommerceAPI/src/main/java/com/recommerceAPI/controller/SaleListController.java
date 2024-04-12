package com.recommerceAPI.controller;

import com.recommerceAPI.dto.SaleListDTO;
import com.recommerceAPI.dto.SaleListItemDTO;
import com.recommerceAPI.service.SaleListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sale")
@RequiredArgsConstructor
public class SaleListController {

    private final SaleListService saleListService;

    @PostMapping("/lists")
    public ResponseEntity<SaleListDTO> createSaleList(@RequestBody SaleListDTO saleListDTO) {
        SaleListDTO createdSaleList = saleListService.createSaleList(saleListDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSaleList);
    }

    @GetMapping("/lists/{id}")
    public ResponseEntity<SaleListDTO> getSaleListById(@PathVariable Long id) {
        SaleListDTO saleList = saleListService.getSaleList(id);
        return saleList != null ? ResponseEntity.ok(saleList) : ResponseEntity.notFound().build();
    }

    @PutMapping("/lists/{id}")
    public ResponseEntity<SaleListDTO> updateSaleList(@PathVariable Long id, @RequestBody SaleListDTO saleListDTO) {
        saleListDTO.setId(id);
        SaleListDTO updatedSaleList = saleListService.updateSaleList(saleListDTO);
        return updatedSaleList != null ? ResponseEntity.ok(updatedSaleList) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/lists/{id}")
    public ResponseEntity<Void> deleteSaleList(@PathVariable Long id) {
        saleListService.deleteSaleList(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/items")
    public ResponseEntity<SaleListItemDTO> createSaleListItem(@RequestBody SaleListItemDTO saleListItemDTO) {
        SaleListItemDTO createdSaleListItem = saleListService.createSaleListItem(saleListItemDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSaleListItem);
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<SaleListItemDTO> getSaleListItemById(@PathVariable Long id) {
        SaleListItemDTO saleListItem = saleListService.getSaleListItem(id);
        return saleListItem != null ? ResponseEntity.ok(saleListItem) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteSaleListItem(@PathVariable Long id) {
        saleListService.deleteSaleListItem(id);
        return ResponseEntity.ok().build();
    }
}
