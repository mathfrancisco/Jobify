package lp.jobify.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import lp.jobify.model.Candidato;

public interface CandidatoRepository extends JpaRepository<Candidato, Long> { }
