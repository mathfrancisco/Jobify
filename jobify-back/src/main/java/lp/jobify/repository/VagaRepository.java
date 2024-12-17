package lp.jobify.repository;// VagaRepository.java
import lp.jobify.model.Vaga;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VagaRepository extends JpaRepository<Vaga, Long> {
    List<Vaga> findByRecrutadorId(Long recrutadorId);
}
