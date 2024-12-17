package lp.jobify.controller;


import lp.jobify.model.Vaga;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class VagaController {

    @GetMapping("/vagas")
    public List<Vaga> listarVagas() {
        List<Vaga> vagas = new ArrayList<>();
        vagas.add(new Vaga("Desenvolvedor Java", "Experiência em desenvolvimento de aplicações Java...", "Empresa A"));
        vagas.add(new Vaga("Analista de Dados", "Experiência em análise de dados...", "Empresa B"));
        vagas.add(new Vaga("Engenheiro de Software", "Experiência em desenvolvimento de software...", "Empresa C"));
        // Adicione mais vagas mockadas aqui
        return vagas;
    }
}
