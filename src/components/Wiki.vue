<template>
  <div id="Wiki">
    <div class="main">
      <div class="l-editor">
        <CodeEditor
          fontSize="10"
          lang="python"
          theme="dracula"
          :code="myfunc.code"
          :flag="flag"
          @updateCode="updateCode"
        ></CodeEditor>
      </div>
      <div class="r-info">
        <h3>{{ myfunc.name }}函数：{{ myfunc.subtitle }}</h3>
        <ul v-html="myfunc.info">
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CodeEditor from "@/components/CodeEditor.vue";
export default {
  name: "Wiki",
  props: {
    flag: Boolean,
    myfunc: Object,
  },
  components: {
    CodeEditor,
  },
  methods: {
    updateCode(code) {},
  },
};
</script>

<style scoped>
#Wiki {
  width: 100%;
  height: 100%;
  overflow: auto;
  /* background:pink; */
  /* padding: 20px; */
  color: #d1d2d2;
  background: #313438
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACFJREFUeNpiZGBg4GegAsBlCD8TqSYNQg2Mo6FEBAAIMACdPABtrSW/IQAAAABJRU5ErkJggg==");
}
#Wiki .main {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
}
#Wiki .main .l-editor {
  width: 65%;
  height: 100%;
}
.r-info {
  width: 32%;
  height: 100%;
  /* background: pink; */
  box-sizing: border-box;
  padding-top: 20px;
  overflow:auto;
}
h3,
h4,
h5,
h6 {
  color: #fff;
  margin-top: 40px !important;
  font-weight: 600;
  background: linear-gradient(to bottom, transparent 60%, #ec9411 0) no-repeat;
  display: initial;
  font-family: "Courgette", cursive;
}

h1:before,
h2:before,
h3:before,
h4:before,
h5:before,
h6:before {
  margin-top: 0px !important;
  height: 26px !important;
}
</style>