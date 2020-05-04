<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="英文名称" label-width="80px">
        <el-input v-model="form.nameEn" />
      </el-form-item>
      <el-form-item label="中文名称" label-width="80px">
        <el-input v-model="form.nameCh" />
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "DialogForm",
  data() {
    return {
      form: {
        nameCh: "",
        nameEn: "",
      }
    };
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
      this.$emit('handleSubmit', this.form);
    },
    onCancel() {
      this.$emit('update:dialogVisible', false);
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
.buttons {
    text-align: center;
}
</style>