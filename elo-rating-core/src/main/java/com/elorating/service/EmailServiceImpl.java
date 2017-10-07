package com.elorating.service;

import com.elorating.service.email.Email;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

    public static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Resource
    private JavaMailSender javaMailSender;

    @Resource
    private TemplateEngine templateEngine;

    @Override
    public void send(Email email) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, false);
            String content = templateEngine.process(email.getTemplateName(), email.getContext());
            messageHelper.setFrom(email.getSender());
            messageHelper.setTo(email.getRecipient());
            messageHelper.setSubject(email.getSubject());
            messageHelper.setText(content, true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            logger.error(e.getMessage());
        } catch (MailAuthenticationException e) {
            logger.error(e.getMessage());
        }
    }
}
