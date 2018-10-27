//Listen for the submitting event
document.getElementById('bookform').addEventListener('submit', saveBookmark);

//Saving Bookmark
function saveBookmark(e) {

    //Preventing form from submitting
    e.preventDefault();

    //Getting values from form;
    var siteName = document.getElementById('sitename').value;
    var siteUrl = document.getElementById('siteurl').value;

    //Validation
    if(!validateForm(siteName, siteUrl)) {
        return false;
    }

    //Bookmark Object
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    
    /*
    //Local Storage TEST
        localStorage.setItem('test', 'helloworld!');
        console.log(localStorage.getItem('test'));
        localStorage.removeItem('test');
        console.log(localStorage.getItem('test'));
    */

    if(localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    //Reset form
    document.getElementById('bookform').reset();
    //Re-fetch bookmarks
    fetchBookmark();
}

//Fetching Bookmarks
function fetchBookmark() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Get output id
    var bookmarkResults = document.getElementById('results');

    //Output building
    bookmarkResults.innerHTML = "";
    for(var i=bookmarks.length-1; i >=0; i--) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkResults.innerHTML += '<div class="well">' +
                                        '<h6>' + name +
                                        '   <a class="btn waves-effect waves-light" target=_blank href="'+ url +'">Visit</a> '+
                                        '   <a onclick="deleteBookmark(\''+ url +'\')" class="btn waves-effect waves-light red" href="#"><i class="material-icons right">delete_forever</i>Delete</a></h6> '
                                        '</div>';
    }
    
}

//Delete Bookmark 
function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i=0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Re-fetch bookmarks
    fetchBookmark();
}

function validateForm(siteName, siteUrl) {
    //Validating inputs
    if(!siteName || !siteUrl) {
        alert("Please fill in the form");
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)) {
        alert("Please enter valid URL");
        return false;
    }
    return true;
}