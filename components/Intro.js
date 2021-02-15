import React, {useState} from 'react'
import {View} from 'react-native'
import { SliderBox } from "react-native-image-slider-box";

function Intro(){
    const [isSliders, setSliders] = useState({
        images: [
            "https://source.unsplash.com/1024x768/?nature",
            "https://source.unsplash.com/1024x768/?water",
            "https://source.unsplash.com/1024x768/?girl",
            "https://source.unsplash.com/1024x768/?tree",
        ]
    })
    return(
        <View>
            <SliderBox
                images={isSliders.images}
                sliderBoxHeight={200}

            />
        </View>
    )
}

export default Intro