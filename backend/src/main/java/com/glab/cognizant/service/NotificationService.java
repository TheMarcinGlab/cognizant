package com.glab.cognizant.service;

import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@Service
public class NotificationService {

    // Sink typu multicast to send event SSE
    private final Sinks.Many<ServerSentEvent<String>> sink =
            Sinks.many().multicast().onBackpressureBuffer();

    // Stream SSE
    public Flux<ServerSentEvent<String>> getNotifications() {
        return sink.asFlux();
    }

    // Add update task
    public void publishTaskUpdate(Long taskId, String title) {
        ServerSentEvent<String> event = ServerSentEvent.<String>builder()
                .event("task-update")
                .id(taskId.toString())
                .data("Update task: " + title + " (ID: " + taskId + ")")
                .build();
        sink.tryEmitNext(event);
    }
}
