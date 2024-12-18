package lp.jobify.controller;// CandidatoController.java
import lp.jobify.model.Candidato;
import lp.jobify.repository.CandidatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/candidatos")
public class CandidatoController {

    @Autowired
    private CandidatoRepository candidatoRepository;

    @GetMapping
    public ResponseEntity<List<Candidato>> listarCandidatos() {
        return ResponseEntity.ok(candidatoRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Candidato> buscarCandidatoPorId(@PathVariable Long id) {
        return candidatoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Candidato> buscarCandidatoPorEmail(@PathVariable String email) {
        return candidatoRepository.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Candidato> criarCandidato(@RequestBody Candidato candidato) {
        Candidato novoCandidato = candidatoRepository.save(candidato);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(novoCandidato.getId()).toUri();
        return ResponseEntity.created(location).body(novoCandidato);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Candidato> atualizarCandidato(@PathVariable Long id, @RequestBody Candidato candidato) {
        if (!candidatoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        candidato.setId(id);
        return ResponseEntity.ok(candidatoRepository.save(candidato));
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
