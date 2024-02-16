package com.tadak.chatroomservice.domain.chatroom.mq;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tadak.chatroomservice.domain.chatroom.mq.dto.EnterKafkaRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    public static final String STATUS_TOPIC_NAME ="status-change";

    public EnterKafkaRequest send(String topic, EnterKafkaRequest enterKafkaRequest){
        ObjectMapper mapper = new ObjectMapper();
        String stringToJson = "";
        try {
            stringToJson = mapper.writeValueAsString(enterKafkaRequest);
        } catch (JsonProcessingException ex){
            ex.printStackTrace();
        }

        kafkaTemplate.send(topic, stringToJson);

        return enterKafkaRequest;
    }
}
