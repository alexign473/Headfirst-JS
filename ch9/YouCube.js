function Blog(body, date) {
    this.body = body
    this.date = date

    this.toString = function () {
        return "[" + (this.date.getMonth() + 1) + "/" +
            this.date.getDate() + "/" + this.date.getFullYear() + "] " +
            this.body
    }
    this.toHTML = function (highlight) {
        var blogHTML = ""
        blogHTML += highlight ? "<p style='background-color:#EEEEEE'>" : "<p>"
        blogHTML += "<strong>" + this.date.getDate() + "/" + (this.date.getMonth() + 1) + "/" + this.date.getFullYear() + "</strong><br/>" + this.body + "</p>"
        return blogHTML
    }
    this.containsText = function (text) {
        return (this.body.toLowerCase().indexOf(text.toLowerCase()) != -1)
    }
}

var blog = [new Blog("Got the new cube I ordered..", new Date("08/14/2020")),
new Blog("Solved the new cube but of course..", new Date("08/19/2020")),
new Blog("Managed to get a headache toiling..", new Date("08/16/2020")),
new Blog("Found a 7x7x7 cube for sale online..", new Date("08/21/2020"))]


function showBlog(numEntries) {
    blog.sort(function (blog1, blog2) { return blog2.date - blog1.date })

    if (!numEntries)
        numEntries = blog.length

    var i = 0, blogText = ""
    while (i < blog.length && i < numEntries) {
        blogText += blog[i].toHTML(i % 2 == 0)
        i++
    }
    document.getElementById("blog").innerHTML = blogText
}

function searchBlog() {
    var searchText = document.getElementById("searchtext").value
    for (var i = 0; i < blog.length; i++) {
        if (blog[i].containsText(searchText)) {
            alert(blog[i])
            break
        }
    }
    if (i == blog.length)
        alert("Sorry, not found")
}

function randomBlog() {
    var i = Math.floor(Math.random() * blog.length)
    alert(blog[i])
}