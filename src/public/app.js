new Vue({
    el: '#app',
    data() {
        return {
            url: '',
            error: null,
            result: null,
            statusCode: null,
            shorturl: '',
        }
    },
    methods: {
        log(text) {
            console.log(text);
        },
        onSubmit() {
            this.error = null;
            this.result = null;
            this.statusCode = null;
            this.shorturl = '';

            if (this.url.trim() == "") {
                this.setErrormessage("url input can't be empty.");
                document.getElementById("formGroupExampleInput2").focus();
                return;
            }

            this.log("[RN] submitForm was clicked.");
            fetch(window.location + "api/v1/urls", {
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
                        console.log("[RN] running in 500 condition");
                        this.setErrormessage("Sorry server is closing already.");
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    if (data) {
                        console.log(`[DEBUG] ${data}`);
                        this.result = data;
                        this.shorturl = window.location + data.slug;
                        this.log(`[RN] response data ${data}`);
                    }

                    if (this.statusCode == 429) {
                        console.log(`[RN] running in 429 condition`);
                        this.setErrormessage("Too many accounts created from this IP, please try again after an 2 minutes.");
                    }
                })
                .catch(error => {
                    this.log(error);
                    this.error = error;
                });
        },
        showErrormessage() {
            console.log("[IV] dispatching fade-done event hide.");
            this.error = null;
        },
        setErrormessage(err) {
            this.error = err;
            var vm = this;
            setTimeout(function() {
                vm.showErrormessage();
            }, 3000);
        },
    },
    created() {
        this.log("[VM] starting project.");
    },
    mounted() {
        document.getElementById("formGroupExampleInput2").focus();
    },
});