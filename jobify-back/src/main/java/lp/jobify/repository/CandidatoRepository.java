package lp.jobify.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import lp.jobify.model.Candidato;

import java.util.Optional;

public interface CandidatoRepository extends JpaRepository<Candidato, Long> {
    Optional<Candidato> findByEmail(String email);
}
