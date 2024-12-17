// CandidatoController.java
import lp.jobify.model.Candidato;
import lp.jobify.repository.CandidatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/candidatos") // Ajustado o caminho
public class CandidatoController {

    @Autowired
    private CandidatoRepository candidatoRepository;

    @GetMapping
    public ResponseEntity<List<Candidato>> listarCandidatos() {
        List<Candidato> candidatos = candidatoRepository.findAll();
        return ResponseEntity.ok(candidatos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Candidato> buscarCandidatoPorId(@PathVariable Long id) {
        Optional<Candidato> candidato = candidatoRepository.findById(id);
        return candidato.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Candidato> criarCandidato(@RequestBody Candidato candidato) {
        Candidato novoCandidato = candidatoRepository.save(candidato);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoCandidato);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Candidato> atualizarCandidato(@PathVariable Long id, @RequestBody Candidato candidato) {
        if (!candidatoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        candidato.setId(id); // Garantir que o ID seja o mesmo
        Candidato candidatoAtualizado = candidatoRepository.save(candidato);
        return ResponseEntity.ok(candidatoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirCandidato(@PathVariable Long id) {
        if (!candidatoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        candidatoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
