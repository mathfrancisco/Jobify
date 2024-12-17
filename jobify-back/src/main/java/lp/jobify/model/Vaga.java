// Vaga.java
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Vaga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descricao;
    private String empresa;
    private String localizacao;
    @Temporal(TemporalType.DATE) // Anotação para persistir datas
    private Date dataPublicacao;
    private String tipo;
    private String logo; // Pode ser String se for URL da imagem
    private String linkAplicacao;
    @ElementCollection // Para persistir a lista de Strings
    private List<String> skills;


    // Construtor vazio (necessário para o JPA)
    public Vaga() { }

    // Construtor com argumentos (opcional, mas útil)
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


}
