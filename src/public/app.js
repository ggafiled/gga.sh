var vm = new Vue({
    el: '#app',
    data() {
        return {
            url: '',
            error: null,
            result: null,
            statusCode: null,
        }
    },
    methods: {
        log(text) {
            console.log(text);
        },
        onSubmit() {
            this.error = null;
            if (this.url.trim() == "") {
                this.error = "url input can't be empty.";
                document.getElementById("formGroupExampleInput2").focus();
                return;
            }

            this.log("[RN] submitForm was clicked.");
            fetch("http://localhost:5000/api/v1/urls", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        url: this.url
                    })
                })
                .then(response => {
                    this.log(`[RN] response status code is ${response.status} `);
                    this.statusCode = response.status;
                    if (this.statusCode >= 500 && this.statusCode <= 599) {
                        this.error = "Sorry server is closing already.";
                        return;
                    } else if (this.statusCode == 429) {
                        this.error = "Too many accounts created from this IP, please try again after an 2 minutes.";
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    this.result = data;
                    this.log(`[RN] response data ${data}`);
                })
                .catch(error => {
                    this.log(error);
                    this.error = error;
                });
        },
    },
    created() {
        this.log("[VM] starting project.");
    }
});