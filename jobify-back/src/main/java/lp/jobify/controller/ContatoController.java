package lp.jobify.controller;


import lp.jobify.model.Mensagem;
import lp.jobify.service.ContatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ContatoController {

    @Autowired
    private ContatoService contatoService;

    @PostMapping("/contato")
    public String enviarMensagem(@RequestBody Mensagem mensagem) {
        contatoService.enviarMensagem(mensagem);
        return "Mensagem enviada com sucesso!";
    }
}
