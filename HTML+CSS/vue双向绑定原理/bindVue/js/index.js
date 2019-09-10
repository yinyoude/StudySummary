/* function SelfVue (data, el, exp) {
    var self = this;
    this.data = data;
    
    Object.keys(data).forEach(function(key) {
        self.proxyKey(key);     // 绑定代理属性
    })

    observe(data);
    el.innerHTML= this.data[exp];
    new Watcher(this, exp, function(value) {
        el.innerHTML = value;
    })
    return this;
} */

function SelfVue (options) {
    var self = this;
    this.vm = this;
    this.data = options.data;

    Object.keys(this.data).forEach(function(key) {
        self.proxyKeys(key);
    });

    observe(this.data);
    new Compile(options.el, this.vm);
    return this;
}

SelfVue.prototype = {
    proxyKeys: function(key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function getter() {
                return self.data[key];
            },
            set: function setter(newVal) {
                self.data[key] = newVal;
            }
        })
    }
}