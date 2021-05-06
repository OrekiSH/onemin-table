import { proxyMethods } from '@onemin-table/shared';

const proxyMixin = {
  mounted() {
    // Proxy <el-input> methods, 代理<el-input>的方法
    proxyMethods(this, 'input', ['focus', 'blur', 'select']);
  },
};

export default proxyMixin;
