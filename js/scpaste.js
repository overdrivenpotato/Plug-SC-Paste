/*
 * Shows a prompt to allow you to change your currently stored URL. Checks to see if inputted URL is valid.
 */
function updateSC(oldLink)
{
    var newLink = prompt("Input a new Soundcloud link or press cancel", oldLink);
    if(newLink != null)
    {
        if(newLink.indexOf("soundcloud.com/") == -1)
        {
            alert("Invalid Soundcloud Link!");
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

/*
 * Gets called when the soundcloud button is clicked. Pastes 'link' into the chat.
 */
function scButtonClicked(link)
{
    if(typeof link === "undefined")
        link = "Right-click the button to setup! -->";
    document.getElementById("chat-input-field").value += link;
}

/*
 * Gets the locally stored soundcloud URL and passes it to method cont
 */
function getSCLink(cont) {
	chrome.storage.local.get("sclink", function(result){
        cont(result.sclink);
	});
}

init();

/*
 * Sets up the page for the plugin.
 */
function init()
{
    //Make sure page is loaded
	var audience = document.getElementById("audience");
    if (audience != null && audience.firstElementChild != null) {
        //Resize chat to fit button
        document.getElementById("chat-input-field").style.width = "274px";
//        document.getElementsByClassName("chat-input")[0].style.width = "275px";
        document.getElementById("chat-input").style.width = "295px";

        //Soundcloud icon
        var icon = document.createElement("img");
        icon.setAttribute("src", "http://i.imgur.com/4rjCPbW.png");

        //Create icon on page
        var paster = document.createElement("a");
        paster.setAttribute("class", "scpaster-button");      //CSS Class
        paster.setAttribute("href", "#");
        paster.appendChild(icon);
        var referenceNode = document.getElementById("chat-input").children[0];
        referenceNode.parentNode.insertBefore //Insert into the page
            (paster, referenceNode);          //CSS places in correct pos

        //Creates an event listener for right click; provides the option to change the URL
        paster.addEventListener("contextmenu", function(e){
            getSCLink(updateSC);
            e.preventDefault();
        });

        //Creates an event listener for a click; Pastes the stored URL into the chat box.
        paster.addEventListener("click", function() {
            getSCLink(scButtonClicked);
        });
    } else {
        setTimeout(init, 250);
    }
}