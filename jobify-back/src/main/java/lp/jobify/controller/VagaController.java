// VagaController.java
import lp.jobify.model.Vaga;
import lp.jobify.repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vagas")
public class VagaController {

    @Autowired
    private VagaRepository vagaRepository;

    @GetMapping
    public ResponseEntity<List<Vaga>> listarVagas() {
        List<Vaga> vagas = vagaRepository.findAll();
        return ResponseEntity.ok(vagas);
    }

    // Implemente os métodos buscarPorId, criar, atualizar e excluir,
    // seguindo o exemplo do CandidatoController.

    @GetMapping("/recrutador/{recrutadorId}") // Vagas por recrutador
    public ResponseEntity<List<Vaga>> listarVagasPorRecrutador(@PathVariable Long recrutadorId) {
        List<Vaga> vagas = vagaRepository.findByRecrutadorId(recrutadorId); // Implemente este método no repositório
        return ResponseEntity.ok(vagas);
    }
}
