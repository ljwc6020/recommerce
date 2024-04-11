package com.recommerceAPI.dto;

import lombok.*;


@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageDTO {
    public enum MessageType {
        ENTER, MESSAGE, NOTIFICATION
    }

    private String username;
    private String room;
    private String message;
    private MessageType messageType;

    // getters and setters
}