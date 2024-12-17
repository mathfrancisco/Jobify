package lp.jobify.model;

import jakarta.persistence.*;

@Entity
public class Recrutador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String empresa;

    // Construtor vazio
    public Recrutador() {}

    // Construtor com argumentos
    public Recrutador(String nome, String email, String empresa) {
        this.nome = nome;
        this.email = email;
        this.empresa = empresa;
    }

    // Getters e Setters para todos os campos (id, nome, email, empresa)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getEmpresa() { return empresa; }
    public void setEmpresa(String empresa) { this.empresa = empresa; }

}
