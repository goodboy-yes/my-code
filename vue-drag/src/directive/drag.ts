import { App, DirectiveBinding } from 'vue';

type Coordinate = [number, number];
type CoordinateRange = [number, number, number, number];
interface IOptions {
  /** 拖拽范围元素 */
  outerElement?: HTMLElement | string;
  /** 拖拽点 */
  dragElement?: HTMLElement | string;
  /** 拖拽方式 */
  dragType?: 'position'|'transform';
  /** 拖拽开始的回调 */
  onDragStart?: (el: HTMLElement, v: Coordinate) => void;
  /** 拖拽中的回调 */
  onDrag?: (el: HTMLElement, v: Coordinate) => void;
  /** 拖拽结束的回调 */
  onDragEnd?: (el: HTMLElement, v: Coordinate) => void;
}

/**
 * 计算坐标差
 * @param oldCoordinate 旧坐标
 * @param newCoordinate 当前坐标
 */
const diffCoordinate = (oldCoordinate: Coordinate, newCoordinate: Coordinate): Coordinate => {
  const x = newCoordinate[0] - oldCoordinate[0];
  const y = newCoordinate[1] - oldCoordinate[1];
  return [x, y];
};

/**
 * 获取拖拽位移
 * @param vector 坐标差向量
 * @param range 拖拽向量取值范围
 */
const getMoveVector = (vector: Coordinate, range: number[]): Coordinate => {
  let [x, y] = vector;
  y = y < 0 ? Math.max(y, range[0]) : Math.min(y, range[1]);
  x = x < 0 ? Math.max(x, range[2]) : Math.min(x, range[3]);
  return [x, y];
};

// 获取DOM
const getDom = (el: string | HTMLElement | undefined): HTMLElement | null => {
  if (!el) return null;
  if (typeof el === 'string') {
    return document.querySelector(el);
  } else {
    return el;
  }
};

/**
 * 获取新transform属性
 * @param transform 旧transform属性
 * @param vector 偏移向量
 */
const getTranslatePosition = (transform: string, vector: Coordinate): string =>
  `translate3d(${vector[0]}px, ${vector[1]}px, 0px) ${transform.replace('none', '')}`;

let onMouseMove: (e: MouseEvent) => void;
let onMouseUp: (e: MouseEvent) => void;
let onMouseDown: (e: MouseEvent) => void;

export default (app: App<Element>): void => {
  app.directive('drag', {
    mounted: (el: HTMLElement, binding: DirectiveBinding<IOptions>) => {
      const { onDragStart, onDrag, onDragEnd, dragElement, outerElement, dragType='transform' } = binding.value ?? {};
      const dragRangeElement: HTMLElement = getDom(outerElement) ?? document.body; // 拖拽范围元素
      let myDragElement: HTMLElement = getDom(dragElement) ?? el; // 拖拽点
      myDragElement.style.cursor = 'move';
      myDragElement.style.userSelect = 'none';
      if(dragType==='position'){
        el.style.position = el.style.position?el.style.position:'relative'
      }

      let startPosition: Coordinate | null = null; // 开始拖拽位置
      let draggingMoveVectorRange: CoordinateRange | null = null; // 可拖拽位移范围
      let startCssValue:string|number[]; // 初始定位值

      onMouseDown = (e: MouseEvent) => {
        startPosition = [e.pageX, e.pageY];
        if(dragType==='transform'){
          startCssValue = window.getComputedStyle(el).transform;
        }else if(dragType==='position'){
          startCssValue = [parseFloat(window.getComputedStyle(el).left),parseFloat(window.getComputedStyle(el).top)];
        }
        if (dragRangeElement && myDragElement) {
          // 记录可拖拽位移范围
          const dragRangeElementRect = dragRangeElement.getBoundingClientRect();
          const myDragElementRect = el.getBoundingClientRect();
          draggingMoveVectorRange = [
            dragRangeElementRect.top - myDragElementRect.top,
            dragRangeElementRect.bottom - myDragElementRect.bottom,
            dragRangeElementRect.left - myDragElementRect.left,
            dragRangeElementRect.right - myDragElementRect.right,
          ];
          typeof onDragStart === 'function' && onDragStart(el, startPosition);
        }
      };
      onMouseMove = (e: MouseEvent) => {
        if (startPosition && draggingMoveVectorRange) {
          const currentPosition: Coordinate = [e.pageX, e.pageY];
          // 本次的拖拽位移
          const currentMoveVector = getMoveVector(
            diffCoordinate(startPosition, currentPosition),
            draggingMoveVectorRange
          );
          // 赋新transform属性
          if(dragType==='transform' && (typeof startCssValue==='string')){
            el.style.transform = getTranslatePosition(startCssValue, currentMoveVector);
          }else if(dragType==='position' && Array.isArray(startCssValue)){
            el.style.left = (startCssValue[0] + currentMoveVector[0])+'px'
            el.style.top = (startCssValue[1] + currentMoveVector[1])+'px'
          }
          typeof onDrag === 'function' && onDrag(el, currentPosition);
        }
      };
      onMouseUp = (e: MouseEvent) => {
        typeof onDragEnd === 'function' && onDragEnd(el, [e.pageX, e.pageY]);
        startPosition = null;
      };

      const addEventListener = () => {
        if (myDragElement) {
          myDragElement.addEventListener('mousedown', onMouseDown);
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        }
      };
      addEventListener();
    },
    beforeUnmount: (el: HTMLElement) => {
      el.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    },
  });
};
