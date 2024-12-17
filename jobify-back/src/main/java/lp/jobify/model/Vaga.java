package lp.jobify.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Vaga {
    // Getters e Setters
    private String titulo;
    private String descricao;
    private String empresa;

    // Construtor
    public Vaga(String titulo, String descricao, String empresa) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.empresa = empresa;
    }

}