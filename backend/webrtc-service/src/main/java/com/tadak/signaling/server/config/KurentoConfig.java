package com.tadak.signaling.server.config;

import org.kurento.client.KurentoClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

@Configuration
@EnableWebSocket
public class KurentoConfig {
    @Bean
    public KurentoClient kurentoClient(){
        return KurentoClient.create();
    }
}
