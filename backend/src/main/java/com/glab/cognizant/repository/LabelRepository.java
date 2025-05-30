package com.glab.cognizant.repository;

import com.glab.cognizant.model.Label;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelRepository extends ReactiveCrudRepository<Label, Long> {
}
