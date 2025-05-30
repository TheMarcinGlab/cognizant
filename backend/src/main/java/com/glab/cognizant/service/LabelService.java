package com.glab.cognizant.service;

import com.glab.cognizant.model.Label;
import com.glab.cognizant.repository.LabelRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class LabelService {
    private final LabelRepository labelRepository;

    public LabelService(LabelRepository labelRepository) {
        this.labelRepository = labelRepository;
    }

    public Flux<Label> getAllLabels() {
        return labelRepository.findAll();
    }

    public Mono<Label> createLabel(Label label) {
        return labelRepository.save(label);
    }
}
