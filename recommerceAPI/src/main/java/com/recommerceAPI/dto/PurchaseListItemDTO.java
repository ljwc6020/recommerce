package com.recommerceAPI.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseListItemDTO {
    private Long id; // 구매 목록 아이템 ID
    private Long purchaseListId; // 이 아이템이 속한 구매 목록 ID
    private Long productId; // 이 아이템에 포함된 상품의 ID
}
