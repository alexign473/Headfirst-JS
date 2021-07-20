var blog = [new Blog("Got the new cube I ordered..", new Date("08/14/2020")),
new Blog("Solved the new cube but of course..", new Date("08/19/2020")),
new Blog("Managed to get a headache toiling..", new Date("08/16/2020")),
new Blog("Found a 7x7x7 cube for sale online..", new Date("08/21/2020"), "cube777.png")]

Date.prototype.shortFormat = function () {
    return this.getDate() + "/" + (this.getMonth() + 1) + "/" + this.getFullYear()
}

function Blog(body, date, image) {
    this.body = body
    this.date = date
    this.image = image

    Blog.prototype.toString = function () {
        return "[" + this.date.shortFormat() + "] " +
            this.body
    }
    Blog.prototype.toHTML = function (highlight) {
        var blogHTML = ""
        blogHTML += highlight ? "<p style='background-color:#EEEEEE'>" : "<p>"
        if (this.image)
            blogHTML += "<strong>" + this.date.shortFormat() + "</strong><br/><img src='" + this.image + "'/>" + this.body + "<br/><em>" + this.signature + "</em></p>"
        else
            blogHTML += "<strong>" + this.date.shortFormat() + "</strong><br/>" + this.body + "<br/><em>" + this.signature + "</em></p>"
        return blogHTML
    }
    Blog.prototype.containsText = function (text) {
        return (this.body.toLowerCase().indexOf(text.toLowerCase()) != -1)
    }
    Blog.prototype.signature = "Puzzler Ruby"

    Blog.blogSorter = function (blog1, blog2) {
        return blog2.date - blog1.date
    }
}

function showBlog(numEntries) {

    blog.sort(Blog.blogSorter)

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