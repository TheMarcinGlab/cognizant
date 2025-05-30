package com.glab.cognizant.controller;

import com.glab.cognizant.dto.TaskDTO;
import com.glab.cognizant.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/tasks")
@Tag(name = "Task API", description = "CRUD operacje na zadaniach")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {
    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Pobierz wszystkie zadania")
    public Flux<TaskDTO> getAll() {
        return service.getAllTasks();
    }

    @PostMapping
    @Operation(summary = "Utwórz nowe zadanie")
    public Mono<TaskDTO> create(@RequestBody TaskDTO task) {
        return service.createTask(task);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Aktualizuj zadanie")
    public Mono<TaskDTO> update(@PathVariable Long id, @RequestBody TaskDTO task) {
        return service.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Usuń zadanie")
    public Mono<Void> delete(@PathVariable Long id) {
        return service.deleteTask(id);
    }
}
