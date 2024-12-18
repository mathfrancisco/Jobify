package lp.jobify.controller;// RecrutadorController.java
import lp.jobify.model.Recrutador;
import lp.jobify.repository.RecrutadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/recrutadores")
public class RecrutadorController {

    @Autowired
    private RecrutadorRepository recrutadorRepository;

    @GetMapping
    public ResponseEntity<List<Recrutador>> listarRecrutadores() {
        return ResponseEntity.ok(recrutadorRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recrutador> buscarRecrutadorPorId(@PathVariable Long id) {
        return recrutadorRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Recrutador> buscarRecrutadorPorEmail(@PathVariable String email) {
        return recrutadorRepository.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Recrutador> criarRecrutador(@RequestBody Recrutador recrutador) {
        Recrutador novoRecrutador = recrutadorRepository.save(recrutador);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(novoRecrutador.getId()).toUri();
        return ResponseEntity.created(location).body(novoRecrutador);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recrutador> atualizarRecrutador(@PathVariable Long id, @RequestBody Recrutador recrutador) {
        if (!recrutadorRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        recrutador.setId(id);
        return ResponseEntity.ok(recrutadorRepository.save(recrutador));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirRecrutador(@PathVariable Long id) {
        if (!recrutadorRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        recrutadorRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
