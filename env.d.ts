// 定义 .vue文件的类型，解决ts 无法解析其类型的问题
declare module "*.vue" {
  import type { DefineComponent } from 'vue';
  const vueComponent: DefineComponent<{}, {}, any>;
  export default vueComponent;
}