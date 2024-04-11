package com.recommerceAPI.service;

import com.recommerceAPI.domain.Auction;
import com.recommerceAPI.dto.AuctionDTO;
import com.recommerceAPI.dto.PageRequestDTO;
import com.recommerceAPI.dto.PageResponseDTO;
import com.recommerceAPI.repository.AuctionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class AuctionServiceImpl implements AuctionService{

    private final ModelMapper modelMapper;

    private final AuctionRepository auctionRepository;

    @Override
    public Long register(AuctionDTO auctionDTO) {
        log.info("------------------------");
        Auction auction = modelMapper.map(auctionDTO, Auction.class);

        Auction savedAuction = auctionRepository.save(auction);

        return savedAuction.getApno();
    }

    @Override
    public AuctionDTO get(Long apno) {
        java.util.Optional<Auction> result = auctionRepository.findById(apno);

        Auction auction = result.orElseThrow();

        AuctionDTO dto = modelMapper.map(auction, AuctionDTO.class);

        return dto;
    }

    @Override
    public void modify(AuctionDTO auctionDTO) {
        Optional<Auction> result = auctionRepository.findById(auctionDTO.getApno());

        Auction auction = result.orElseThrow();
        auction.changeName(auctionDTO.getApName());
        auction.changeDesc(auctionDTO.getApDesc());
        auction.changeCat(auctionDTO.getApCategory());
        auction.changePrice(auctionDTO.getApStartPrice());
        auction.changeIncrement(auctionDTO.getApBidIncrement());
        auction.changeStartTime(auctionDTO.getApStartTime());
        auction.changeClosingTime(auctionDTO.getApClosingTime());
        auction.changeStatus(auctionDTO.getApStatus());

        auction.clearList();

        if (auctionDTO.getUploadFileNames() != null) {
            for (String fileName : auctionDTO.getUploadFileNames()) {
                auction.addImageString(fileName);
            }
        }

        auctionRepository.save(auction);
    }

    @Override
    public void remove(Long apno) {
        auctionRepository.deleteById(apno);
    }

    @Override
    public PageResponseDTO<AuctionDTO> list(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("apno").descending());

        Page<Auction> result = auctionRepository.findAll(pageable);

        List<AuctionDTO> dtoList = result.getContent().stream()
                .map(auction -> modelMapper.map(auction, AuctionDTO.class))
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        PageResponseDTO<AuctionDTO> responseDTO = PageResponseDTO.<AuctionDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();

        return responseDTO;
    }
}
