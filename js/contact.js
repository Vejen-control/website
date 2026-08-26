const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyNy6VeUAq31LhY22r7Pn6xDIFAHQ8g4VoWrGrV_xewR0JDe6VHN2ikK9WYxFU1ECyH/exec";

const form = document.getElementById("contact-form");
const status = document.getElementById("status");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    status.innerHTML =
    "<p style='color:#ffd700'>Sending your enquiry...</p>";

    const data = {

        name: document.getElementById("name").value,

        company: document.getElementById("company").value,

        email: document.getElementById("email").value,

        subject: document.getElementById("subject").value,

        message: document.getElementById("message").value

    };

    try{

        const response = await fetch(SCRIPT_URL, {
            method:"POST",
            headers:{
        "Content-Type":"text/plain;charset=utf-8"
        },
        body:JSON.stringify(data)
    });

        const result = await response.json();

        if(result.success){

            status.innerHTML =
            `
            <div style="
                margin-top:25px;
                padding:25px;
                border-radius:12px;
                background:rgba(0,0,0,.55);
                border:1px solid #c8a23d;
                color:white;
                text-align:center;
            ">

                <h2 style="color:#FFD700;">
                    Thank you.
                </h2>

                <p>Your enquiry has been received successfully.</p>

                <p>
                    Reference Number
                </p>

                <h3 style="color:#FFD700">
                    ${result.reference}
                </h3>

                <p>
                    We normally reply within 24 hours.
                </p>

            </div>
            `;

            form.reset();

        }

        else{

            status.innerHTML =
            "<p style='color:red'>Error: " + result.error + "</p>";

        }

    }

    catch(error){

        console.log(error);

        status.innerHTML =
        "<p style='color:red'>Connection error.</p>";

    }

});
