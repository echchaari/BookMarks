
document.querySelector("#myForm").addEventListener("submit", savaBookmark);


document.querySelector("#filter").addEventListener("keyup", filterBookmarks);


function filterBookmarks() {
    
    var filterValue = document.querySelector("#filter").value.toUpperCase();
    
    var bookmarkNames = document.querySelectorAll(".name");
    

    for (var i = 0; i < bookmarkNames.length; i++) {
        var name = bookmarkNames[i].textContent.toUpperCase();
        if (name.includes(filterValue)) {
            bookmarkNames[i].parentElement.style.display = "block";
        } else {
            bookmarkNames[i].parentElement.style.display = "none";
        }
    }
}


function savaBookmark(e) {
    e.preventDefault();
    
    var siteName = document.querySelector("#siteName").value;
    
    var siteUrl = document.getElementById("siteUrl").value;
    
    var bookmark = {
        name: siteName,
        url: siteUrl
    };

    if (siteName === "" || siteUrl === "") {
        alert("Site name and url cannot be empty");
        return false;
    }

  
    if (localStorage.getItem("bookmarks") === null) {
        
        var bookmarks = [];
        
        bookmarks.push(bookmark);
        
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {
        
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        
        bookmarks.push(bookmark);
        
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    
    document.querySelector("#myForm").reset();

    fetchBookmarks();
}

function fetchBookmarks() {
    
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    
    var bookmarksResult = document.querySelector("#bookmarksResult");

    

    
    bookmarksResult.innerHTML = "";

    
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        
        var div = document.createElement("div");
        
        var h3 = document.createElement("h3");
        h3.textContent = name;
        h3.className = "name";
        
        var a = document.createElement("a");
        a.href = url;
        a.className = "btn btn-success";
        a.textContent = "Visit";

        
        var button = document.createElement("button");
        button.className = "btn btn-danger";
        button.textContent = "Delete";
        button.addEventListener("click", function(e) {
            var siteName = e.target.parentElement.children[0].textContent;
            deleteBookmark(siteName);
        });
        div.appendChild(h3);
        div.appendChild(a);
        div.appendChild(button);
        bookmarksResult.append(div);
    }
}

function deleteBookmark(name) {
    
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    
    for (var i = 0; i < bookmarks.length; i++) {
        
        if (bookmarks[i].name === name) {
            bookmarks.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    fetchBookmarks();
}