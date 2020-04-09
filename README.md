## 小孩学开发，增加 scratch 自定义扩展

自定义扩展需要调整涉及到3个原始的库，将项目结构调整为一个代码库，原始代码来自 https://github.com/LLK/

###  scratch-gui    操作前端

    /切换vm和l10n使用本地库
    
    npm link scratch-vm
    npm link scratch-l10n
    
    //启动
    npm start 

### scratch-vm  扩展在scratch虚拟机中
    
    
      cd Scratch3
      cd scratch-vm
      npm install
      //本地库替换全局库
      npm link
      npm add uglifyjs-webpack-plugin
      //监听变化编译
      npm run watch
      
  
### scratch-l10n，语言
  
    npm run build
    //本地库替换全局库
    npm link