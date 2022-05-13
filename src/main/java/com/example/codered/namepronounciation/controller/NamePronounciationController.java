package com.example.codered.namepronounciation.controller;

import com.example.codered.namepronounciation.dbEntity.TestTable;
import com.example.codered.namepronounciation.repository.TestTableRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.codered.namepronounciation.ttsCore.*;


import javax.sound.sampled.*;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
public class NamePronounciationController {

    @Autowired
    private TestTableRepository repo;

    /* @Autowired
     private RestTemplate restTemplate;
 */
    private final String accessToken_API = "https://eastus.api.cognitive.microsoft.com/sts/v1.0/issuetoken";
    private final String textToSpeechUri = "https://eastus.tts.speech.microsoft.com/cognitiveservices/v1";
    private String accessToken;

    @PostMapping("/save")
    public ResponseEntity<TestTable> saveProfile(@RequestBody TestTable testTable) {
        return ResponseEntity.ok(repo.save(testTable));
    }

    @GetMapping("/fetch/all")
    public List<TestTable> fetchAll() {
        return repo.findAll();
    }


    @GetMapping(value = "/getPronunciation")
    public void getPronunciation(@RequestParam("locale") String locale, @RequestParam ("name") String textToSynthesize) {
        //String textToSynthesize = "good";
        String outputFormat = AudioOutputFormat.Riff24Khz16BitMonoPcm;
        //String deviceLanguage = "en-US";
        String genderName = Gender.Male;
        String voiceName = "en-US-ChristopherNeural"; // Short name for "Microsoft Server Speech Text to Speech Voice (en-US, Guy24KRUS)"

        try {
            byte[] audioBuffer = TTSService.Synthesize(textToSynthesize, outputFormat, locale, genderName, voiceName);

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
                    24000,
                    16,
                    1,
                    1 * 2,
                    24000,
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
}
