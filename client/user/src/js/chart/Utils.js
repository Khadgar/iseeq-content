 
class Utils {
    constructor(){
        // Content of chart-component.less
        this.style = '.main text {  font: 12px sans-serif;}line,path,.yAxis {  shape-rendering: crispEdges;  stroke: #696969;  fill: none;}.xAxis {  display: none;}circle.extra {  stroke: #ff8000;  stroke-width: 3px;}circle.junior {  stroke: #c70039;  stroke-width: 3px;}circle.senior {  stroke: #a335ee;  stroke-width: 3px;}circle.regular {  stroke: #0070dd;  stroke-width: 3px;}.from {  fill: #dcdcdc;}.to {  fill: #dcdcdc;}.currentValue {  display: flex;  flex-direction: row;  justify-content: space-around;  height: 50px;}.currentValue-value {  padding-top: 10px;  display: flex;  flex-direction: row;}.valueName {  padding-right: 4px;}.tick line {  opacity: 0.2;}.link {  opacity: 0.8;}'
    }
    getSVGString(svgNode) {
        svgNode.setAttribute("xlink", "http://www.w3.org/1999/xlink");
        appendCSS(this.style, svgNode);

        var serializer = new XMLSerializer();
        var svgString = serializer.serializeToString(svgNode);
        svgString = svgString.replace(/(\w+)?:?xlink=/g, "xmlns:xlink="); // Fix root xlink without namespace
        svgString = svgString.replace(/NS\d+:href/g, "xlink:href"); // Safari NS namespace fix

        return svgString;

        function appendCSS(cssText, element) {
            var styleElement = document.createElement("style");
            styleElement.setAttribute("type", "text/css");
            styleElement.innerHTML = cssText;
            var refNode = element.hasChildNodes() ? element.children[0] : null;
            element.insertBefore(styleElement, refNode);
        }
    }

    svgString2Image(svgString, width, height, format, callback) {
        var format = format ? format : "png";

        var imgsrc = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString))); // Convert SVG string to data URL

        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        var image = new Image();
        image.onload = function() {
            context.clearRect(0, 0, width, height);
            context.drawImage(image, 0, 0, width, height);

            canvas.toBlob(function(blob) {
                var filesize = Math.round(blob.length / 1024) + " KB";
                if (callback) callback(blob, filesize);
            });
        };

        image.src = imgsrc;
    }
}
export default Utils;
