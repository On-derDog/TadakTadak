package com.underdog.session.controller;

import com.underdog.session.config.KafkaConsumerConfig;
import com.underdog.session.service.StatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class StatusListener {
    private final StatusService statusService;
    public static final String STATUS_TOPIC_NAME ="status-change";
    @KafkaListener(topics =STATUS_TOPIC_NAME, groupId = KafkaConsumerConfig.STATUS_CONSUMER_ID)
    public void changeStatus(String data){
        statusService.changeStatus(data);
    }

}
