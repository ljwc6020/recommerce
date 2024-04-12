package com.recommerceAPI.repository;

import java.util.Optional;

import com.recommerceAPI.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ProductRepository extends JpaRepository<Product, Long>{

    @EntityGraph(attributePaths = "imageList")
    @Query("select p from Product p where p.pnum = :pnum")
    Optional<Product> selectOne(@Param("pno") Long pnum);


    @Modifying
    @Query("update Product p set p.delFlag = :flag where p.pnum = :pnum")
    void updateToDelete(@Param("pno") Long pnum, @Param("flag") boolean flag);

    //   이미지가 포함된 목록 처리
    @Query("select p, pi from Product p left join p.imageList pi where (pi.ord = 0 and p.delFlag = false) and (:pname is null or p.pname like %:pname%)")
    Page<Object[]> selectList(@Param("pname") String pname, Pageable pageable);

    Product findByPname(String pname);
}