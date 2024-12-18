// VagaController.java
import lp.jobify.model.Vaga;
import lp.jobify.repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/vagas")
public class VagaController {

    @Autowired
    private VagaRepository vagaRepository;

    @GetMapping
    public ResponseEntity<List<Vaga>> listarVagas() {
        return ResponseEntity.ok(vagaRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vaga> buscarVagaPorId(@PathVariable Long id) {
        return vagaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Vaga> criarVaga(@RequestBody Vaga vaga) {
        Vaga novaVaga = vagaRepository.save(vaga);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(novaVaga.getId()).toUri();
        return ResponseEntity.created(location).body(novaVaga);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vaga> atualizarVaga(@PathVariable Long id, @RequestBody Vaga vaga) {
        if (!vagaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        vaga.setId(id);
        return ResponseEntity.ok(vagaRepository.save(vaga));
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
        return ResponseEntity.ok(vagaRepository.findByRecrutadorId(recrutadorId));
    }
}
