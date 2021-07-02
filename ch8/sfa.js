var curScene = 0

function replaceNodeText(id, newText) {
    var node = document.getElementById(id)
    while (node.firstChild)
        node.removeChild(node.firstChild)
    node.appendChild(document.createTextNode(newText))
}

function changeScene(decision) {
    var message = ""

    switch (curScene) {
        case 0:
            curScene = 1
            message = "Your journey begins at a fork in the end."
            decision1 = "Take the Path"
            decision2 = "Take the Bridge"
            document.getElementById("decision2").style.visibility = "visible"
            break;
        case 1:
            if (decision == 1) {
                curScene = 2
                message = "You have arrived at cute little house in the woods."
                decision1 = "Walk around Back"
                decision2 = "Knock on Door"
            }
            else {
                curScene = 3
                message = "You are standing on the bridge overlooking a peaceful stream."
                decision1 = "Walk across bridge"
                decision2 = "Gaze into stream"
            }
            break;
        case 2:
            if (decision == 1) {
                curScene = 4
                message = "Peeking through the window, you see a witch inside the house."
                decision1 = "Sneak by Window"
                decision2 = "Wave at Witch"
            }
            else {
                curScene = 5
                message = "Sorry, a witch lives in the house and you just became part of her stew."
                decision1 = "Start Over"
                decision2 = ""
            }
            break;
        case 3:
            if (decision == 1) {
                curScene = 6
                message = "Sorry, a troll lives on the other side of the bridge and you just became his lunch."
                decision1 = "Start Over"
                decision2 = ""
                document.getElementById("decision2").style.visibility = "hidden"
            }
            else {
                curScene = 7
                message = "Your stare is interrupted by the arrival of a huge troll."
                decision1 = "Say Hello to Troll"
                decision2 = "Jump into Stream"
            }
            break;
        case 4:
            if (decision == 1) {
                curScene = 8
                message = "To be continued."
                decision1 = "Start Over"
                decision2 = ""
                document.getElementById("decision2").style.visibility = "hidden"
            }
            else {
                curScene = 5
                message = "Sorry, you became part of the witch's stew."
                decision1 = "Start Over"
                decision2 = ""
                document.getElementById("decision2").style.visibility = "hidden"
            }
            break;
        case 5:
            curScene = 0
            decision1 = "Start Game"
            decision2 = ""
            break
        case 6:
            curScene = 0
            decision1 = "Start Game"
            decision2 = ""
            break
        case 7:
            if (decision == 1) {
                curScene = 6
                message = "Sorry,you became the troll's tasty lunch."
                decision1 = "Start Over"
                decision2 = ""
                document.getElementById("decision2").style.visibility = "hidden"
            }
            else {
                curScene = 9
                message = "To be continued."
                decision1 = "Start Over"
                decision2 = ""
                document.getElementById("decision2").style.visibility = "hidden"
                break
            }
        case 8:
            curScene = 0
            decision1 = "Start Game"
            decision2 = ""
            break
        case 9:
            curScene = 0
            decision1 = "Start Game"
            decision2 = ""
            break
    }

    document.getElementById("sceneimg").src = "scene" + curScene + ".png"
    replaceNodeText("scenetext", message)
    replaceNodeText("decision1", decision1)
    replaceNodeText("decision2", decision2)

    var history = document.getElementById("history")
    if (curScene != 0) {
        var decisionElem = document.createElement("p")
        decisionElem.appendChild(document.createTextNode("decision" + decision + " -> Scene" + curScene + " : " + message))
        history.appendChild(decisionElem)
    } else {
        while (history.firstChild)
            history.removeChild(history.firstChild)
    }
}