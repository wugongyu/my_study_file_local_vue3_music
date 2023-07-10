// 定义 .vue文件的类型，解决ts 无法解析其类型的问题
declare module "*.vue" {
  import type { DefineComponent } from 'vue';
  const vueComponent: DefineComponent<{}, {}, any>;
  export default vueComponent;
}

// 定义图片模块，解决找不到图片相应的类型声明的问题
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'