package lp.jobify.controller;

import lp.jobify.model.Candidato;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CandidatoController {

    @GetMapping("/candidatos")
    public List<Candidato> listarCandidatos() {
        List<Candidato> candidatos = new ArrayList<>();
        candidatos.add(new Candidato("João Silva", "joao.silva@email.com", "Java, Spring"));
        candidatos.add(new Candidato("Maria Souza", "maria.souza@email.com", "Python, Data Science"));
        candidatos.add(new Candidato("Pedro Santos", "pedro.santos@email.com", "C++, Desenvolvimento de Jogos"));
        // Adicione mais candidatos mockados aqui
        return candidatos;
    }
}
