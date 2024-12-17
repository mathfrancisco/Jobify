package lp.jobify.controller;// RecrutadorController.java
import lp.jobify.model.Recrutador;
import lp.jobify.repository.RecrutadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recrutadores")
public class RecrutadorController {

    @Autowired
    private RecrutadorRepository recrutadorRepository;

    @GetMapping
    public ResponseEntity<List<Recrutador>> listarRecrutadores() {
        List<Recrutador> recrutadores = recrutadorRepository.findAll();
        return ResponseEntity.ok(recrutadores);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recrutador> buscarRecrutadorPorId(@PathVariable Long id) {
        Optional<Recrutador> recrutador = recrutadorRepository.findById(id);
        return recrutador.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Recrutador> criarRecrutador(@RequestBody Recrutador recrutador) { // Adicionado @RequestBody
        Recrutador novoRecrutador = recrutadorRepository.save(recrutador);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoRecrutador);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recrutador> atualizarRecrutador(@PathVariable Long id, @RequestBody Recrutador recrutador) {
        if (!recrutadorRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        recrutador.setId(id);
        Recrutador recrutadorAtualizado = recrutadorRepository.save(recrutador);
        return ResponseEntity.ok(recrutadorAtualizado);
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
