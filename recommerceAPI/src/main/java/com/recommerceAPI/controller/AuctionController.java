package com.recommerceAPI.controller;

import com.recommerceAPI.dto.AuctionDTO;
import com.recommerceAPI.dto.PageRequestDTO;
import com.recommerceAPI.dto.PageResponseDTO;
import com.recommerceAPI.service.AuctionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/auction")
public class AuctionController {

    private final AuctionService service;

    @GetMapping("/{apno}")
    public AuctionDTO get(@PathVariable(name = "apno") Long apno) {

        return service.get(apno);
    }

    @GetMapping("/list")
    public PageResponseDTO<AuctionDTO> list(PageRequestDTO pageRequestDTO) {

        log.info(pageRequestDTO);

        return service.list(pageRequestDTO);
    }
}
