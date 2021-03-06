package com.example.codered.namepronounciation.controller;

import com.example.codered.namepronounciation.dbEntity.SpeechPresets;
import com.example.codered.namepronounciation.dbEntity.UserDetails;
import com.example.codered.namepronounciation.model.Voices;
import com.example.codered.namepronounciation.repository.UserDetailsRepository;

import com.example.codered.namepronounciation.service.NamePronounciationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.codered.namepronounciation.ttsCore.*;


import javax.sound.sampled.*;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class NamePronounciationController {

    private final String accessToken_API = "https://eastus.api.cognitive.microsoft.com/sts/v1.0/issuetoken";
    private final String textToSpeechUri = "https://eastus.tts.speech.microsoft.com/cognitiveservices/v1";
    private String accessToken;

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Autowired
    private NamePronounciationService namePronounciationService;

    @PostMapping("/saveUserDetails")
    public ResponseEntity<UserDetails> saveProfile(@RequestBody UserDetails userDetails){
        userDetails.setEmail(userDetails.getEmail().toLowerCase());
        return ResponseEntity.ok(userDetailsRepository.save(userDetails));
    }


    @GetMapping(value = "/getPronunciation")
    public void getPronunciation(@RequestParam("locale") String locale, @RequestParam ("name") String textToSynthesize, @RequestParam(name = "gender") String gender, @RequestParam(name = "voice") String voice) {
        String outputFormat = AudioOutputFormat.Riff16Khz16BitMonoPcm; // Short name for "Microsoft Server Speech Text to Speech Voice (en-US, Guy24KRUS)"

        try {
            byte[] audioBuffer = TTSService.Synthesize(textToSynthesize, outputFormat, locale, gender, voice);

            // write the pcm data to the file
            String outputWave = ".\\output.pcm";
            File outputAudio = new File(outputWave);
            FileOutputStream fstream = new FileOutputStream(outputAudio);
            fstream.write(audioBuffer);
            fstream.flush();
            fstream.close();
            //return audioBuffer;

            //specify the audio format
            AudioFormat audioFormat = new AudioFormat(
                    AudioFormat.Encoding.PCM_SIGNED,
                    16000,
                    16,
                    1,
                    1 * 2,
                    16000,
                    false);

            AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(new File(outputWave));

            DataLine.Info dataLineInfo = new DataLine.Info(SourceDataLine.class,
                    audioFormat, AudioSystem.NOT_SPECIFIED);
            SourceDataLine sourceDataLine = (SourceDataLine) AudioSystem
                    .getLine(dataLineInfo);
            sourceDataLine.open(audioFormat);
            sourceDataLine.start();
            System.out.println("start to play the wave:");

             /* read the audio data and send to mixer*/

            int count;
            byte tempBuffer[] = new byte[4096];
            while ((count = audioInputStream.read(tempBuffer, 0, tempBuffer.length)) >0) {
                sourceDataLine.write(tempBuffer, 0, count);
            }

            sourceDataLine.drain();
            sourceDataLine.close();
            audioInputStream.close();

        }catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    @PostMapping("/editPronounciation")
    public ResponseEntity<String> editPronounciation(@RequestParam  String email,@RequestBody byte[] audioBuffer,@RequestParam String region,@RequestParam String voiceType,@RequestParam String voiceGender,@RequestParam String preference) throws SQLException {
        namePronounciationService.editPronounciation(email, audioBuffer, region, voiceType, voiceGender, preference);

        return ResponseEntity.ok("Voice updated Successfully");
    }

    @GetMapping("/presets")
    public List<SpeechPresets> getAllVoicePresets() {
        return namePronounciationService.getAllVoicePresets();
    }

    @GetMapping("/getVoicesList/{region}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Voices>> getVoicesByRegion(@PathVariable(name = "region") String region) {
        return new ResponseEntity<>(namePronounciationService.getVoicesByRegion(region), HttpStatus.OK);
    }

}
