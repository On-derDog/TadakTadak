package com.tadak.userservice.domain.email.service;

import com.tadak.userservice.domain.email.dto.EmailResponseDto;
import com.tadak.userservice.domain.email.repository.EmailRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final EmailRepository emailRepository;
    @Value("${spring.mail.username}")
    private String configEmail;

    public void sendEmail(String email) throws MessagingException {
        MimeMessage emailForm = createEmail(email);

        mailSender.send(emailForm);
    }

    private MimeMessage createEmail(String email) throws MessagingException {
        String authCode = createdCode();

        MimeMessage message = mailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email);
        message.setSubject("[TadakTadak] 인증안내");
        message.setFrom(configEmail);
        message.setText(setContext(authCode), "utf-8", "html");

        emailRepository.saveAuth(email, authCode, 60 * 2L);

        return message;
    }

    private String createdCode() {
        int leftLimit = 48;
        int rightLimit = 122;
        int targetStringLength = 10;

        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    private String setContext(String code) {
        return "<html>"
                + "<head>"
                + "<style>"
                + "body {"
                + "    font-family: 'Arial', sans-serif;"
                + "    background-color: #f7f7f7;"
                + "    text-align: center;"
                + "}"
                + "p {"
                + "    font-size: 18px;"
                + "    color: #333;"
                + "    margin-top: 40px;"
                + "    padding: 20px;"
                + "    background-color: #fff;"
                + "    display: inline-block;"
                + "    border-radius: 8px;"
                + "    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);"
                + "}"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<p>Tadak Tadak 회원가입 인증코드: <strong>" + code + "</strong></p>"
                + "</body>"
                + "</html>";
    }

    public EmailResponseDto verifyEmailCode(String email, String code) {
        String codeFoundByEmail = emailRepository.getValue(email);

        if (codeFoundByEmail == null) {
            return EmailResponseDto.of(false);
        }

        boolean validCode = codeFoundByEmail.equals(code);
        return EmailResponseDto.of(validCode);
    }
}
