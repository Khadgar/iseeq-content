 
class Utils {
    constructor(){
        // Content of chart-component.less
        this.style = '.main{font:12px sans-serif}.chart{background-color:#FFF}.yAxis,line,path{shape-rendering:crispEdges;stroke:#696969;fill:none}.x_axis_label{text-anchor:end;transform:rotate(-65deg);font:9px sans-serif}.y_axis_label{font:12px sans-serif}circle.extra{stroke:#ff8000;stroke-width:3px}circle.junior{stroke:#c70039;stroke-width:3px}circle.senior{stroke:#a335ee;stroke-width:3px}circle.regular{stroke:#0070dd;stroke-width:3px}.from,.to{fill:#dcdcdc}.currentValue{display:flex;flex-direction:row;justify-content:space-around;height:50px}.currentValue-value{padding-top:10px;display:flex;flex-direction:row}.chartArea,.chartValue{flex-direction:column;display:flex}.valueName{padding-right:4px}.tick line{opacity:.2}.link{opacity:.8}.updateChartData{padding-top:10px;padding-bottom:10px}.chartArea{margin-bottom:20px}.chartArea-header{align-self:flex-end}.chartValue{margin-top:20px;padding:4px;border:1px solid #ced4da;border-radius:3px}.chartValue-salary{display:flex;flex-direction:column;justify-content:space-between;align-self:center}.chartValue-salary-value{height:24px}.chartValue-salary-colName{align-self:center}.chartValue-role{display:flex;justify-content:space-between}.chartValue-seniority{display:flex;justify-content:space-between;text-transform:capitalize}'
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
