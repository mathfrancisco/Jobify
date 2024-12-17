// RecrutadorController.java
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

    // Implemente os métodos buscarPorId, criar, atualizar e excluir,
    // seguindo o exemplo do CandidatoController.
}
