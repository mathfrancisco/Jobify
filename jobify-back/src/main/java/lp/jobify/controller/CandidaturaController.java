package lp.jobify.controller;// CandidaturaController.java
import lp.jobify.model.Candidatura;
import lp.jobify.repository.CandidaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/candidaturas")
public class CandidaturaController {

    @Autowired
    private CandidaturaRepository candidaturaRepository;

    @GetMapping("/vaga/{vagaId}")
    public ResponseEntity<List<Candidatura>> getCandidaturasPorVaga(@PathVariable Long vagaId) {
        List<Candidatura> candidaturas = candidaturaRepository.findByVagaId(vagaId);
        return ResponseEntity.ok(candidaturas);
    }

    @GetMapping("/candidato/{candidatoId}")
    public ResponseEntity<List<Candidatura>> getCandidaturasPorCandidato(@PathVariable Long candidatoId) {
        List<Candidatura> candidaturas = candidaturaRepository.findByCandidatoId(candidatoId);
        return ResponseEntity.ok(candidaturas);
    }

    @PostMapping
    public ResponseEntity<Candidatura> criarCandidatura(@RequestBody Candidatura candidatura) {
        candidatura.setDataAplicacao(new Date());
        Candidatura novaCandidatura = candidaturaRepository.save(candidatura);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(novaCandidatura.getId()).toUri();
        return ResponseEntity.created(location).body(novaCandidatura);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Candidatura> atualizarCandidatura(@PathVariable Long id, @RequestBody Candidatura candidatura) {
        return candidaturaRepository.findById(id)
                .map(candidaturaExistente -> {
                    candidaturaExistente.setStatus(candidatura.getStatus());
                    // Atualize outros campos conforme necessário
                    candidaturaRepository.save(candidaturaExistente);
                    return ResponseEntity.ok(candidaturaExistente);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> excluirCandidatura(@PathVariable Long id) {
        return candidaturaRepository.findById(id)
                .map(candidatura -> {
                    candidaturaRepository.delete(candidatura);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
