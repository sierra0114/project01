<template>
  <div>
    <p>还未注册，点击<b @click="toregister">注册</b></p>
  </div>
</template>


<script>
  import router from "../router";
  export default {
    name: "login",
    data() {
      return {
        input1: "",
        input2: "",
        dialogTableVisible: true,
        dialogFormVisible: true,
        formLabelWidth: "100px",
      };
    },

    methods: {
      toregister() {
        router.push({
          name: "register"
        });
      },
    },
    created() {
      // alert("登录创建了");
    },
    destroyed() {
      // alert("登录销毁了");
    },
  };
</script>
<style scoped>
  p {
    text-align: center;
  }

  b {
    cursor: pointer;
  }
</style>