function updateSC(oldLink)
{
    var newLink = prompt("Input a new Soundcloud link or press cancel", oldLink);
    if(newLink != null)
    {
        if(newLink.indexOf("soundcloud.com/") == -1)
        {
            alert("Invalid Soundcloud Link!");
            return;
        }
        else
        {
            if(newLink.indexOf("http://") == -1 && newLink.indexOf("https://") == -1)
            {
                newLink = "http://" + newLink;
            }
            chrome.storage.local.set({"sclink":newLink}, function(){
                getSCLink(updateSCLink);
            });
        }
    }
}

function scButtonClicked(link)
{
    if(typeof link === "undefined")
        link = "Use button on the right to setup!";
    document.getElementById("chat-input-field").value += link;
}

function getSCLink(cont) {
	chrome.storage.local.get("sclink", function(result){
        cont(result.sclink);
	});
}

init();
function init()
{
    //Make sure page is loaded
	var audience = document.getElementById("audience");
    if (audience != null && audience.firstElementChild != null) {
        //Resize chat to fit button
        document.getElementById("chat-input-field").style.width = "274px";
        document.getElementsByClassName("chat-input")[0].style.width = "275px";

        //Soundcloud icon
        var icon = document.createElement("img");
        icon.setAttribute("src", "https://a2.sndcdn.com/assets/images/sc-icons/favicon-154f6af5.ico");

        //Create icon on page
        var paster = document.createElement("a");
        paster.setAttribute("class", "scpaster-button");      //CSS Class
        paster.setAttribute("href", "#");
        paster.appendChild(icon);
        document.getElementById("button-chat-expand").parentNode.insertBefore //Insert into the page
            (paster, document.getElementById("button-chat-expand"));          //CSS places in correct pos

        paster.addEventListener("click", function() {
            getSCLink(scButtonClicked);
        });

        //Resizes button with chat
        document.getElementById("button-chat-expand").setAttribute("onClick",
            "document.getElementsByClassName(\"scpaster-button\")[0].style.top=\"557px\"");
        document.getElementById("button-chat-collapse").setAttribute("onClick",
            "document.getElementsByClassName(\"scpaster-button\")[0].style.top=\"258px\"");

        //Change SC Button
        var updateButton = document.createElement("button");
        updateButton.innerHTML = "Change SC Link";
        updateButton.setAttribute("name", "button");
        updateButton.setAttribute("type", "button");
        updateButton.setAttribute("class", "scpaster-change-link");

        document.getElementById("chat").appendChild(updateButton);

        updateButton.addEventListener("click", function () {
            getSCLink(updateSC);
        });
    } else {
        setTimeout(init, 250);
    }
}