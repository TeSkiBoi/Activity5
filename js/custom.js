function showAlert() {
    alert("You clicked this");
}

function showAlertYesNo() {
    let userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
        alert("You clicked Yes!");
    } else {
        alert("You clicked No!");
    }
}

function computeSum() {
    let num1 = parseFloat(document.getElementById("number1").value);
    let num2 = parseFloat(document.getElementById("number2").value);
    if (isNaN(num1) || isNaN(num2)) {
        alert("Please enter valid numbers.");
        return;
    }
    let userResponse = confirm("Do you want to continue?");
    if (userResponse) {
        let sum = num1 + num2;
        alert("The sum is: " + sum);

    } else {
        alert("Operation canceled.");
    }

}