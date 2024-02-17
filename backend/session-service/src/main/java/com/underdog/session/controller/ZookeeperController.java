package com.underdog.session.controller;

import com.underdog.session.dto.ServerInfoDto;
import com.underdog.session.service.ZookeeperService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ZookeeperController {

    private final ZookeeperService zookeeperService;

    @GetMapping("get-chatting-port")
    public ServerInfoDto getChattingPort(){
        return zookeeperService.getPort();
    }

}
