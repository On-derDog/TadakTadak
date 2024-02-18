package com.underdog.session.service;

import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.PartitionInfo;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KafkaService {
    private final KafkaTemplate kafkaTemplate;

    public void sendMessageToAllPartitionsWithoutKey(String topic, String message){
        List<PartitionInfo> partitionInfos = kafkaTemplate.partitionsFor(topic);
        for(PartitionInfo partition : partitionInfos) kafkaTemplate.send(topic,partition.partition(),null,message);
    }
}
