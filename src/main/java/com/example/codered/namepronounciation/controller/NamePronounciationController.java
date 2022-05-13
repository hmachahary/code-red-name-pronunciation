package com.example.codered.namepronounciation.controller;

import com.example.codered.namepronounciation.dbEntity.UserDetails;
import com.example.codered.namepronounciation.dbEntity.UserLogin;
import com.example.codered.namepronounciation.repository.TestTableRepository;
import com.example.codered.namepronounciation.repository.UserDetailsRepository;
import com.example.codered.namepronounciation.repository.UserLoginRepository;
import com.example.codered.namepronounciation.util.XmlDom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
public class NamePronounciationController {

    @Autowired
    private TestTableRepository repo;

    @Autowired
    private UserLoginRepository userLoginRepository;

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Autowired
    private RestTemplate restTemplate;

    private final String accessToken_API = "https://centralindia.api.cognitive.microsoft.com/sts/v1.0/issuetoken";
    private final String textToSpeechUri = "https://centralindia.tts.speech.microsoft.com/cognitiveservices/v1";
    private String accessToken;

    @PostMapping("/saveLoginName&Pass")
    public ResponseEntity<UserLogin> saveLogin(@RequestBody UserLogin userLogin){
        return ResponseEntity.ok(userLoginRepository.save(userLogin));
    }

    @PostMapping("/saveUserDetails")
    public ResponseEntity<UserDetails> saveProfile(@RequestBody UserDetails userDetails){
        return ResponseEntity.ok(userDetailsRepository.save(userDetails));
    }

    @GetMapping("/fetch/all")
    public List<UserDetails> fetchAllUserDetails(){
        return userDetailsRepository.findAll();
    }

    @GetMapping(value = "/getAccessToken")
    public String getAccessToken(String apiKey) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Ocp-Apim-Subscription-Key", "a284484f3d774c5b82b9b9dce940b6db");
        HttpEntity<String> entity = new HttpEntity<String>(headers);
//        String result = restTemplate.getForObject(accessToken_API, String.class);
//        System.out.println(result);
        return restTemplate.exchange(accessToken_API, HttpMethod.GET, entity, String.class).getBody();

    }

    @PostMapping(value = "/getPronunciation")
    public byte[] getPronunciation(String locale, String genderName, String voiceName, String textToSynthesize, String outputFormat, String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Ocp-Apim-Subscription-Key", "a284484f3d774c5b82b9b9dce940b6db");
        headers.set("Content-Type", "application/ssml+xml");
        headers.set("X-Microsoft-OutputFormat", outputFormat);
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Accept", "*/*");

        HttpEntity<String> entity = new HttpEntity<String>(headers);


        String body = XmlDom.createDom(locale, genderName, voiceName, textToSynthesize);
        byte[] bytes = body.getBytes();
        headers.set("content-length", String.valueOf(bytes.length));

        HttpEntity<String> request = new HttpEntity<String>(body, headers);

        return restTemplate.exchange(
                textToSpeechUri, HttpMethod.POST, request, byte[].class).getBody();
    }
}
