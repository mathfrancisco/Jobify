package lp.jobify.repository;// RecrutadorRepository.java
import lp.jobify.model.Recrutador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecrutadorRepository extends JpaRepository<Recrutador, Long> {
    Optional<Recrutador> findByEmail(String email);
}
