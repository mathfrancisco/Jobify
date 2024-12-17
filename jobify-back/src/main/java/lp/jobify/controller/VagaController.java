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

    @Autowired
    private VagaRepository vagaRepository;

    @GetMapping("/vagas")
    public ResponseEntity<List<Vaga>> listarVagas() {
        List<Vaga> vagas = vagaRepository.findAll();
        return ResponseEntity.ok(vagas);
    }
}
