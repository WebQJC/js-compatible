//------------forEach遍历数组-------------
/**
* forEach在IE6-8下不兼容
* @param callback [function] 回调函数；
* @param context [object] 上下文；
*/
Array.prototype.myForEach = function myForEach(callback,context){
    context = context || window;
    if('forEach' in Array.prototye) {
        this.forEach(callback,context);
        return;
    }
    //IE6-8下自己编写回调函数执行的逻辑
    for(var i = 0,len = this.length; i < len;i++) {
        callback && callback.call(context,this[i],i,this);
    }
}

//--------map遍历数组--------------------
/** 
* map在在IE6-8下不兼容
* @param callback [function] 回调函数； 
* @param context [object] 上下文； 
*/  
Array.prototype.myMap = function myMap(callback,context){  
    context = context || window;  
    if('map' in Array.prototye) {  
        return this.map(callback,context);  
    }  
    //IE6-8下自己编写回调函数执行的逻辑  
    var newAry = [];  
    for(var i = 0,len = this.length; i < len;i++) {  
        if(typeof  callback === 'function') {  
            var val = callback.call(context,this[i],i,this);  
            newAry[newAry.length] = val;  
        }  
    }  
    return newAry;  
}  
//-------------innerText,textContent设置----------------------------------------
/**
 * 设置标签中的文本内容,应该使用textContent属性,谷歌,火狐支持,IE8不支持
 *设置标签中的文本内容,应该使用innerText属性,谷歌,火狐,IE8都支持
 * @param element 任意元素
 * @param text 任意文本内容
 */
function setInnerText(element, text) {
    if (typeof(element.textContent) == "undefined") {
        element.innerText = text;
    } else {
        element.textContent = text;
    }
}
// 调用-------
// my$("btn").onclick=function () {
//     setInnerText(my$("dv"),"哈哈,我又变帅了");
// }

//--------------innerText,textContent获取-----------------------------------
/**
 * 获取标签中的文本内容,应该使用textContent属性,谷歌,火狐支持,IE8不支持
 * 获取标签中的文本内容,应该使用innerText属性,谷歌,火狐,IE8都支持
 * @param element 任意元素
 * @returns {*} 任意元素中的文本内容
 */
function getInnerText(element) {
    if (typeof(element.textContent) == "undefined") {
        return element.innerText;
    } else {
        return element.textContent;
    }
}
// 调用-------
// my$("btn").onclick=function () {
//     console.log(getInnerText(my$("dv")));
// }

//------------获取父级元素中的第一个子元素-------------------------------------
/**
 * @param element 父级元素
 * @returns {*} 父级元素中的子级元素
 */
function getFirstElement(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var node = element.firstChild;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}
// 调用-------
// my$("btn").onclick=function () {
//     console.log(getFirstElement(my$("dv")));
// }

//------------- 获取父级元素中的最后一个子元素--------------------------------
/**
 * @param element 父级元素
 * @returns {*} 最后一个子元素
 */
function getLastElement(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var node = element.lastChild;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}
// 调用-------
// my$("btn").onclick=function () {
//     console.log(getLastElement(my$("dv")));
// }

//------------获取某个元素的前一个兄弟元素----------------------------------
/**
 * @param element 某个元素
 * @returns {*} 前一个兄弟元素
 */
function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling
    } else {
        var node = element.previousSibling;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}
// 调用-------
// my$("btn").onclick=function () {
//     console.log(getPreviousElement(my$("dv")));
// }

//--------------获取某个元素的后一个兄弟元素-------------------------------
/**
 * @param element 某个元素
 * @returns {*} 后一个兄弟元素
 */
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling
    } else {
        var node = element.nextSibling;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}
// 调用-------
// my$("btn").onclick=function () {
//     console.log(getNextElement(my$("dv")));
// }

//-------------获取某个元素的所有兄弟元素--------------------------------
/**
 * @param element 某个元素
 * @returns {Array} 兄弟元素
 */
function getSiblings(element) {
    if (!element)return;
    var elements = [];
    var ele = element.previousSibling;
    while (ele) {
        if (ele.nodeType === 1) {
            elements.push(ele);
        }
        ele = ele.previousSibling;
    }
    ele = element.nextSibling;
    while (ele) {
        if (ele.nodeType === 1) {
            elements.push(ele);

        }
        ele = ele.nextSibling;
    }
    return elements;
}
// 调用-------
// my$("btn").onclick=function () {
//     console.log(getSiblings(my$("dv")));
// }

//----为任意一个元素绑定事件:元素,事件类型,事件处理函数-------------
function addEventListener(element,type,fn) {
    if(element.addEventListener){
        //支持
        element.addEventListener(type,fn,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,fn);
    }else{
        element["on"+type]=fn;
    }
}

//----为任意的一个元素解绑某个事件:元素,事件类型,事件处理函数---------
function removeEventListener(element,type,fn) {
    if(element.removeEventListener){
        element.removeEventListener(type,fn,false);
    }else if(element.detachEvent){
        element.detachEvent("on"+type,fn);
    }else{
        element["on"+type]=null;
    }
}

//----------获取的是页面向上或者向左卷曲出去的距离的值,返回的是对象-------
/**
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function getScroll() {
    return {
        top: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0,
        left: window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft||0
    };
}
