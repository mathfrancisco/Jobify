package lp.jobify.model;

import jakarta.persistence.*;
import lp.jobify.model.Candidato;
import lp.jobify.model.Vaga;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Candidatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "vaga_id")
    private Vaga vaga;

    @ManyToOne
    @JoinColumn(name = "candidato_id")
    private Candidato candidato;

    private String status;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dataAplicacao;

}
