<template>
    <div id="show-blogs">
        <h1>博客总览</h1>
        <input type="text" v-model="search" placeholder="Search">
        <div class="single-blog"
         v-for="blog in filteredBlogs"
         :key="blog.id"
        >
            <router-link :to="'/blog/'+blog.id">
                <h2 v-rainbow>{{blog.title}}</h2>
            </router-link>
            <article>{{blog.content | snippet}}</article>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'show-blogs',
    data(){
        return{
            blogs: [],
            search: ""
        }
    },
    created(){
        this.$http.get('https://vuedemo-903a3-default-rtdb.asia-southeast1.firebasedatabase.app/post.json')
        .then(function(data){
            return data.json();
            // console.log(data);
            // this.blogs = data.body.slice(0, 10);
            // console.log(this.blogs);
        }).then(function(data){
            let blogsArray = [];
            for(let key in data){
                data[key].id = key;
                blogsArray.push(data[key]);
            }
            this.blogs = blogsArray;
        })
    },
    computed:{
        filteredBlogs: function(){
            return this.blogs.filter((blog) => {
                return blog.title.match(this.search);
            })
        }
    },
    filters:{
        snippet(value){
            return value.slice(0, 100)+"...";
        }
    },
    directives:{
        'rainbow':{
            bind(el){
                el.style.color = "#" + Math.random().toString(16).slice(2, 8);
            }
        }
    }
}
</script>

<style>
    #show-blogs{
        max-width: 800px;
        margin: 0 auto;
    }

    .single-blog{
        padding: 20px;
        margin: 20px 0px;
        box-sizing: border-box;
        background: #eee;
        border: 1px dotted #aaa;
    }

    #show-blogs a{
        color: #444;
        text-decoration: none;
    }

    input[type="text"]{
        width: 100%;
        box-sizing: border-box;
        padding: 8px;
    }
</style>