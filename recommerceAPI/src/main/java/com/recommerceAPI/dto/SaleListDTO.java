package com.recommerceAPI.dto;

import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleListDTO {
    private Long id; // 판매 목록의 고유 ID
    private Long sellerId; // 판매자의 ID
    private Long productId; // 판매된 상품의 ID
}