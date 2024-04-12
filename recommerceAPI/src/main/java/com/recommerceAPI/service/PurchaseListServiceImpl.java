package com.recommerceAPI.service;

import com.recommerceAPI.domain.PurchaseList;
import com.recommerceAPI.domain.PurchaseListItem;
import com.recommerceAPI.dto.PurchaseListDTO;
import com.recommerceAPI.dto.PurchaseListItemDTO;
import com.recommerceAPI.repository.PurchaseListRepository;
import com.recommerceAPI.repository.PurchaseListItemRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PurchaseListServiceImpl implements PurchaseListService {

    @Autowired
    private PurchaseListRepository purchaseListRepository;
    @Autowired
    private PurchaseListItemRepository purchaseListItemRepository;
    @Autowired
    private ModelMapper modelMapper;

    // 구매 목록 메서드 구현
    @Override
    public PurchaseListDTO createPurchaseList(PurchaseListDTO purchaseListDTO) {
        PurchaseList purchaseList = modelMapper.map(purchaseListDTO, PurchaseList.class);
        purchaseList = purchaseListRepository.save(purchaseList);
        return modelMapper.map(purchaseList, PurchaseListDTO.class);
    }

    @Override
    public PurchaseListDTO updatePurchaseList(PurchaseListDTO purchaseListDTO) {
        PurchaseList purchaseList = modelMapper.map(purchaseListDTO, PurchaseList.class);
        purchaseList = purchaseListRepository.save(purchaseList);
        return modelMapper.map(purchaseList, PurchaseListDTO.class);
    }

    @Override
    public void deletePurchaseList(Long id) {
        purchaseListRepository.deleteById(id);
    }

    @Override
    public PurchaseListDTO findPurchaseListById(Long id) {
        PurchaseList purchaseList = purchaseListRepository.findById(id).orElseThrow(() -> new RuntimeException("Purchase list not found"));
        return modelMapper.map(purchaseList, PurchaseListDTO.class);
    }

    @Override
    public List<PurchaseListDTO> findPurchaseListsByUserEmail(String email) {
        List<PurchaseList> purchaseLists = purchaseListRepository.findAllByUserEmail(email);
        return purchaseLists.stream().map(pl -> modelMapper.map(pl, PurchaseListDTO.class)).collect(Collectors.toList());
    }

    // 구매 목록 아이템 메서드 구현
    @Override
    public PurchaseListItemDTO createPurchaseListItem(PurchaseListItemDTO purchaseListItemDTO) {
        PurchaseListItem item = modelMapper.map(purchaseListItemDTO, PurchaseListItem.class);
        item = purchaseListItemRepository.save(item);
        return modelMapper.map(item, PurchaseListItemDTO.class);
    }

    @Override
    public PurchaseListItemDTO updatePurchaseListItem(PurchaseListItemDTO purchaseListItemDTO) {
        PurchaseListItem item = modelMapper.map(purchaseListItemDTO, PurchaseListItem.class);
        item = purchaseListItemRepository.save(item);
        return modelMapper.map(item, PurchaseListItemDTO.class);
    }

    @Override
    public void deletePurchaseListItem(Long id) {
        purchaseListItemRepository.deleteById(id);
    }

    @Override
    public PurchaseListItemDTO findPurchaseListItemById(Long id) {
        PurchaseListItem item = purchaseListItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Purchase list item not found"));
        return modelMapper.map(item, PurchaseListItemDTO.class);
    }

    @Override
    public List<PurchaseListItemDTO> findAllItemsByPurchaseListId(Long purchaseListId) {
        List<PurchaseListItem> items = purchaseListItemRepository.findByPurchaseListId(purchaseListId);
        return items.stream().map(i -> modelMapper.map(i, PurchaseListItemDTO.class)).collect(Collectors.toList());
    }
}
