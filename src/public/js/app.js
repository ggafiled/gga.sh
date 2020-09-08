window.onload = function() {
    new Vue({
        el: '#app',
        data() {
            return {
                url: '',
                error: null,
                result: {},
                statusCode: null,
                shorturl: '',
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
                $("#resultpanel").hide();
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
                        this.log(JSON.stringify(psl.parse(String(window.location))));
                        this.shorturl = psl.parse(String(window.location)).domain + "/" + data.slug
                        this.log("shortener url: " + this.shorturl);
                        document.getElementById("inputlongurl").value = this.shorturl;
                        $("#resultpanel").show("slow");
                    })
                    .catch(error => {
                        this.log(error);
                        this.setErrormessage(error);
                        $("#resultpanel").hide("slow");
                    });
            },
            onSubmit() {
                console.log("[RN] onSubmit.");
                var vm = this;
                vm.url = document.getElementById("inputlongurl").value;
                this.log(document.getElementById("inputlongurl").value);
                if (vm.url.trim() == "") {
                    this.setErrormessage("url input can't be empty.");
                    document.getElementById("inputlongurl").focus();
                    throw new Error("url input can't be empty.");
                }

                if (!this.isUrlValid(vm.url)) {
                    this.log('[RN] url is invalid pattern.');
                    this.setErrormessage("url is invalid pattern.");
                    document.getElementById("inputlongurl").focus();
                    throw new Error("url is invalid pattern.");
                }

                this.clearValue();
                setTimeout(function() {
                    vm.onPostData();
                }, 1000);

            },
            clearValue() {
                this.error = null;
                this.result = null;
                this.statusCode = null;
                this.shorturl = '';
            },
            showErrormessage() {
                console.log("[IV] dispatching fade-done event hide.");
                this.error = null;
                $('#error').hide("slow");
            },
            setErrormessage(err) {
                $('#error').show("slow");
                this.error = err;
                var vm = this;
                setTimeout(function() {
                    vm.showErrormessage();
                }, 3000);
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
                gsap.to('#cookie-policy', {
                    autoAlpha: 0
                });
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
            copyToClipboard() {
                this.log('[RN] copyToClipboard copy shortener url already.');
                let copyToClipboard = document.querySelector('#inputlongurl');
                copyToClipboard.setAttribute('type', 'text');
                copyToClipboard.select()

                try {
                    var successful = document.execCommand('copy');
                } catch (err) {
                    alert("Oops, unable to copy");
                }

                /* unselect the range */
                this.shorturl = '';
                $("#resultpanel").hide("slow");
                this.clearValue();
                window.getSelection().removeAllRanges();
            },
            isUrlValid(userInput) {
                var regexQuery = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                return regexQuery.test(userInput);
            },
        },
        created() {
            this.log("[VM] starting project.");
            this.checkCookie_eu();
        },
        mounted() {
            // document.querySelector("#longurl").focus();
        },
        watch: {},
        computed: {
            checkCookieisEmpty: function() {
                return this.checkCookie_eu();
            },
            canShowIfHasData: function() {
                if (this.shorturl == null || this.shorturl.trim() == '' || this.shorturl == undefined) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    });
};