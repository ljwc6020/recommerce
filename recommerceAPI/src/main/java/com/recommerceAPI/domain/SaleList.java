package com.recommerceAPI.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tbl_sale_list")
public class SaleList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 판매 목록의 고유 ID

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller; // 판매자 정보

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product; // 판매된 상품 정보


}
