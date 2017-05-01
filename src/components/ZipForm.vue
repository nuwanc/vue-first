<template>
    <div class="zipForm">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="lead-form">
                        <h1 class="text-center">Fill Out This Form</h1>
                        <hr />
                        <div class="row">
                            <div class="col-md-6">
                                <input type="text" class="form-control" placeholder="Starting Zip" v-model="startingZip">
                                <span class="city-span">{{startingCity}}</span>
                            </div>
                            <div class="col-md-6">
                                <input type="text" class="form-control" placeholder="Ending Zip" v-model="endingZip">
                                <span class="city-span">{{endingCity}}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <button class="btn btn-primary btn-block" id="submit-form">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import axios from 'axios'

    export default {
        name: 'zipForm',
        data() {
            return {
                startingZip: '',
                startingCity: '',
                endingZip: '',
                endingCity: ''
            }
        },
        watch: {
            startingZip: function () {
                this.startingCity = '';
                if (this.startingZip.length == 5) {
                    _.debounce(this.lookupStartingZip(), 500);
                }
            },
            endingZip: function () {
                this.endingCity = '';
                if (this.endingZip.length == 5) {
                    _.debounce(this.lookupEndingZip(), 500);
                }
            }
        },
        methods: {
            lookupStartingZip: function () {
                this.startingCity = 'Searching...';
                axios.get('http://ziptasticapi.com/' + this.startingZip)
                    .then((response) => {
                        this.startingCity = response.data.city + ', ' + response.data.state
                    })
                    .catch((response) => {
                        this.startingCity = 'Invalid ZipCode';
                    })
            },
            lookupEndingZip: function () {
                this.endingCity = 'Searching...';
                axios.get('http://ziptasticapi.com/' + this.endingZip)
                    .then((response) => {
                        this.endingCity = response.data.city + ', ' + response.data.state
                    })
                    .catch((response) => {
                        this.endingCity = 'Invalid ZipCode';
                    })
            }
        }
    }

</script>

<style>
    #app {
        height: 100vh;
        width: 100vw;
        background-color: red;
        background: url("https://source.unsplash.com/category/nature/1920x1080") no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
    
    #submit-form {
        margin-top: 40px;
    }
    
    .lead-form {
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 5px;
        padding: 10px 50px 30px 50px;
        margin-top: 100px;
    }
    
    span.city-span {
        color: (#444);
        text-transform: uppercase;
        margin-left: 5px;
        margin-top: 10px;
    }
    
    .form-control {
        margin-bottom: 3px;
    }
</style>