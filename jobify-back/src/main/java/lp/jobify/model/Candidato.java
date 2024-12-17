package lp.jobify.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Candidato {
    // Getters e Setters
    private String nome;
    private String email;
    private String habilidades;

    // Construtor
    public Candidato(String nome, String email, String habilidades) {
        this.nome = nome;
        this.email = email;
        this.habilidades = habilidades;
    }


}
