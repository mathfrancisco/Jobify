package lp.jobify.service;

import lp.jobify.model.Mensagem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContatoService {

    @Autowired
    private JavaMailSender emailSender;

    public void enviarMensagem(Mensagem mensagem) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("seu_email@gmail.com"); // Substitua pelo seu email
        mailMessage.setTo("email_destino@example.com"); // Substitua pelo email de destino
        mailMessage.setSubject("Nova mensagem do formulário de contato");
        mailMessage.setText(this.formatarCorpoEmail(mensagem)); // Formata o corpo do email

        emailSender.send(mailMessage);

        System.out.println("Email enviado com sucesso!");
    }

    private String formatarCorpoEmail(Mensagem mensagem) {
        return "Nome: " + mensagem.getNome() + "\n" +
                "Email: " + mensagem.getEmail() + "\n" +
                "Mensagem: " + mensagem.getMensagem();
    }
}
