<template>
  <div id="Welcome">
    <div class="main">
      <img
        src="https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.0.2/stellar/icon.svg"
        width="180px"
      />
      <h2 class="description animate__animated animate__fadeIn">Planet</h2>
      <div class="description animate__animated animate__fadeIn">
        Planet 是一款由郎文翀、黄硕、相里千卉3位TJUer基于华为云函数工作流
        Function Graph 产品开发的云端实验数据预处理平台，您只需要在这里填写 Json
        格式的数据，剩下的所有数据处理操作全部交由 Planet 一站式完成！
      </div>
      <a
        @click="start"
        class="button theme start animate__animated animate__fadeIn"
        href="#"
        >Start Exploring</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  methods: {
    start() {
      // this.apis.user.login().then((res) => {
      //   console.log(res);
      // });
      this.$router.push({ name: "Homepage" });
    },
  },
};
</script>

<style scoped>
#Welcome {
  width: 100%;
  height: 100vh;
  background: #313438;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
img {
  animation: zoomIn 1s ease;
}
@keyframes zoomIn {
  from {
    filter: blur(8px);
    opacity: 0;
  }
  to {
    filter: blur(0);
    opacity: 1;
  }
}
h2 {
  margin-top: 40px;
  margin-bottom: 0;
  color: #d1d2d2;
  font-family: "Courgette", cursive;
}
.description {
  text-align: center;
  margin-top: 40px;
  width: 470px;
  color: #d1d2d2;
  line-height: 1.7;
  font-family: "hytmr";
}
a {
  margin-top: 40px;
  font-family: "Courgette", cursive;
  text-decoration: none;
}
a.button.theme:hover {
  background: #ff5722;
}
a.button.theme {
  background: #1bcdfc;
  color: var(--site-bg);
}
a.button {
  font-weight: 500;
  line-height: 1;
  padding: 0.75rem 2rem;
  border-radius: 3px;
  transition: background 0.2s ease-out;
  -moz-transition: background 0.2s ease-out;
  -webkit-transition: background 0.2s ease-out;
  -o-transition: background 0.2s ease-out;
  font-size: 0.9375rem;
}
a:hover {
  color: #ff5722;
}
</style>