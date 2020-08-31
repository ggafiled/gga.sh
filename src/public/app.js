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
                    if (this.statusCode != 200) {
                        this.error = "Sorry server is closing already.";
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    this.result = data;
                    this.log(`[RN] response data ${data}`);
                })
                .catch(error => {
                    this.log(error.message.toString());
                    this.error = error.message.toString();
                });
        },
    },
    created() {
        this.log("[VM] starting project.");
    }
});