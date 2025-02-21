const checkConstraint = (constraints, itemToCheck) => {
    const constraint = new RegExp(constraints[itemToCheck.id]);
    return constraint.test(itemToCheck.value)
}

const constraints = {
    email: ".+@.+\\.[a-z]+$",
    country: "Italy|France|Germany",
    postalCode: "[0-9]{5}",
    password: "[A-Za-z0-9]{3,}",
    passwordConfirm: ".{3,}",
}

function checkCountry () {
    console.log(checkConstraint(constraints, country));
}
const country = document.getElementById("country");
