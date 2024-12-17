import lp.jobify.model.Candidato;
import lp.jobify.model.Recrutador;
import lp.jobify.model.Vaga;
import lp.jobify.repository.CandidatoRepository;
import lp.jobify.repository.RecrutadorRepository;
import lp.jobify.repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CandidatoRepository candidatoRepository;
    @Autowired
    private RecrutadorRepository recrutadorRepository;
    @Autowired
    private VagaRepository vagaRepository;

    @Override
    public void run(String... args) throws Exception {
        // Criar Candidatos
        // ... (próxima parte)
    }
}
