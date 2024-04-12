package com.recommerceAPI.service;

import com.recommerceAPI.domain.SaleList;
import com.recommerceAPI.domain.SaleListItem;
import com.recommerceAPI.dto.SaleListDTO;
import com.recommerceAPI.dto.SaleListItemDTO;
import com.recommerceAPI.repository.SaleListRepository;
import com.recommerceAPI.repository.SaleListItemRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SaleListServiceImpl implements SaleListService {

    private final SaleListRepository saleListRepository; // 판매 목록 관련 데이터 접근을 위한 리포지토리
    private final SaleListItemRepository saleListItemRepository; // 판매 아이템 관련 데이터 접근을 위한 리포지토리
    private final ModelMapper modelMapper; // 모델 매퍼

    @Override
    public SaleListDTO getSaleList(Long id) {
        SaleList saleList = saleListRepository.findById(id).orElse(null);
        return saleList != null ? modelMapper.map(saleList, SaleListDTO.class) : null;
    }

    @Override
    public SaleListItemDTO getSaleListItem(Long id) {
        SaleListItem saleListItem = saleListItemRepository.findById(id).orElse(null);
        return saleListItem != null ? modelMapper.map(saleListItem, SaleListItemDTO.class) : null;
    }

    @Override
    public List<SaleListItemDTO> getSaleListItemsBySaleListId(Long saleListId) {
        List<SaleListItem> saleListItems = saleListItemRepository.findBySaleListId(saleListId);
        return saleListItems.stream()
                .map(item -> modelMapper.map(item, SaleListItemDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public SaleListDTO createSaleList(SaleListDTO saleListDTO) {
        SaleList saleList = modelMapper.map(saleListDTO, SaleList.class);
        SaleList savedSaleList = saleListRepository.save(saleList);
        return modelMapper.map(savedSaleList, SaleListDTO.class);
    }

    @Override
    public SaleListItemDTO createSaleListItem(SaleListItemDTO saleListItemDTO) {
        SaleListItem saleListItem = modelMapper.map(saleListItemDTO, SaleListItem.class);
        SaleListItem savedSaleListItem = saleListItemRepository.save(saleListItem);
        return modelMapper.map(savedSaleListItem, SaleListItemDTO.class);
    }

    @Override
    public SaleListDTO updateSaleList(SaleListDTO saleListDTO) {
        // 구현 내용은 필요에 따라 추가해주세요.
        return saleListDTO;
    }

    @Override
    public void deleteSaleList(Long id) {
        saleListRepository.deleteById(id);
    }

    @Override
    public void deleteSaleListItem(Long id) {
        saleListItemRepository.deleteById(id);
    }

    // 특정 판매 목록 ID에 속하는 모든 판매 목록 아이템을 조회하는 메서드
    public List<SaleListItem> findBySaleListId(Long saleListId) {
        return saleListItemRepository.findBySaleListId(saleListId);
    }

    // 특정 상품 번호(pno)를 포함하는 판매 목록 아이템을 조회하는 메서드
    public List<SaleListItem> findByProductPno(Long productPno) {
        return saleListItemRepository.findByProductPno(productPno);
    }
}
