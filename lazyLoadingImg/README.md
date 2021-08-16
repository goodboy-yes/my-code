## 图片懒加载方案

1. 原生方法：通过 `window.innerHeight > img.getBoundingClientRect().top`判断图片是否在可视区域，动态将`data-src`的值赋给`src`（native.html）
2. 在`img`标签使用`loading="lazy"` 有兼容性问题 `ie`和`safari`不支持（loading.html）
3. [IntersectionObserver](https://github.com/w3c/IntersectionObserver) API，自动"观察"元素是否可见，`ie`不支持（intersectionObserver.html）
4. 在`IntersectionObserver`基础上增加`srcset`和`size`属性引入响应式布局（srcset.html）

## 综合方案

图片懒加载方式会造成布局抖动和`SEO、RSS`不友好等问题，可结合`IntersectionObserver API`、`aspect-radio-box`、`setsrc`等方式解决

1. 首先可通过`aspect-radio-box`保证懒加载图片的占位大小，解决布局抖动问题；
2. `img`标签的`src`属性需要携带原始图片`origin.jpg`，确保`SEO`，再在`srcset`属性存放缩略图片，防止`src`的原图被加载
3. 将原本应该在`srcset`中的响应式列表存在到`data-srcset`中，当图片进入视口，替换调`srcset`中的缩略图，最后浏览器更加视口大小选择加载`srcset`中的图片