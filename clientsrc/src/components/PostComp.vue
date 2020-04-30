<template>
    <div class="postComp">

<div class="card" style="width: 18rem;">
  <img class="card-img-top" v-if='postData.picture' :src='postData.picture'>
  <div class="card-body">
    <h5 class="card-title">{{postData.title}}</h5>
        <p v-show='displayContent' class="card-text">{{postData.content}}</p>
    <div class='card-footer'>
        <a href="#" class="btn btn-primary" v-show='showButton' @click='chooseSupport()'>support</a>
    <a href="#" class="btn btn-primary" v-show='showButton' @click='chooseDisregard()'>disregard</a>
    <Results v-show='!showButton' :postData='postData'/>
    </div>
  </div>
</div>

    </div>
</template>


<script>
export default {
    name: 'postComp',
    props: ['postData'],
    data(){
        return {
            displayContent: false,
            showButton: true,

        }
    },
    computed:{},
    methods:{
        chooseSupport() {
            if (!this.$auth.isAuthenticated) {
            //modal to log in or sign up
            }
            showButton = false

        },

        async chooseDisregard() {
            if (!this.$auth.isAuthenticated) {
            //let conditional = postData.id    
            //await login()
            //.then $router.push/post/id
            //resume logged in method
            }
            showButton = false

        }
    },
    components:{}
}
</script>


<style scoped>

</style>