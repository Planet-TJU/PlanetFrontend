<template>
  <div id="CodeEditor">
    <div class="codeEditBox">
      <editor
        ref="editor"
        v-model="editorCode"
        @init="editorInit"
        @input="codeChange"
        :lang="lang"
        :options="editorOptions"
        :theme="theme"
        v-if="show"
      ></editor>
      <!-- :height="flag ? '100%' : '99.9%'" -->
    </div>
  </div>
</template>

<script>
import Editor from "vue2-ace-editor";
export default {
  name: "CodeEditor",
  components: {
    Editor,
  },
  props: {
    fontSize: String,
    lang: String,
    theme: String,
    code: String,
    flag: Boolean,
  },
  watch: {
    code(n,o){
      this.editorCode=n;
    },
    flag(n, o) {
      this.show = false;
      this.$nextTick(() => {
        // 重新渲染组件
        this.show = true;
      });
    },
  },
  data() {
    return {
      show: true,
      // 双向绑定的编辑器内容值属性
      editorCode: this.code,
      editorOptions: {
        // 设置代码编辑器的样式
        enableBasicAutocompletion: true, //启用基本自动完成
        enableSnippets: true, // 启用代码段
        enableLiveAutocompletion: true, //启用实时自动完成
        tabSize: 2, //标签大小
        fontSize: parseInt(this.fontSize), //设置字号
        showPrintMargin: false, //去除编辑器里的竖线
        displayIndentGuides: false, // 显示参考线
      },
    };
  },
  methods: {
    // 编辑内容改变时触发
    codeChange(val) {
      val;
      this.$emit("updateCode", val);
    },
    editorInit(e) {
      require("brace/ext/language_tools"); //language extension prerequsite...
      // json编辑器
      require("brace/theme/eclipse");
      require("brace/snippets/json");
      require("brace/mode/json");

      // python编辑器
      require("brace/theme/dracula");
      require("brace/snippets/python");
      require("brace/mode/python");
    },
  },
};
</script>

<style scoped>
#CodeEditor {
  width: 100%;
  /* background: pink; */
  display: flex;
  justify-content: center;
  /* align-items: center; */
  height: calc(100% - 35px);
  overflow: hidden;
}
.codeEditBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>