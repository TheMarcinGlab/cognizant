// Task.java
package com.glab.cognizant.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.relational.core.mapping.Column;

@Table("task")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {
    @Id
    private Long id;
    private String title;
    private boolean completed;
    @Column("label_id")
    private Long labelId;
}
