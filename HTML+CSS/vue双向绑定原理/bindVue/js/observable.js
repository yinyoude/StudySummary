
function defineReactive(data, key, val) {
    observe(val);                           //递归遍历所有子属性
    var dep = new Dep();
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            if (Dep.target) {
                dep.addSub(Dep.target)
            }
            return val;
        },
        set: function(newVal) {
            if(val === newVal) {
                return;
            }
            val = newVal;
            console.log('属性' + key + '已经被监听，现在值为："' + newVal.toString() + '"');
            dep.notify();
        }
    })

}

Dep.target = null;

function observe(data) {
    if(!data || typeof data != 'object') {
        return;
    }
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key])
    })
}

function Dep() {
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub)
    },
    notify: function() {
        console.log(this.subs)
        this.subs.forEach(function(sub) {
            sub.update();
        })
    }
}