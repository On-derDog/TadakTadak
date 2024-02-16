package com.example.chattingservice.domain.chat.service;

import com.example.chattingservice.domain.chat.dto.response.UserParticipation;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.PartitionInfo;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KafkaService {
    private final KafkaTemplate kafkaTemplate;
    private final ObjectMapper objectMapper;
    public void sendMessageToAllPartitionsWithoutKey(String topic, String message){
        List<PartitionInfo> partitionInfos = kafkaTemplate.partitionsFor(topic);
        for(PartitionInfo partition : partitionInfos) kafkaTemplate.send(topic,partition.partition(),null,message);
    }
    public void sendWithUsernameByKeyToSessionServerWhenLogin(String topic, UserParticipation userParticipation){
        try{
            String stringToJson = objectMapper.writeValueAsString(userParticipation);
            kafkaTemplate.send(topic, userParticipation.getUsername(),stringToJson);
        }catch (Exception e){
            e.printStackTrace();
        }

    }
}
