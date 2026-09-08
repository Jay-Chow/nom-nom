package com.recipemaker.nom_nom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class NomNomApplication {

	public static void main(String[] args) {

		SpringApplication.run(NomNomApplication.class, args);
	}

}
