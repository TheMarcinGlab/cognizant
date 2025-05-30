package com.glab.cognizant.controller;

import com.glab.cognizant.model.Label;
import com.glab.cognizant.service.LabelService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/labels")
@Tag(name = "Label API", description = "CRUD operations on labels")
@CrossOrigin(origins = "http://localhost:4200")
public class LabelController {
    private final LabelService labelService;

    public LabelController(LabelService labelService) {
        this.labelService = labelService;
    }

    @GetMapping
    public Flux<Label> getAll() {
        return labelService.getAllLabels();
    }

    @PostMapping
    public Mono<Label> create(@RequestBody Label label) {
        return labelService.createLabel(label);
    }
}
