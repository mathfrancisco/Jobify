package lp.jobify.model;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Mensagem {

    // Getters e Setters
    private String nome;
    private String email;
    private String mensagem;

    // Construtores (opcional, mas recomendado)
    public Mensagem() {} // Construtor vazio

    public Mensagem(String nome, String email, String mensagem) {
        this.nome = nome;
        this.email = email;
        this.mensagem = mensagem;
    }


}

