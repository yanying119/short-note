<template>
    <div id="note" v-on:click="init($event)">
        <p style ="text-align:center;">点击空白处新增便签</p>
    </div>
</template>

<script>

export default {
    name: 'app',
    data:function(){
        return {
            noteCount:1
        }
    },
    methods:{
        creatElement:function(n,style,content){

            var element = document.createElement("div"),
                note = document.getElementById("note");

            element.setAttribute("class","note");
            element.setAttribute("style",style);
            element.innerHTML = "<div class='note_heading'>便签"+n+"</div><textarea>"+content+"</textarea><button class='btn btn-default'>提交日记</button><div class='deletes'>x</div>";
            note.appendChild(element);
            return element;
        },
        bind:function(obj,event){
            var _this = this;
            this.move(obj,event);
            obj.getElementsByTagName("button")[0].onmousedown = function(event){
                event.stopPropagation(); 
                var count = _this.getCount(this.parentNode);
                _this.saveData(this,count);

            }
            obj.getElementsByClassName("deletes")[0].onmousedown = function(event){
                event.stopPropagation();
                if(confirm("一旦删除不可恢复，您确定要删掉吗？")){

                    this.parentNode.parentNode.removeChild(this.parentNode);
                    var count = _this.getCount(this.parentNode);
                    localStorage.removeItem("data"+count);
                }
            }
        },
        move:function(obj,event){
            var _this = this;
            
            obj.addEventListener("mousedown",function(event){
                var offsetLeft = event.offsetX,
                    offsetTop = event.offsetY,
                    event = event,
                    that = this,
                    moving = function(event){
                        var left = event.clientX-offsetLeft,
                            top = event.clientY-offsetTop;
                        that.style.left = left+"px";
                        that.style.top = top+"px";
                    };

                document.addEventListener("mousemove",moving,false);
                document.addEventListener("mouseup",function(){
                    this.removeEventListener("mousemove",moving,false);
                    var count = _this.getCount(that);
                    
                    if(localStorage.getItem('data'+count)){
                        _this.saveData(that.getElementsByTagName("button")[0],count);
                    }

                },false);

            },false);
            //阻止冒泡
            obj.onclick = function(event){
               event.stopPropagation(); 
            }
            obj.getElementsByTagName('textarea')[0].onmousedown = function(event){
               event.stopPropagation();
            }
        },
        getCount:function(obj){
            return obj.getElementsByClassName("note_heading")[0].innerHTML.slice(2)
        },
        saveData:function(obj,n){
            if(window.localStorage){
                var left = obj.parentNode.style.left,
                    top=obj.parentNode.style.top,
                    count = n,
                    content = obj.previousSibling.value;
                localStorage['data'+count] = JSON.stringify({
                    left:left,
                    top:top,
                    count:count,
                    content:content
                })
            }
        },
        init:function(e){
            var note = document.getElementById('note'),
                left = e.clientX,
                top = e.clientY,
                style  = "position:fixed;left:"+left+"px;top:"+top+"px";

            if (localStorage.noteCount){
                this.noteCount = localStorage.getItem("noteCount");
            }else{
                this.noteCount = this.noteCount;
            }
            var el = this.creatElement(this.noteCount,style,"点击此处编辑");
            this.bind(el,e);
            localStorage["noteCount"] = +this.noteCount+1;
        }
    },
    mounted:function(event){

        if(localStorage){
            console.log(localStorage.length);
            for(var i = 0; i<localStorage.length;i++){

                if(/^data\d+$/.exec(localStorage.key(i))){
                    var Json = localStorage.getItem(localStorage.key(i));
                    var left = JSON.parse(Json).left,
                        top = JSON.parse(Json).top,
                        count = JSON.parse(Json).count,
                        content = JSON.parse(Json).content,

                    style  = "position:fixed;left:"+left+";top:"+top+"";
                    var el = this.creatElement(count,style,content)
                    this.bind(el,event);
                }
            }
        } 
    }
}
</script>

<style>

</style>