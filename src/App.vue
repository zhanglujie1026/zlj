<template>
  <div id="app">
    <div id="drag">
      <draggable
        :options="{group:{name: 'drag', pull: 'clone'}}"
        @start="handleStart"
        @end="handleEnd"
        id="dragContent"
      >
        <el-button type="primary">这是一个导航条</el-button>
      </draggable>
    </div>
    <div id="view" class="view">
      <router-view />
    </div>
    <el-dialog title="编辑详细信息" :visible.sync="dialogVisible" width="400px">
      <DialogForm @handleSubmit="handleSubmit" :dialogVisible.sync="dialogVisible" />
    </el-dialog>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Vue from "vue";
import router from "../src/router/index";
import VNode from "vue";
import Layout from "../src/layout";
import { constantRoutes } from "../src/router/index";
import Router from "vue-router";
import Axios from "axios";
import DialogForm from "./components/Dialog/index";

Vue.use(Router);

export default {
  name: "App",
  data() {
    return {
      isDragging: false,
      router,
      indexNum: 0,
      dialogVisible: false,
      formValue: ""
    };
  },
  methods: {
    handleStart(evt) {
      this.isDragging = true;
    },
    handleEnd(evt) {
      this.isDragging = false;
      // if (evt.item.tagName == "BUTTON") {
      //   const divHead = Vue.component("div-head", {
      //     render: function(createElement) {
      //       return createElement("p", "hi");
      //     }
      //   });
      //   var component = new divHead().$mount();
      //   this.$children[0].$el.appendChild(component.$el);
      // }
      if (evt.to.parentNode.tagName == "UL") {
        evt.to.removeChild(evt.item);
        this.dialogVisible = true;
      }
    },
    handleSubmit(form) {
      Axios.get("http://localhost:8800/route").then((res) => {console.log(res)});
      // Axios.post("http://localhost:8800/add", {
      //   data: {
      //     nameEn: form.nameEn
      //   }
      // }).then(res => {
      //   this.dialogVisible = false;
      //   const addRoutes = [
      //     {
      //       path: `/${form.nameEn}`,
      //       redirect: `/${form.nameEn}`,
      //       component: Layout,
      //       children: [
      //         {
      //           path: form.nameEn,
      //           name: form.nameEn,
      //           components: () =>
      //             require("@/views/" + form.nameEn + "/index"),
      //           meta: { title: form.nameCh, icon: "dashboard" }
      //         }
      //       ]
      //     }
      //   ];
      //   addRoutes.forEach(item => {
      //     this.$router.options.routes.push(item);
      //   });
      //   this.$router.addRoutes(addRoutes);
      //   this.indexNum += 1;
      // });
    }
  },
  components: {
    draggable,
    DialogForm
  }
};
</script>
<style scoped>
#app {
  display: flex;
}
#drag {
  flex: 1;
  height: 100%;
}
#view {
  flex: 3;
}
</style>
