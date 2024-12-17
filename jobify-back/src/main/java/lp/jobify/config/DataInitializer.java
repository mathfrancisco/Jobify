package lp.jobify.config;

import lp.jobify.model.Candidato;
import lp.jobify.model.Recrutador;
import lp.jobify.model.Vaga;
import lp.jobify.repository.CandidatoRepository;
import lp.jobify.repository.RecrutadorRepository;
import lp.jobify.repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CandidatoRepository candidatoRepository;
    @Autowired
    private RecrutadorRepository recrutadorRepository;
    @Autowired
    private VagaRepository vagaRepository;

        @Override
    public void run(String... args) throws Exception {

        // Criar Candidatos
        Candidato candidato1 = new Candidato("João Silva", "joao.silva@email.com", "Java, Spring", "Desenvolvedor Java");
        Candidato candidato2 = new Candidato("Maria Souza", "maria.souza@email.com", "Python, Data Science", "Cientista de Dados");
        Candidato candidato3 = new Candidato("Pedro Santos", "pedro.santos@email.com", "C++, Desenvolvimento de Jogos", "Desenvolvedor C++");

        candidatoRepository.saveAll(Arrays.asList(candidato1, candidato2, candidato3));

        // Criar Recrutadores
        Recrutador recrutador1 = new Recrutador("Empresa A", "recrutador1@empresaA.com", "Empresa A");
        Recrutador recrutador2 = new Recrutador("Empresa B", "recrutador2@empresaB.com", "Empresa B");
        Recrutador recrutador3 = new Recrutador("Empresa C", "recrutador3@empresaC.com", "Empresa C");

        recrutadorRepository.saveAll(Arrays.asList(recrutador1, recrutador2, recrutador3));


        // Criar Vagas (associadas aos recrutadores)
        Vaga vaga1 = new Vaga("Desenvolvedor Java", "Experiência em Java e Spring", "Empresa A", "São Paulo", new Date(), "CLT", null, null, Arrays.asList("Java", "Spring"));
        vaga1.setRecrutador(recrutador1); // Associar a vaga ao recrutador

        Vaga vaga2 = new Vaga("Analista de Dados", "Experiência em Python e Data Science", "Empresa A", "Remoto", new Date(), "PJ", null, null, Arrays.asList("Python", "Data Science"));
        vaga2.setRecrutador(recrutador1);

        Vaga vaga3 = new Vaga("Desenvolvedor Python", "Forte em Python", "Empresa B", "Rio de Janeiro", new Date(), "CLT", null, null, List.of("Python"));
        vaga3.setRecrutador(recrutador2);

        Vaga vaga4 = new Vaga("Cientista de Dados Júnior", "Iniciante em Data Science", "Empresa B", "Remoto", new Date(), "PJ", null, null, List.of("Data Science"));
        vaga4.setRecrutador(recrutador2);

        Vaga vaga5 = new Vaga("Desenvolvedor C++", "Experiência em C++ e Unreal Engine", "Empresa C", "São Paulo", new Date(), "CLT", null, null, Arrays.asList("C++", "Unreal Engine"));
        vaga5.setRecrutador(recrutador3);

        Vaga vaga6 = new Vaga("Desenvolvedor de Jogos", "Experiência em Unity", "Empresa C", "Remoto", new Date(), "PJ", null, null, List.of("Unity"));
        vaga6.setRecrutador(recrutador3);

        vagaRepository.saveAll(Arrays.asList(vaga1, vaga2, vaga3, vaga4, vaga5, vaga6));
    }
}


