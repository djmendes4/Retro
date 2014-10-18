var formData = [];

formData[0] =   [["Add Item"],
                ["Item Name:","text"],
                [["Reagents","button"]["Item Name","text"],["Quantity","number"]],
                [["Requirements","button"],["Item Name","text"],["Quantity","number"]]];

formData[1] =   [["Add Worker"],
                ["Worker Name:",false,"text"],
                ["Workstation:",false,"text"],
                ["Hiring Fee:",false,"number"]];

formData[2] =   [["Add Resource"],
                ["Resource Name:",false,"text"],
                ["Max Level:",false,"number"]];

window.onload = function() {
    chooseFormType.onchange = function() {
        //alert("The form type has been changed.");

        clearForm();
        writeFormHeader();
	}

	$('#formContainer input').on('focus', function() {
		//console.log(document.activeElement);
		//console.log(document.activeElement.getAttribute("default"));

		if(document.activeElement.value === document.activeElement.getAttribute("default")) {
			document.activeElement.value = "";
			$(document.activeElement).toggleClass('opaque');
		}
	});

	$('#formContainer input').on('blur', function() {
		if(document.activeElement.value === "") {
			document.activeElement.value = document.activeElement.getAttribute("default");
			$(document.activeElement).toggleClass('opaque');
		}
	});

//	test.onfocus = function() {
//		if(document.getElementById("test").value === "Item Name") {
//			document.getElementById("test").value = "";
//			document.getElementById("test").style.color = "rgba(0,0,0,1.0)";
//		}
//	}
//	test.onblur = function() {
//		if(document.getElementById("test").value === "") {
//			document.getElementById("test").value = "Item Name";
//			document.getElementById("test").style.color = "rgba(0,0,0,0.5)";
//		} else {
//
//		}
//	}
}

var writeFormHeader = function() {
    var newHeader;

    newHeader = document.createElement("header");
    newHeader.setAttribute("id","formName");
    newHeader.appendChild(document.createTextNode(formData[chooseFormType.value][0][0]));

    document.getElementById("formContainer").appendChild(newHeader);

    writeFormSection();
}

var writeFormSection = function() {
    var x = 0, y = 0, z = 0;
    var newSection, newInput;

    console.log(formData);
}

var clearForm = function() {
    document.getElementById("formContainer").innerHTML = "";
}

var onFocus = function() {
	//console.log("Success!");

}

var onBlur = function(id) {

}
