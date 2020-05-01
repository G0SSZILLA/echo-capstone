<template>
    <div class="createCommentComp">
<footer class="page-footer bg-info fixed-bottom">
    <div class="row p-1">
<div class="col-3">
    <button class="btn border bg-warning mt-2 ml-1">
        Back
    </button>
</div>
<div class="col-6 p-0">
  <div class="md-form pink-textarea active-pink-textarea-2">
  <textarea id="form17" class="md-textarea form-control" placeholder="Comment here..." rows="2"></textarea>
</div>

</div>
<div class="col-3">
    <button class="btn border bg-warning mt-2 mr-1">
        Send
    </button>
</div>

    </div>
</footer>
    </div>
</template>


<script>
export default {
    name: 'createCommentComp',
    data(){
        return {}
    },
    computed:{},
    methods:{},
    components:{}
}
</script>


<style scoped>
.active-pink-textarea-2 textarea.md-textarea {
  border-bottom: 1px solid #f48fb1;
  box-shadow: 0 1px 0 0 #f48fb1;
}
.active-pink-textarea-2.md-form label.active {
  color: #f48fb1;
}
.active-pink-textarea-2.md-form label {
  color: #f48fb1;
}
.active-pink-textarea-2.md-form textarea.md-textarea:focus:not([readonly])+label {
  color: #f48fb1;
}

</style>