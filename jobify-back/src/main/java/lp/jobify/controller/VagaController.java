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

    @GetMapping("/{id}")
    public ResponseEntity<Vaga> buscarVagaPorId(@PathVariable Long id) {
        Optional<Vaga> vaga = vagaRepository.findById(id);
        return vaga.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Vaga> criarVaga(@RequestBody Vaga vaga) {
        Vaga novaVaga = vagaRepository.save(vaga);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaVaga);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vaga> atualizarVaga(@PathVariable Long id, @RequestBody Vaga vaga) {
        if (!vagaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        vaga.setId(id);
        Vaga vagaAtualizada = vagaRepository.save(vaga);
        return ResponseEntity.ok(vagaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirVaga(@PathVariable Long id) {
        if (!vagaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        vagaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/recrutador/{recrutadorId}")
    public ResponseEntity<List<Vaga>> listarVagasPorRecrutador(@PathVariable Long recrutadorId) {
        List<Vaga> vagas = vagaRepository.findByRecrutadorId(recrutadorId);
        return ResponseEntity.ok(vagas);
    }
}
