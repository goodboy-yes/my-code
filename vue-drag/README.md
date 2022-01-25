# Vue 3 拖拽指令

## 简介
一个利用`transform`属性，在元素原先位置的基础上进行位移的`Vue3`自定义指令

## 输入参数

```javascript
<div v-drag="option"></div>
```
option：

| 参数         | 类型                 | 备注                                                         |
| ------------ | -------------------- | ------------------------------------------------------------ |
| outerElement | HTMLElement 、string | 限制拖拽范围，默认为`body`                                   |
| dragElement  | HTMLElement 、string | 拖拽点，默认为指令绑定的元素                             |
| dragType     | string               | 拖拽方式，可选值：`position`、`transform` 。当值为`position`时默认为`relative`定位，且被拖拽元素原始定位值只能为`px`，不能是`%`                  |
| onDragStart  | Function             | 拖拽开始的回调，回调函数参数（`el`：绑定的元素，`startPosition`：开始拖拽坐标） |
| onDrag       | Function             | 拖拽中的回调，回调函数参数（`el`：绑定的元素，`startPosition`：当前坐标） |
| onDragEnd    | Function             | 拖拽结束的回调，回调函数参数（`el`：绑定的元素，`startPosition`：结束拖拽坐标） |

## 开始
指令源代码在`src/directive/drag.ts`

安装依赖
```bash
npm install
```
运行示例项目
```bash
npm run dev
```
## 其他

- 被拖拽元素css默认设置值：`cursor`为`move`，`userSelect`为`none`
- 代码参考自[easy-drag](https://github.com/junqiuzhang/easy-drag)编写

