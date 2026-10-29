package com.recipemaker.nom_nom.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {
    private String name;
    private String description;
    private List<String> ingredients;
    private List<String> steps;
    private Integer cookingTimeMinutes;
}
