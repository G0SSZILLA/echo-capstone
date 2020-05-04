<template>
    <div class="commentComp">
        <div class="row justify-content-center border-bottom py-2">
            <div class="col-10">
                <h5>
                    {{commentData.content}}
                </h5>
                <p style="font-size: 13px">
                   -  {{commentData.creator.name}}
                </p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'commentComp',
    props: ['commentData'],
    data(){
        return {}
    },
    computed:{},
    methods:{
        // TODO delete and edit?
    },
    components:{}
}
</script>


<style scoped>

</style>