<template>
  <div id="Homepage">
    <div class="header animate__animated animate__fadeInDown">
      <div class="toolbar">
        <el-input
          placeholder="请输入请求的函数网关APIG"
          v-model="myfunc.url"
          disabled
        >
          <template slot="prepend">Https://</template>
        </el-input>
        <el-button type="primary" @click="submit">Submit</el-button>
      </div>
      <div class="info">
        <i class="fad fa-wifi-1"></i>&nbsp;&nbsp;Status:
        <span v-if="status === 1" class="green">200 OK</span>
        <span v-else-if="status === 0"
          ><i class="fad fa-spinner"></i> waiting</span
        >
        <span v-else class="red">500 ERROR</span>
      </div>
    </div>
    <div class="wrapper">
      <div class="l-side">
        <div class="bar">
          <i class="fas fa-caret-down absoluteLeft"></i>函数选择
        </div>
        <div
          class="item animate__animated animate__fadeInUp"
          @click="loadFunc(idx)"
          v-for="(func, idx) in functions"
          :key="idx"
        >
          <svg
            t="1650594931882"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2631"
            width="24"
            height="24"
          >
            <path
              d="M889.344 752.384c-1.792 6.272-9.856 10.624-20.544 16.384-11.584 6.08-21.632 5.504-28.8 3.52-6.976-2.048-13.248-6.656-18.496-13.632l-96.256-127.36-116.8 126.72c-13.952 15.104-29.76 17.344-47.808 6.656-7.424-4.352-20.992-20.48-22.592-27.776-1.536-7.232 1.344-14.848 8.768-22.976l129.152-140.544L581.888 448.896C577.984 443.2 577.6 436.544 580.672 428.992c2.944-7.552 9.92-12.032 17.344-16.448 10.688-6.016 20.48-6.208 27.712-5.632C633.024 407.36 639.616 411.52 645.696 419.2l78.208 101.952 94.656-103.104C826.752 408.96 836.032 405.76 844.992 403.2c8.896-2.56 26.496 6.656 36.096 12.032 9.856 5.312 14.976 11.456 15.616 18.368 0.576 6.912-2.112 13.696-8.256 20.416l-115.648 125.44 114.112 156.48C890.496 740.608 891.392 746.24 889.344 752.384zM592.128 128.576C552 124.032 467.968 118.016 417.024 150.976 365.952 184.064 336.64 240.896 322.432 308.48L302.4 403.968 158.592 403.968c-16.704 0-30.016 4.8-31.424 34.752 1.408 16.32 14.72 29.248 31.424 29.248L288.64 467.968l-85.696 418.688c0 0-21.952 68.288 26.048 71.296 41.92 2.624 50.24-65.6 50.24-65.6l86.4-424.384 109.76 0c17.664 0 32-14.336 32-32s-14.336-32-32-32L379.264 403.968l19.008-93.568C438.912 161.28 514.688 197.504 584.704 197.504c11.456 0 54.656 3.008 57.664-26.56C646.208 133.952 609.024 130.496 592.128 128.576zM126.592 443.392c0-1.92 0.448-2.88 0.576-4.608C127.04 437.824 126.592 436.992 126.592 435.968L126.592 443.392z"
              p-id="2632"
              fill="#1296db"
            ></path>
          </svg>
          &nbsp;{{ func.name }}
        </div>
      </div>
      <div class="r-main">
        <div class="top-half animate__animated animate__fadeIn" ref="topHalf">
          <div class="bar">
            <i
              :class="[
                closeTopHalf ? 'fas fa-caret-up' : 'fas fa-caret-down',
                'absoluteLeft',
              ]"
              @click="transform(0)"
            ></i
            >工作区
          </div>
          <CodeEditor
            fontSize="18"
            lang="json"
            theme="eclipse"
            :code="code"
            :flag="flag"
            @updateCode="updateCode"
          ></CodeEditor>
        </div>
        <div
          class="bottom-half animate__animated animate__fadeInUp"
          ref="bottomHalf"
        >
          <div class="bar">
            <i
              :class="[
                closeBottomHalf ? 'fas fa-caret-up' : 'fas fa-caret-down',
                'absoluteLeft',
              ]"
              @click="transform(1)"
            ></i
            >介绍文档
          </div>
          <Wiki :flag="flag" :myfunc="myfunc"></Wiki>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeEditor from "@/components/CodeEditor.vue";
import Wiki from "@/components/Wiki.vue";
export default {
  name: "Homepage",
  components: {
    CodeEditor,
    Wiki,
  },
  methods: {
    loadFunc(idx) {
      this.myfunc = this.functions[idx];
      this.code = this.myfunc.json;
    },
    transform(i) {
      this.$refs.topHalf.style.transition = ".3s";
      this.$refs.bottomHalf.style.transition = ".3s";
      if (i == 0) {
        // console.log(this.$refs.topHalf);
        // 操作上半窗
        this.closeTopHalf = !this.closeTopHalf;
        if (this.closeBottomHalf && this.closeTopHalf) {
          //下半窗是关着的同时上半窗也要关上
          this.$refs.topHalf.style.height = "35px";
        } else if (this.closeBottomHalf && !this.closeTopHalf) {
          // 下半窗是关着的同时上半窗要打开
          this.$refs.topHalf.style.height = "calc(100% - 35px)";
        } else if (!this.closeBottomHalf && this.closeTopHalf) {
          // 下半窗是开着的同时上半窗要关上
          this.$refs.topHalf.style.height = "35px";
          this.$refs.bottomHalf.style.height = "calc(100% - 35px)";
        } else if (!this.closeBottomHalf && !this.closeTopHalf) {
          // 下半窗是开着的同时上半场要打开
          this.$refs.topHalf.style.height = "40%";
          this.$refs.bottomHalf.style.height = "60%";
        }
      } else if (i == 1) {
        this.closeBottomHalf = !this.closeBottomHalf;
        if (this.closeTopHalf && this.closeBottomHalf) {
          // 上半窗是关着的同时下半窗也要关上
          this.$refs.bottomHalf.style.height = "35px";
        } else if (this.closeTopHalf && !this.closeBottomHalf) {
          // 上半窗是关着的同时下半窗要打开
          this.$refs.bottomHalf.style.height = "calc(100% - 35px)";
        } else if (!this.closeTopHalf && this.closeBottomHalf) {
          // 上半窗是开着的同时要关上下半窗
          this.$refs.bottomHalf.style.height = "35px";
          this.$refs.topHalf.style.height = "calc(100% - 35px)";
        } else if (!this.closeTopHalf && !this.closeBottomHalf) {
          // 上半窗是开着的同时要打开下半窗
          this.$refs.topHalf.style.height = "40%";
          this.$refs.bottomHalf.style.height = "60%";
        }
      }
      var that =this;
      setTimeout(function(){
        that.transformCallBack();
      },300)
    },
    transformCallBack() {
      console.log(this.$refs.topHalf.style.transition);
      this.$refs.topHalf.style.transition = "none";
      this.$refs.bottomHalf.style.transition = "none";
      console.log(this.$refs.topHalf.style.transition)
      this.flag = !this.flag;
    },
    backup() {
      this.$router.push({ name: "Homepage" });
    },
    submit() {
      this.status = 0;
      this.apis.submit(this.myfunc.url, this.code).then((res) => {
        if (res.status === 200) {
          this.code = JSON.stringify(res.data, null, "\t");
          this.status = 1;
        }
      });
    },
    submitError() {
      this.status = -1;
    },
    updateCode(code) {
      // alert(code);
      this.code = code;
    },
  },
  created() {
    this.myfunc = this.functions[0];
    this.code = this.myfunc.json;
  },
  mounted() {
    window.submitError = this.submitError;
  },
  data() {
    return {
      status: 1,
      myfunc: {},
      flag: false, //子组件自适应窗口
      api: ``,
      value: true,
      closeTopHalf: false,
      closeBottomHalf: false,
      code: "",
      functions: [
        {
          name: "max",
          subtitle: "寻找向量或矩阵每行(列)的最大元素",

          info: `
           <li>
            <span class="wave">功能详解</span>：类似于matlab中的max函数，可以对向量或者矩阵中的元素进行最大值元素查找功能，其中还支持列查找以及行查找，上方编辑器给出了一个对于4×11的矩阵进行列最大值查找，最终返还一个向量存储了每一个列中的最大值，左侧给出了该云函数具体实现代码。
          </li>
          <li>
            <span class="emp">参数 k </span>：取0则为对向量或者矩阵中每一列取最大值，取1则为对向量或者矩阵中每一行取最大值
          </li>
          <li>
            <span class="emp">参数 data </span>：存储输入数据的向量(用一维数组表示,如[1,2])或者矩阵(用二维数组表示，如[[1,2],[2,3]])
          </li>`,
          url: "6cc9cd55be7d43388739959dfb9fe99d.apig.cn-north-4.huaweicloudapis.com/max",
          json: `{
    "k": 0,
    "data": [
        [0,2,3,4,1,2,3,2,3,3,3],
        [0,2,3,4,1,2,3,2,3,3,3],
        [1,2,2,2,2,2,2,2,2,2,2],
        [5,0,-1,8,1,1,1,1,1,1,1]
    ]
}`,
          code: `# -*- coding:utf-8 -*-
import json
import base64
import numpy as np
def handler (event, context):
    s=json.loads(str(base64.b64decode(json.dumps(event["body"])),encoding="utf-8"))
    a=np.array(s['list'])
    k=s['k']
    ans=np.max(a,axis=k)
    result={'ans': ans.tolist()}
    return {
        "statusCode": 200,
        "isBase64Encoded": False,
        "body": json.dumps(result),
        "headers": {
            "Content-Type": "application/json"
        }
    }
`,
        },
      ],
    };
  },
};
</script>

<style scoped>
#Homepage {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#Homepage .header {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 70px;
  justify-content: space-around;
  box-shadow: 0 1px 1px 5px rgba(0, 0, 0, 0.03);
  /* background: #e6e6e6; */
  border-bottom: 1px solid #999;
}
#Homepage .header .toolbar {
  width: calc(90% - 60px);
  display: flex;
  justify-content: space-around;
}
#Homepage .header .info {
  font-size: 12px;
  color: #333;
}
.absoluteLeft {
  position: absolute;
  left: 12px;
}
.green {
  color: #38ada9;
}
.red {
  color: #d63031;
}
#Homepage .wrapper {
  width: 100%;
  height: calc(100% - 70px);
  display: flex;
}
#Homepage .wrapper .bar {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  height: 34px;
  justify-content: center;
  /* padding: 0 5px; */
  border-bottom: 1px solid #e5e5e5;
  background: #fff;
}
#Homepage .wrapper .l-side {
  border-right: 1px solid #e5e5e5;
  width: 250px;
  height: 100%;
  overflow: auto;
}
#Homepage .wrapper .l-side .item {
  font-family: "Courgette", cursive;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  font-size: 20px;
  height: 50px;
  color: #606266;
  transition: 0.3s;
}
#Homepage .wrapper .l-side .item:hover {
  background: #f5f7fa;
}
#Homepage .wrapper .r-main {
  width: calc(100% - 250px);
  height: 100%;
}
#Homepage .wrapper .r-main .top-half {
  overflow: hidden;
  transition: height 0.3s;
  height: 40%;
}
#Homepage .wrapper .r-main .bottom-half {
  overflow: hidden;
  transition: height 0.3s;
  height: 60%;
  background: #fafafa;
  border-top: 2.5px solid #e5e5e5;
}
.fa-wifi-1 {
  color: #e17055;
}
.fa-spinner {
  animation: spin infinite 0.7s linear;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.v-leave-to,
.v-enter {
  opacity: 0;
  transform: translateY(30px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}
</style>