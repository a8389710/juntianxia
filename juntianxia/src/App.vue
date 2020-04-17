<template>
 <div id="app">
    <div class="header">
      <router-view name="header" />
    </div>
    <div class="body">
      <router-view v-wechat-title="$route.meta.title" />
    </div>
    <div class="footer">
      <router-view  name="tabbar" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      pathName:''
    }
  },
  watch:{
    // $route(newv,oldv){
    //   // console.log(newv,'newv_新路由')
    //   // console.log(oldv,'oldv_旧路由')
    //   // this.pathName = newv.name || oldv.name
    //   // this.setIsShow()
    // }
    // this.pathName = this.$route
    // console.log(this.pathName)
  },
  methods:{
    // 判断要不要展示
    setIsShow(){
      let name = this.pathName
      let isok = true
      switch(name){
        case 'dianlei':isok = false;break;
        case 'peishon':isok = false;break;
      }
      console.log(isok,name)
      return isok
    },
  },
}
</script>

<style>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

html,
body {
  height: 100%;
  overflow: hidden;
}
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.body {
  flex: 1;
  overflow-y: auto;
}
</style>
