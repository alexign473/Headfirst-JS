window.onload = function () {
    document.getElementById("findseats").onclick = findSeats

    document.getElementById("seat0").onclick = function (evt) { showSeatStatus(0) }
    document.getElementById("seat1").onclick = function (evt) { showSeatStatus(1) }
    document.getElementById("seat2").onclick = function (evt) { showSeatStatus(2) }
    document.getElementById("seat3").onclick = function (evt) { showSeatStatus(3) }
    document.getElementById("seat4").onclick = function (evt) { showSeatStatus(4) }
    document.getElementById("seat5").onclick = function (evt) { showSeatStatus(5) }
    document.getElementById("seat6").onclick = function (evt) { showSeatStatus(6) }
    document.getElementById("seat7").onclick = function (evt) { showSeatStatus(7) }
    document.getElementById("seat8").onclick = function (evt) { showSeatStatus(8) }
    document.getElementById("seat9").onclick = function (evt) { showSeatStatus(9) }
    document.getElementById("seat10").onclick = function (evt) { showSeatStatus(10) }
    document.getElementById("seat11").onclick = function (evt) { showSeatStatus(11) }
    document.getElementById("seat12").onclick = function (evt) { showSeatStatus(12) }
    document.getElementById("seat13").onclick = function (evt) { showSeatStatus(13) }
    document.getElementById("seat14").onclick = function (evt) { showSeatStatus(14) }
    document.getElementById("seat15").onclick = function (evt) { showSeatStatus(15) }
    document.getElementById("seat16").onclick = function (evt) { showSeatStatus(16) }
    document.getElementById("seat17").onclick = function (evt) { showSeatStatus(17) }
    document.getElementById("seat18").onclick = function (evt) { showSeatStatus(18) }
    document.getElementById("seat19").onclick = function (evt) { showSeatStatus(19) }
    document.getElementById("seat20").onclick = function (evt) { showSeatStatus(20) }
    document.getElementById("seat21").onclick = function (evt) { showSeatStatus(21) }
    document.getElementById("seat22").onclick = function (evt) { showSeatStatus(22) }
    document.getElementById("seat23").onclick = function (evt) { showSeatStatus(23) }
    document.getElementById("seat24").onclick = function (evt) { showSeatStatus(24) }
    document.getElementById("seat25").onclick = function (evt) { showSeatStatus(25) }
    document.getElementById("seat26").onclick = function (evt) { showSeatStatus(26) }
    document.getElementById("seat27").onclick = function (evt) { showSeatStatus(27) }
    document.getElementById("seat28").onclick = function (evt) { showSeatStatus(28) }
    document.getElementById("seat29").onclick = function (evt) { showSeatStatus(29) }
    document.getElementById("seat30").onclick = function (evt) { showSeatStatus(30) }
    document.getElementById("seat31").onclick = function (evt) { showSeatStatus(31) }
    document.getElementById("seat32").onclick = function (evt) { showSeatStatus(32) }
    document.getElementById("seat33").onclick = function (evt) { showSeatStatus(33) }
    document.getElementById("seat34").onclick = function (evt) { showSeatStatus(34) }
    document.getElementById("seat35").onclick = function (evt) { showSeatStatus(35) }

    initSeats()
}
var seats = [[false, true, false, true, true, true, false, true, false],
[false, true, false, false, true, false, true, true, true],
[true, true, true, true, true, true, false, true, false],
[true, true, true, false, true, false, false, true, false]]
var selSeat = -1
function initSeats() {
    for (var i = 0; i < seats.length; i++)
        for (var j = 0; j < seats[i].length; j++) {
            if (seats[i][j]) {
                setSeat(i * seats[i].length + j, "avail", "Available seat")
            }
            else {
                setSeat(i * seats[i].length + j, "unavail", "Unavailable seat")
            }
        }
}
function findSeats() {
    if (selSeat >= 0) {
        selSeat = -1
        initSeats()
    }

    var i = 0, finished = false
    while ((i < seats.length) && !finished) {
        for (var j = 0; j < seats[i].length; j++) {
            if (seats[i][j] && seats[i][j + 1] && seats[i][j + 2]) {
                selSeat = i * seats[i].length + j
                setSeat(i * seats[i].length + j, "select", "Your seat")
                setSeat(i * seats[i].length + j + 1, "select", "Your seat")
                setSeat(i * seats[i].length + j + 2, "select", "Your seat")
                var accept = confirm("Seat " + (j + 1) + " through " + (j + 3) + " in Row " + (i + 1) + " are available. Accept?")
                if (accept) {
                    finished = true
                    break
                }
                else {
                    selSeat = -1
                    setSeat(i * seats[i].length + j, "avail", "Available seat")
                    setSeat(i * seats[i].length + j + 1, "avail", "Available seat")
                    setSeat(i * seats[i].length + j + 2, "avail", "Available seat")
                }
            }
        }
        i++
    }
}
function setSeat(seatNum, status, description) {
    document.getElementById("seat" + seatNum).src = "seat_" + status + ".png"
    document.getElementById("seat" + seatNum).alt = description
}
function getSeatStatus(seatNum) {
    if (selSeat != -1 && (seatNum == selSeat || seatNum == (selSeat + 1) || seatNum == (selSeat + 2)))
        return "yours"
    else if (seats[Math.floor(seatNum / seats[0].length)][seatNum % seats[0].length])
        return "available"
    else
        return "unavailable"
}
function showSeatStatus(seatNum) {
    alert("This seat is " + getSeatStatus(seatNum) + ".")
}