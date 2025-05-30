package com.glab.cognizant.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    @Async
    public void sendTaskUpdateNotification(Long taskId, String title) {
        try {
            Thread.sleep(2000);
            System.out.println("[ASYNC NOTIFICATION] Task updated: " + title + " (ID: " + taskId + ")");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
