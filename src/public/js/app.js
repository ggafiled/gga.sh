window.onload = function() {
    new Vue({
        el: '#app',
        data() {
            return {
                url: '',
                error: null,
                result: null,
                statusCode: null,
                shorturl: '',
                isLoading: false,
            }
        },
        methods: {
            log(text) {
                try {
                    console.log(text);
                } catch (e) {
                    this.setErrormessage(e);
                }
            },
            onPostData() {

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
                        if (!response.ok) {
                            console.log("[RN] running in  response not ok.");
                            this.setErrormessage(response.statusText);
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.error) {
                            throw new Error(data.error);
                        }
                        this.result = data;
                        this.shorturl = window.location + data.slug;
                    })
                    .catch(error => {
                        this.log(error);
                        this.setErrormessage(error);
                    });
            },
            onSubmit() {
                var vm = this;
                if (this.url.trim() == "") {
                    this.setErrormessage("url input can't be empty.");
                    document.getElementById("longurl").focus();
                    throw new Error("url input can't be empty.");
                } else {
                    this.error = null;
                    this.result = null;
                    this.statusCode = null;
                    this.shorturl = '';
                    this.isLoading = true;
                    setTimeout(function() {
                        vm.onPostData();
                    }, 2000);
                }
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
                }, 5000);
            },
            checkCookie_eu() {

                var consent = this.getCookie_eu("cookies_consent");

                if (consent == null || consent == "" || consent == undefined) {
                    $('#cookie-policy').show("slow");
                } else {
                    $('#cookie-policy').hide();
                }

            },
            setCookie_eu(c_name, value, exdays) {
                this.log('[RN] setCookie_eu');
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + exdays);
                var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
                document.cookie = c_name + "=" + c_value + "; path=/";
                $('#cookie-policy').hide("slow");
            },
            getCookie_eu(c_name) {
                var i, x, y, ARRcookies = document.cookie.split(";");
                for (i = 0; i < ARRcookies.length; i++) {
                    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                    x = x.replace(/^\s+|\s+$/g, "");
                    if (x == c_name) {
                        return unescape(y);
                    }
                }
            },
        },
        created() {
            this.log("[VM] starting project.");
            this.checkCookie_eu();
        },
        mounted() {},
        watch: {
            isLoading: function(val) {
                if (val) {
                    JsLoadingOverlay.show({
                        'spinnerIcon': 'pacman',
                        'overlayOpacity': 0.8,
                        'overlayBackgroundColor': '#9e9e9e',
                        'spinnerColor': '#424242',
                        'spinnerSize': '2x',

                    });
                    var vm = this;
                    setTimeout(function() {
                        vm.isLoading = false;
                        JsLoadingOverlay.hide();
                    }, 2000);
                }
            }
        },
        computed: {
            checkCookieisEmpty: function() {
                return this.checkCookie_eu();
            }
        }
    });
};