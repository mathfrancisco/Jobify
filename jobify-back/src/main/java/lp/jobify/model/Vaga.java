package lp.jobify.model;// Vaga.java
import jakarta.persistence.*;
import lp.jobify.model.Recrutador;

import java.util.Date;
import java.util.List;

@Entity
public class Vaga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descricao;
    private String empresa;
    private String localizacao;
    @Temporal(TemporalType.DATE)
    private Date dataPublicacao;
    private String tipo;
    private String logo;
    private String linkAplicacao;
    @ElementCollection
    private List<String> skills;

    @ManyToOne
    @JoinColumn(name = "recrutador_id")
    private Recrutador recrutador;

    public Vaga() { }

    public Vaga(String titulo, String descricao, String empresa, String localizacao, Date dataPublicacao, String tipo, String logo, String linkAplicacao, List<String> skills) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.empresa = empresa;
        this.localizacao = localizacao;
        this.dataPublicacao = dataPublicacao;
        this.tipo = tipo;
        this.logo = logo;
        this.linkAplicacao = linkAplicacao;
        this.skills = skills;
    }

    // Getters e Setters para todos os campos (incluindo recrutador)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    // ... getters e setters para outros campos

    public Recrutador getRecrutador() { return recrutador; }
    public void setRecrutador(Recrutador recrutador) { this.recrutador = recrutador; }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }


    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getEmpresa() {
        return empresa;
    }

    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public Date getDataPublicacao() {
        return dataPublicacao;
    }

    public void setDataPublicacao(Date dataPublicacao) {
        this.dataPublicacao = dataPublicacao;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getLinkAplicacao() {
        return linkAplicacao;
    }

    public void setLinkAplicacao(String linkAplicacao) {
        this.linkAplicacao = linkAplicacao;
    }
}