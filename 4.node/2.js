// 1） 文件模块的解析流程 解析流程每个版本一样
// 大致的 
// 默认会先找文件(添加js 和 json后缀)，找对应的文件夹，找到文件后就不会找文件了
// package.json 代表的是包的描述信息, 如果老版本会找包,在找文件 (原则上main的优先级高)
// 如果没有./ 或者../或者绝对路径 会认为此模块是一个第三方模块或者核心模块

// 2） 第三方模块都会安装到node_modules文件夹 (本地代码中的第三方模块)
let r = require('jquery'); // 会根据module.paths不停的向上查找 直到找到位置
console.log(r,module.paths);

// 3) 核心模块 不用安装

// 第三方模块 （全局的和本地的）
// 全局 就是安装的时候 带有-g的
    // 命令行中使用 nrm
    // sudo  npm  install nrm -g
    // C:\Users\test1\AppData\Roaming\npm\nrm -> C:\Users\test1\AppData\Roaming\npm\node_modules\nrm\cli.js

    // 因为npm被放到了全局下 ，所有npm目录下的命令都可以直接执行
    // 自己编写全局包 
    // 1.在package.json中声明bin 命令
    // 2.需要给对应文件增加 #! 指定环境
    // 3. npm link 可以做链接 将本地代码先暂时的连接到全局下
    // 4.我需要切换到官方npm下  nrm use npm
    // 5.登录账号 npm addUser
    // 6.npm publish 发布 并更新（需要改版本号）
    // 7.npm install 
    // 8.如果升级包 需要更新版本 （版本号）
    // 9.24小时之内不能重新发布

// 本地 就是直接安装
    // 本地模块表示在项目中使用 命令行用就用全局模块，如果像webpack这样的模块一般放项目依赖中使用  --save-dev(-D)只在开发时使用  --save(-s 或者不写) 开发上线都需要

    // 依赖分为 开发依赖 项目依赖 同版本依赖 捆绑依赖（打包依赖 npm pack） 可选依赖


    // 版本问题
    // ^ ~ >= <=
    // ^2.0.0 二版本以上 3 版本以下 semver major.minor.patch
    // ~1.2.0 只能比1.2大于等于 但是不能大于1.3

    // 大版本是大变化 2.1 / 2.2 只是增加api  2.1.1 2.1.2 只是修改bug

    // scripts npm run 命令时会将当前文件夹node_modules 下的bin目录添加到path中
    // npx 直接运行node_modules/.bin文件夹下命令 多了一个下载功能 用完即删除 方便

    // yarn npm ( 用yarn 就全部用yarn  不要混用 会用会丢包)  看库、框架的说明
    // npm install yarn -g
    // npx 是node5.2之后赠送给你的

    // nrm use cnpm => cnpm install

    // rm -rf 安装git时选择 支持linux 命令


    // 背下来
    // 回去promise + generator +async +await 必须要会用
    // commonjs规范
    // 几道题

    // buffer events fs http