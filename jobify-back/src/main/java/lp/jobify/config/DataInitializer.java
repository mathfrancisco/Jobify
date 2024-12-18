package lp.jobify.config;

import lp.jobify.model.Candidato;
import lp.jobify.model.Recrutador;
import lp.jobify.model.Vaga;
import lp.jobify.repository.CandidatoRepository;
import lp.jobify.repository.RecrutadorRepository;
import lp.jobify.repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@Profile("dev")
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CandidatoRepository candidatoRepository;
    @Autowired
    private RecrutadorRepository recrutadorRepository;
    @Autowired
    private VagaRepository vagaRepository;

    @Override
    public void run(String... args) {
        if (candidatoRepository.count() == 0 && recrutadorRepository.count() == 0 && vagaRepository.count() == 0) {

            List<Candidato> candidatos = List.of(
                    new Candidato("João Silva", "joao.silva@email.com", "Java, Spring Boot, Microservices", "Desenvolvedor Java Sênior", "senha123"),
                    new Candidato("Maria Souza", "maria.souza@email.com", "Python, Machine Learning, Data Analysis", "Cientista de Dados", "senha456"),
                    new Candidato("Pedro Santos", "pedro.santos@email.com", "React, Angular, JavaScript", "Desenvolvedor Front-End", "senha789")
            );
            candidatoRepository.saveAll(candidatos);

            List<Recrutador> recrutadores = List.of(
                    new Recrutador("Empresa A", "recrutadorA@email.com", "Empresa A", "senhaABC"),
                    new Recrutador("Empresa B", "recrutadorB@email.com", "Empresa B", "senhaDEF"),
                    new Recrutador("Empresa C", "recrutadorC@email.com", "Empresa C", "senhaGHI")
            );
            recrutadorRepository.saveAll(recrutadores);

            List<Vaga> vagas = List.of(
                    new Vaga("Desenvolvedor(a) Java Back-end", "Experiência com Spring Boot e Microsserviços. Desenvolvimento de APIs RESTful.", recrutadores.get(0), "São Paulo", LocalDate.now(), "CLT", null, null, List.of("Java", "Spring Boot", "Git")),
                    new Vaga("Cientista de Dados Júnior", "Conhecimento em Python e bibliotecas de Machine Learning. Análise de dados e visualização.", recrutadores.get(0), "Remoto", LocalDate.now(), "PJ", null, null, List.of("Python", "Machine Learning", "Pandas", "Scikit-learn")),
                    new Vaga("Desenvolvedor(a) Front-end React", "Domínio de React, Redux e outras bibliotecas. Experiência com testes unitários e integração.", recrutadores.get(1), "Rio de Janeiro", LocalDate.now(), "CLT", null, null, List.of("React", "Redux", "JavaScript", "HTML", "CSS")),
                    new Vaga("Estágio em Desenvolvimento Web", "Conhecimento básico em HTML, CSS e JavaScript. Vontade de aprender e se desenvolver na área.", recrutadores.get(1), "São Paulo", LocalDate.now(), "Estágio", null, null, List.of("HTML", "CSS", "JavaScript")),
                    new Vaga("Engenheiro(a) de Software Sênior", "Experiência com desenvolvimento em nuvem (AWS ou Azure). Arquitetura de microsserviços e design patterns.", recrutadores.get(2), "Remoto", LocalDate.now(), "CLT", null, null, List.of("Java", "Python", "Cloud Computing", "Microsserviços")),
                    new Vaga("Analista de Dados Sênior", "Experiência com Big Data e ferramentas de análise de dados. Conhecimento em estatística e modelagem.", recrutadores.get(2), "São Paulo", LocalDate.now(), "PJ", null, null, List.of("Python", "R", "Big Data", "Hadoop", "Spark"))
            );
            vagaRepository.saveAll(vagas);
        }
    }
}
