var app = new Vue({
    el: '#vue_app',
    delimiters: ["[[","]]"],
    data:{
        serverMessage: '0',
        activeId: '-1'
    },
    methods:{
        accordion: function(event, id){
            if(this.activeId === id){
                this.activeId = undefined;
            }else{
                this.activeId = id;
            }
        },
        linkClasses(id){
            if(this.activeId == id){
                return 'active';
            }
            return '';
        },
        accStyles:function(id){
            // Note: need to ensure accordion is not 'undefined'
            var accordion = this.$refs['acc_'+id];
            if(this.activeId != id){
                return {height:'0px'}
            }else if(accordion && accordion.offsetHeight == 0){
            
                var style = accordion.firstChild.currentStyle || window.getComputedStyle(accordion.firstChild);
                var margintop = parseInt(style.marginTop.slice(0,-2));
                var marginbottom = parseInt(style.marginBottom.slice(0,-2));
            
                return {height: accordion.firstChild.offsetHeight+ margintop + marginbottom + 'px'}
            }else{
                return {height:'0px'}
            }
        },
        accClasses:function(id){
            var classes = ['accordion','ani_height'];
            if(this.activeId == id){
                classes.push('active');
            }
            return classes.join(' ');
        }
    },
    created:function(){
        // Demo: recieving pushed data
        var source = new EventSource("event");
        source.onmessage = function(event) {
            this.serverMessage = event.data;
        }.bind(this)
        source.onerror = function(error) {
            console.log(error);
        }
    }
})