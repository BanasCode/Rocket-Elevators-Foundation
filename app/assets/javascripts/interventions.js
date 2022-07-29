document.addEventListener('DOMContentLoaded', function(e) {

    const choice = document.getElementById("selectCustomers");
    choice.addEventListener("change", (e) => {
        if (e.target.value) {
            resetVal();
            document.getElementById("selectBuilding").style.display = "";
        }
    })

    const choice2 = document.getElementById("selectBuilding");
    choice2.addEventListener("change", (e) => {
        if (e.target.value) {
            resetVal();
            document.getElementById("selectBattery").style.display = "";
        }
    })

    const choice3 = document.getElementById("selectBattery");
    choice3.addEventListener("change", (e) => {
        if (e.target.value) {
            resetVal();
            document.getElementById("selectColumn").style.display = "";
        }
    })

    const choice4 = document.getElementById("selectColumn");
    choice4.addEventListener("change", (e) => {
        if (e.target.value) {
            resetVal();
            document.getElementById("selectLift").style.display = "";
        }
    })







    function resetVal() {
        document.getElementById("selectBuilding").value = "";
        document.getElementById("selectBattery").value = "";
        document.getElementById("selectColumn").value = "";
        document.getElementById("selectLift").value = "";
    }

    function hideAll() {
        document.getElementById("selectBuilding").style.display = "none";
        document.getElementById("selectBattery").style.display = "none";
        document.getElementById("selectColumn").style.display = "none";
        document.getElementById("selectLift").style.display = "none";
    }

})