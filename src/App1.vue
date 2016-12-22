<template>
    <div id="note" v-on:mousedown="creatElement">
        <p style ="text-align:center;">点击空白处新增便签</p>
    </div>
</template>

<script>

export default {
    name: 'app',
    data:function(){
        return {
            noteCount:1,
            element:"<div class='note_heading'></div><textarea>点击此处编辑</textarea><button class='btn btn-default'>提交日记</button><div class='deletes'>x</div>",
            saveDatas:[{
                "count":2,
                "content":"第二条笔记",
                "left":"350px",
                "top":"400px"
            },{
                "count":3,
                "content":"第三条笔记",
                "left":"550px",
                "top":"60px"
            },{
                "count":4,
                "content":"第四条笔记",
                "left":"100px",
                "top":"200px"
            }]
        }
    },
    methods:{
        creatElement:function(event){
            
            if (localStorage.getItem("noteCount")){
               localStorage["noteCount"] = localStorage.getItem("noteCount")
            }else {
               localStorage["noteCount"] = 1;
            }
            var obj = document.getElementById("note");
            var el = document.createElement("div"),
                n = 0,
                left = event.clientX,
                top = event.clientY,
                style = "position:fixed;left:"+left+"px;top:"+top+"px";

            el.setAttribute("class","note");
            el.setAttribute("style",style);
            el.innerHTML = this.element;
            this.noteCount = localStorage.getItem("noteCount")
            el.getElementsByClassName("note_heading")[0].innerHTML = 'newNote'+this.noteCount; 
            localStorage["noteCount"] = +localStorage.getItem("noteCount")+1;
            
            obj.appendChild(el);
            
            this.bind(el);
        },
        bind:function(el){
            var _this = this;

            el.addEventListener("mousedown",function(event){
                event.stopPropagation();
            },false)

            el.getElementsByClassName("deletes")[0].addEventListener("click",function(){
                this.parentNode.parentNode.removeChild(this.parentNode);
            },false); 

            el.addEventListener('mousedown',function(event){
                var _this = this,
                    clickX = event.offsetX,
                    clickY = event.offsetY;

                var move = function(event){

                    var left = event.clientX-clickX,
                        top = event.clientY-clickY;
                    _this.style.left = left+"px";
                    _this.style.top = top+"px";
                }
                document.addEventListener("mousemove",move,false);
                document.addEventListener("mouseup",function(){
                    this.removeEventListener("mousemove",move,false);
                },false);
            },false)
            el.getElementsByTagName("textarea")[0].onmousedown = function(event){
                event.stopPropagation();
            }
            el.getElementsByTagName("button")[0].onmousedown = function(event){
                var left = this.parentNode.style.left,
                    top = this.parentNode.style.top;
                _this.savaData(this.previousSibling,left,top);
                event.stopPropagation();
            }
        },
        savaData:function(el,left,top){

            if (window.localStorage){

                var value = el.value;

                localStorage["data"+this.noteCount] =  JSON.stringify({
                    "count":this.noteCount,
                    "content":value,
                    "left":left,
                    "top":top
                });
               
            }
        },
        deteleDefualt:function(event){
            event.stopPropagation();
        }
    }
}
</script>

<style>

</style>