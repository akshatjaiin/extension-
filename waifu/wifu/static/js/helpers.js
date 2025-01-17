function isMobile() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    console.log('isMobile check result: ', check); // Debugging line
    return check;
};

function emotion2SsmlStyle(emotion) {
    var style;
    console.log('Emotion input:', emotion); // Debugging line
    if (emotion == null) {
        style = "General";
        console.log('No emotion provided, default style:', style); // Debugging line
    } else {
        const emotionToEkman = {
            "neutral": ["neutral"],
            "anger": ["anger", "annoyance", "disapproval"],
            "disgust": ["disgust"],
            "fear": ["fear", "nervousness"],
            "joy": ["joy", "amusement", "approval", "excitement", "gratitude", "love", "optimism", "relief", "pride", "admiration", "desire", "caring"],
            "sadness": ["sadness", "disappointment", "embarrassment", "grief", "remorse"],
            "surprise": ["surprise", "realization", "confusion", "curiosity"]
        };

        for (let e in emotionToEkman) {
            if (emotionToEkman[e].includes(emotion)) {
                emotion = e;
                console.log('Mapped emotion to Ekman:', emotion); // Debugging line
            }
        }

        const emotionToSsmlStyleMap = {
            "neutral": "General",
            "anger": "Angry",
            "disgust": "Unfriendly",
            "fear": "Terrified",
            "joy": "Excited",
            "sadness": "Sad",
            "surprise": "Excited"
        };

        style = emotionToSsmlStyleMap[emotion];
        console.log('Final SSML Style:', style); // Debugging line
    }
    return style;
}
function createSsml(response, name, emotion) {
    console.log('Generated response:', response);
    console.log('Emotion passed:', emotion);
    var style = emotion2SsmlStyle(emotion);
    console.log('Generated SSML style:', style);
    
    const ssml = `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
        <voice name="${name}">
            <mstts:viseme type="FacialExpression"/>
            <mstts:express-as style="${style}">
                <prosody rate="15%" pitch="15%">
                    ${response}
                </prosody>
            </mstts:express-as>
        </voice>
    </speak>`;
    console.log('Final SSML:', ssml); // Log the generated SSML

    return ssml;
}

function getURLParam(key) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(`Getting URL parameter for ${key}:`, urlParams.get(key)); // Debugging line
    return urlParams.get(key);
}

/**
 * https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/how-to-speech-synthesis-viseme?tabs=visemeid&pivots=programming-language-javascript#map-phonemes-to-visemes
 * The Azure TTS API tells us what the shape of the mouth should be at certain points in time. That shape is called a viseme.
 * This function takes the Waifu model and the viseme and makes her mouth that shape.
 * @param {*} model Waifu model
 * @param {*} v visemeID
 */
function setViseme(model, v) {
    console.log("set vsm get triggered")
    console.log('Setting viseme ID:', v);
    const visemeMap = [[1, 0], [1, 1], [1, 1], [.3, .7], [1, .3], [1, .3], [1, .1], [.1, .1], [.3, .5], [1, .8], [.2, 2], [1, 1], [1, .2], [.3, .3], [.9, .2], [1, .1], [.1, .1], [1, .3], [1, .05], [1, .3], [1, .6], [1, 0]];
    // Verify if model is accessible and internalModel is available
    if (model && model.internalModel && model.internalModel.coreModel) {
        model.internalModel.coreModel.setParamFloat('PARAM_MOUTH_OPEN_Y', visemeMap[v][1] ?? 0);
    } else {
        console.error('Model or internalModel is not available');
    }
}


export { isMobile, createSsml, getURLParam, setViseme };