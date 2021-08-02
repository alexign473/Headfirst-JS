var ajaxReq = new AjaxRequest()
// Load the blog from an XML doc on the server using Ajax
function loadBlog() {
    document.getElementById("blog").innerHTML = "<img src='wait.gif' alt='Loading...' />"
    ajaxReq.send("GET", "blog.xml", handleRequest)
}

function AjaxRequest() {
    if (window.XMLHttpRequest) {
        try {
            this.request = new XMLHttpRequest();
        } catch (e) {
            this.request = null;
        }
        //ActiveX (IE) version
    } else if (window.ActiveXObject) {
        try {
            this.request = new ActiveXObject("Msxml2.XMLHTTP");
            // Try the older ActiveX object for older versions of IE
        } catch (e) {
            try {
                this.request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                this.request = null;
            }
        }
    }
    // If the request creation failed, notify the user
    if (this.request == null)
        alert("Ajax error creating the request.\n" + "Details: " + e);
}

AjaxRequest.prototype.send = function (type, url, handler, postDataType, postData) {
    if (this.request != null) {
        this.request.abort()

        //Параметр dummy для переписывания кэша браузера
        url += "?dummy" + new Date().getTime()

        try {
            this.request.onreadystatechange = handler
            this.request.open(type, url, true)
            if (type.toLowerCase() == "get") {
                //Отправка запроса GET; нет данных
                this.request.send(null)
            } else {
                //Отправка запроса POST; последний аргумент содержит данные
                this.request.setRequestHeader("Content-Type", postDataType)
                this.request.send(postData)
            }
        } catch (e) {
            alert("Ajax error communicating with the server.\n" + "Details: " + e)
        }
    }
}

AjaxRequest.prototype.getReadyState = function () {
    return this.request.readyState;
}

AjaxRequest.prototype.getStatus = function () {
    return this.request.status;
}

AjaxRequest.prototype.getResponseText = function () {
    return this.request.responseText;
}

AjaxRequest.prototype.getResponseXML = function () {
    return this.request.responseXML;
}

function getText(elem) {
    var text = ""
    if (elem) {
        if (elem.childNodes) {
            for (var i = 0; i < elem.childNodes.length; i++) {
                var child = elem.childNodes[i]
                if (child.nodeValue)
                    text += child.nodeValue
                else {
                    if (child.childNodes)
                        if (child.childNodes[0].nodeValue)
                            text += child.childNodes[0].nodeValue
                }
            }
        }
    }
    return text
}

function handleRequest() {
    if (ajaxReq.getReadyState() == 4 && ajaxReq.getStatus() == 200) {
        var xmlData = ajaxReq.getResponseXML().getElementsByTagName("blog")[0]
        Blog.prototype.signature = "by" + getText(xmlData.getElementsByTagName("autor")[0])
        //Массив объектов Blog, содержащий отдельные записи
        var entries = xmlData.getElementsByTagName("entry")
        for (var i = 0; i < entries.length; i++) {
            blog.push(new Blog(getText(entries[i].getElementsByTagName("body")[0]),
                new Date(getText(entries[i].getElementsByTagName("date")[0])),
                getText(entries[i].getElementsByTagName("image")[0])))
        }
        showBlog(5)
    }
}

