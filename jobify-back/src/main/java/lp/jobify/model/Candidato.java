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
    private String cargo;

    // Construtor
    public Candidato(String nome, String email, String habilidades, String cargo) {
        this.nome = nome;
        this.email = email;
        this.habilidades = habilidades;
        this.cargo= cargo;
    }


}
