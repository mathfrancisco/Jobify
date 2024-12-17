package lp.jobify.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
import javax.persistence.*;

@Entity
public class Candidato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String habilidades;
    private String cargo;

    // Construtor (sem argumentos é necessário para o JPA)
    public Candidato() {}

    // Construtor com argumentos
    public Candidato(String nome, String email, String habilidades, String cargo) {
        this.nome = nome;
        this.email = email;
        this.habilidades = habilidades;
        this.cargo = cargo;
    }


}
