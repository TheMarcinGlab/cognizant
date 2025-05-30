package com.glab.cognizant.dto;

import lombok.Data;

@Data
public class TaskDTO {
    private Long id;
    private String title;
    private boolean completed;
    private Long labelId;

}
