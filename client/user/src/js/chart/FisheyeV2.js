import * as d3 from "d3";
class Fisheye {
    //https://stackoverflow.com/questions/47844765/d3-rebind-in-d3-v4
    rebind(target, source) {
        var i = 1,
            n = arguments.length,
            method;
        while (++i < n) target[(method = arguments[i])] = this.d3_rebind(target, source, source[method]);
        return target;
    }

    d3_rebind(target, source, method) {
        return function() {
            var value = method.apply(source, arguments);
            return value === source ? target : value;
        };
    }

    scale(scaleType) {
        return this.d3_fisheye_scale(scaleType(), 3, 0);
    }

    circular() {
        var radius = 200,
            distortion = 2,
            k0,
            k1,
            focus = [0, 0];

        function fisheye(d) {
            var dx = d.x - focus[0],
                dy = d.y - focus[1],
                dd = Math.sqrt(dx * dx + dy * dy);
            if (!dd || dd >= radius)
                return {
                    x: d.x,
                    y: d.y,
                    z: dd >= radius ? 1 : 10
                };
            var k = k0 * (1 - Math.exp(-dd * k1)) / dd * 0.75 + 0.25;
            return {
                x: focus[0] + dx * k,
                y: focus[1] + dy * k,
                z: Math.min(k, 10)
            };
        }

        function rescale() {
            k0 = Math.exp(distortion);
            k0 = k0 / (k0 - 1) * radius;
            k1 = distortion / radius;
            return fisheye;
        }

        fisheye.radius = function(_) {
            if (!arguments.length) return radius;
            radius = +_;
            return rescale();
        };

        fisheye.distortion = function(_) {
            if (!arguments.length) return distortion;
            distortion = +_;
            return rescale();
        };

        fisheye.focus = function(_) {
            if (!arguments.length) return focus;
            focus = _;
            return fisheye;
        };

        return rescale();
    }

    d3_fisheye_scale(scale, d, a) {
        function fisheye(_) {
            var x = scale(_),
                left = x < a,
                range = d3.extent(scale.range()),
                min = range[0],
                max = range[1],
                m = left ? a - min : max - a;
            if (m == 0) m = max - min;
            return (left ? -1 : 1) * m * (d + 1) / (d + m / Math.abs(x - a)) + a;
        }

        fisheye.distortion = function(_) {
            if (!arguments.length) return d;
            d = +_;
            return fisheye;
        };

        fisheye.focus = function(_) {
            if (!arguments.length) return a;
            a = +_;
            return fisheye;
        };

        fisheye.copy = function() {
            return d3_fisheye_scale(scale.copy(), d, a);
        };

        fisheye.nice = scale.nice;
        fisheye.ticks = scale.ticks;
        fisheye.tickFormat = scale.tickFormat;
        return this.rebind(fisheye, scale, "domain", "range");
    }
}
export default Fisheye;
