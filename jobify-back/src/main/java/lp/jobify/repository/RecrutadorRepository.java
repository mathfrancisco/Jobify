package lp.jobify.repository;

import lp.jobify.model.Recrutador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface RecrutadorRepository extends JpaRepository<Recrutador, Long> {
    Optional<Recrutador> findByEmail(String email);
}
