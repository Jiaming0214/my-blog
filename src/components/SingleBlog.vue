<template>
    <div id="single-blog">
        <h1>{{blog.title}}</h1>
        <article>{{blog.content}}</article>
        <p>作者：{{blog.author}}</p>
        <p>分类：</p>
        <ul>
            <li
             v-for="category in blog.categories"
             :key="category.id"
             >
                {{category}}
            </li>
        </ul>
        <button @click="deleteSingleBlog()">删除</button>
        <router-link :to="'/edit/' + id">编辑</router-link>
    </div>
</template>

<script>
export default {
    name: "SingleBlog",
    data(){
        return{
            id: this.$route.params.id,
            blog: {}
        }
    },
    created(){
        this.$http.get('https://vuedemo-903a3-default-rtdb.asia-southeast1.firebasedatabase.app/post/'+this.id+".json")
            .then(function(data){
                // console.log(data);
                return data.json();
            }).then(function(data){
                this.blog = data;
            })
    },
    methods:{
        deleteSingleBlog(){
            this.$http.delete('https://vuedemo-903a3-default-rtdb.asia-southeast1.firebasedatabase.app/post/'+this.id+".json")
                .then(response=>{
                    console.log(response);
                    this.$router.push({path:"/"});
                })
        }
    }    
}
</script>

<style scoped>
    #single-blog{
        max-width: 960px;
        margin: 0 auto;
        padding: 20px;
        background: #eee;
        border: 1px dotted #aaa;
    }

    a{
        display: inline-block;
        margin: 20px 0px;
        background: crimson;
        color: #fff;
        border: 0px;
        padding: 8px;
        border-radius: 4px;
        font-size: 18px;
        cursor: pointer;
        text-decoration: none;
    }

    button{
        display: inline-block;
        margin: 20px;
        background: #ddd;
        color: #000;
        border: 0px;
        padding: 8px;
        border-radius: 4px;
        font-size: 18px;
        cursor: pointer;
    }

    button:hover{
        background: #000;
        color: #fff;
    }

    a:hover{
        background: #fff;
        color: crimson;
    }
</style>