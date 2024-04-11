package com.recommerceAPI.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.recommerceAPI.dto.ChatMessageDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Component
public class ChatHandler extends TextWebSocketHandler {

    private static final Logger logger = LoggerFactory.getLogger(ChatHandler.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final Set<WebSocketSession> sessions = new HashSet<>();
    private final Map<String, String> sessionToUsername = new HashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        logger.info("{} 연결됨", session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        logger.info("payload: {}", payload);

        ChatMessageDTO chatMessageDTO = objectMapper.readValue(payload, ChatMessageDTO.class);
        logger.info("session: {}", chatMessageDTO.toString());

        String username = chatMessageDTO.getUsername();
        String room = chatMessageDTO.getRoom();
        String content = chatMessageDTO.getMessage();

        if (chatMessageDTO.getMessageType().equals(ChatMessageDTO.MessageType.ENTER)) {
            sessionToUsername.put(session.getId(), username);
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(
                    new ChatMessageDTO("알림", room, username + " 님이 방에 입장했습니다.", ChatMessageDTO.MessageType.NOTIFICATION)
            )));
        }

        sendMessageToRoom(room, new ChatMessageDTO(username, room, content, ChatMessageDTO.MessageType.MESSAGE));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        sessions.remove(session);
        sessionToUsername.remove(session.getId());
        logger.info("{} 연결 끊김", session.getId());
    }

    private void sendMessageToRoom(String room, ChatMessageDTO messageDTO) {
        sessions.stream()
                .filter(session -> room.equals(sessionToUsername.get(session.getId())))
                .forEach(session -> sendMessage(session, messageDTO));
    }

    private void sendMessage(WebSocketSession session, ChatMessageDTO messageDTO) {
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(messageDTO)));
        } catch (IOException e) {
            logger.error("Error sending message to session {}: {}", session.getId(), e.getMessage(), e);
        }
    }
}
