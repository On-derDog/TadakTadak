package com.underdog.session.service;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.underdog.session.dto.ServerInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ZookeeperService {

    private final DiscoveryClient discoveryClient;
    private final LoadBalancerClient loadBalancerClient;
    private final String CHATTING_SERVICE_NAME = "chatting";
    private final ObjectMapper objectMapper;
    public ServerInfoDto getPort(){
        ServiceInstance selectedInstance = loadBalancerClient.choose(CHATTING_SERVICE_NAME);
        ServerInfoDto serverInfoDto = ServerInfoDto.builder().port(selectedInstance.getPort()).build();
        return serverInfoDto;
    }
}
