// postcss 【注】 Tailwind 不会自动添加浏览器引擎前缀到生成的 CSS 中，安装 ​autoprefixer ​去处理这个问题
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
