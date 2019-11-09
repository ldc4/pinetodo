# pinetodo

青松土豆，轻松管理待办事项。

参考[番茄土豆](https://pomotodo.com/), 采用vue2.0 + express技术栈搭建一个demo项目。


## 开发过程

### express

初始化项目：
cd server
express --no-view --git server

### vue

利用vue-cli工具初始化项目：
vue create client

## 数据库

选用MongoDB吧，直接上[mongoose](https://mongoosedoc.top/docs/index.html)

将server/config/db.json.template更名为db.json，填写对应的mongodb连接配置

### 约定

增删改查：add/get/edit/remove

### 实体

#### todospace（待办空间）

```
Todo：待办
---
id 唯一标识
content 待办内容
createTime 创建时间
updateTime 更新时间
creator 创建人
editor  编辑人
```

#### workspace（工作空间）

```
Record：记录
---
id 唯一标识
content 记录内容
period 记录周期
startTime 开始时间
completeTime 完成时间
endTime 结束时间
createTime 创建时间
updateTime 更新时间
creator 创建人
editor  编辑人
```



