package lp.jobify.model;// Candidato.java
import jakarta.persistence.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Entity
public class Candidato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    
    @ElementCollection
    private List<String> habilidades;

    private String cargo;
    private String senha;

    public Candidato() {}

    public Candidato(String nome, String email, String habilidades, String cargo, String senha) {
        this.nome = nome;
        this.email = email;
        this.habilidades = Arrays.asList(habilidades);
        this.cargo = cargo;
        this.senha = senha;
    }

    // Getters e Setters para todos os campos
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getHabilidades() {
        return habilidades;
    }

    public void setHabilidades(List<String> habilidades) {
        this.habilidades = habilidades;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }
    // Getter e Setter para senha
    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}

