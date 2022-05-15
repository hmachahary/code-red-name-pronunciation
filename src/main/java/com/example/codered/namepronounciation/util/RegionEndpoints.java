package com.example.codered.namepronounciation.util;

import java.util.HashMap;

public class RegionEndpoints {
    private static final HashMap<String, String> regionEndpoints = new HashMap<>();
    static {
        regionEndpoints.put("en-US", "twenty");
        regionEndpoints.put("en-IN", "https://centralindia.tts.speech.microsoft.com/cognitiveservices/voices/list");
        regionEndpoints.put("en-ZA", "https://westeurope.tts.speech.microsoft.com/cognitiveservices/voices/list");
        regionEndpoints.put("en-CA", "https://canadacentral.tts.speech.microsoft.com/cognitiveservices/voices/list");
        regionEndpoints.put("en-SG", "https://southeastasia.tts.speech.microsoft.com/cognitiveservices/voices/list");
        regionEndpoints.put("en-NZ", "https://westeurope.tts.speech.microsoft.com/cognitiveservices/voices/list");
        regionEndpoints.put("en-HK", "https://southeastasia.tts.speech.microsoft.com/cognitiveservices/voices/list");
        regionEndpoints.put("en-PH", "https://southeastasia.tts.speech.microsoft.com/cognitiveservices/voices/list");
        regionEndpoints.put("en-GB", "https://uksouth.tts.speech.microsoft.com/cognitiveservices/voices/list");
        regionEndpoints.put("en-AU", "https://australiaeast.tts.speech.microsoft.com/cognitiveservices/voices/list");
    }
}
