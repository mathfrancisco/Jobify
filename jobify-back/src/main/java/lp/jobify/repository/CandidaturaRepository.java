package lp.jobify.repository;// CandidaturaRepository.java
import lp.jobify.model.Candidatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidaturaRepository extends JpaRepository<Candidatura, Long> {
    List<Candidatura> findByVagaId(Long vagaId);
    List<Candidatura> findByCandidatoId(Long candidatoId);
}
