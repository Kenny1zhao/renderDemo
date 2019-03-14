;var utils = {};

(function(utils){
    /*
    var tpl = '<a>{{this.key1}} <p>-</p> {{this.value1.c}}</a>';
    var data = {"key1":1,"value1":{"c":"cccccc"}};
    var html = render(tpl,data);  
    */
    function render(template, data) {
        template = template || "";
        data = data || [""];
        var re = /{%((?:(?!%}).)+)%}/g, reExp = /(^( )?(var|if|for|else|switch|case|default|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0;
        var add = function(line, js) {
            js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        }
        var match;
        while(match = re.exec(template)) {
            add(template.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        add(template.substr(cursor, template.length - cursor));
        code += 'return r.join("");';
        data = isNaN(data.length) ? [data] : data;
        var html = "";
        for(var i = 0, length = data.length; i < length; i++) {
            html += new Function(code.replace(/[\r\t\n]/g, '')).apply(data[i]);
        }
        return html;
    }

    utils.render = render;

})(utils);
