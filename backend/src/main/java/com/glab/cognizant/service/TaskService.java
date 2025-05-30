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

    public TaskService(TaskRepository taskRepository,
                       LabelRepository labelRepository,
                       NotificationService notificationService) {
        this.taskRepository = taskRepository;
        this.labelRepository = labelRepository;
        this.notificationService = notificationService;
    }

    public Flux<TaskDTO> getAllTasks() {
        return taskRepository.findAll()
                .map(this::toDTO);
    }

    public Mono<TaskDTO> createTask(TaskDTO dto) {
        return Mono.just(dto)
                .flatMap(d -> labelRepository.findById(d.getLabelId())
                        .switchIfEmpty(Mono.error(new RuntimeException("Etykieta nie znaleziona")))
                )
                .flatMap(label -> {
                    Task task = Task.builder()
                            .title(dto.getTitle())
                            .completed(dto.isCompleted())
                            .labelId(dto.getLabelId())
                            .build();
                    return taskRepository.save(task);
                })
                .doOnNext(saved -> notificationService.publishTaskUpdate(saved.getId(), saved.getTitle()))
                .map(this::toDTO);
    }

    public Mono<TaskDTO> updateTask(Long id, TaskDTO dto) {
        return taskRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Zadanie nie znalezione")))
                .flatMap(task -> {
                    task.setTitle(dto.getTitle());
                    task.setCompleted(dto.isCompleted());
                    task.setLabelId(dto.getLabelId());
                    return taskRepository.save(task);
                })
                .doOnNext(updated -> notificationService.publishTaskUpdate(updated.getId(), updated.getTitle()))
                .map(this::toDTO);
    }

    public Mono<Void> deleteTask(Long id) {
        return taskRepository.deleteById(id);
    }

    private TaskDTO toDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setCompleted(task.isCompleted());
        dto.setLabelId(task.getLabelId());
        return dto;
    }
}
