import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "html": {
        "height": "100%",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "body": {
        "height": "100%",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "mapContainer": {
        "height": "100%",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "map": {
        "height": "100%"
    },
    "placeListItem": {
        "width": "100%",
        "textAlign": "center",
        "fontSize": 18,
        "cursor": "pointer",
        "backgroundColor": "#2196F3",
        "color": "white",
        "marginBottom": 0.5
    },
    "placeListItem:hover": {
        "textDecoration": "underline"
    },
    "heading": {
        "fontSize": 24,
        "fontWeight": "500",
        "fontFamily": "'Changa One', cursive",
        "backgroundColor": "#68EFAD",
        "textAlign": "center"
    },
    "searchIcon": {
        "float": "left",
        "marginTop": -20,
        "position": "relative",
        "zIndex": 2,
        "marginLeft": 2
    }
});