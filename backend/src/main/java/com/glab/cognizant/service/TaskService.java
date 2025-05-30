package com.glab.cognizant.service;

import com.glab.cognizant.dto.TaskDTO;
import com.glab.cognizant.model.Task;
import com.glab.cognizant.repository.LabelRepository;
import com.glab.cognizant.repository.TaskRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final LabelRepository labelRepository;
    private final NotificationService notificationService;

    public TaskService(TaskRepository taskRepository, LabelRepository labelRepository, NotificationService notificationService) {
        this.taskRepository = taskRepository;
        this.labelRepository = labelRepository;
        this.notificationService = notificationService;
    }

    public Flux<TaskDTO> getAllTasks() {
        return taskRepository.findAll()
                .map(this::toDTO);
    }

    // create new task
    public Mono<TaskDTO> createTask(TaskDTO dto) {
        if (dto.getLabelId() == null) {
            return Mono.error(new IllegalArgumentException("labelId must not be null"));
        }
        return labelRepository.findById(dto.getLabelId())
                .switchIfEmpty(Mono.error(new RuntimeException("Label not found")))
                .flatMap(label -> {
                    Task task = Task.builder()
                            .title(dto.getTitle())
                            .completed(dto.isCompleted())
                            .labelId(label.getId())
                            .build();
                    return taskRepository.save(task);
                })
                .doOnNext(saved -> notificationService.sendTaskUpdateNotification(saved.getId(), saved.getTitle()))
                .map(this::toDTO);
    }

    // update task
    public Mono<TaskDTO> updateTask(Long id, TaskDTO dto) {
        return taskRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Task not found")))
                .flatMap(task -> {
                    task.setTitle(dto.getTitle());
                    task.setCompleted(dto.isCompleted()); // TO MUSI BYĆ!
                    task.setLabelId(dto.getLabelId());
                    return taskRepository.save(task);
                })
                .doOnNext(updated -> notificationService.sendTaskUpdateNotification(updated.getId(), updated.getTitle()))
                .map(this::toDTO);
    }


    // delete task
    public Mono<Void> deleteTask(Long id) {
        return taskRepository.deleteById(id);
    }

    // map entity to dto
    private TaskDTO toDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setCompleted(task.isCompleted());
        dto.setLabelId(task.getLabelId());
        return dto;
    }
}
