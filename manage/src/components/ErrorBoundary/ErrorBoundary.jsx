import React from 'react';
// 错误边界
export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, message: '' };
    }
  
    static getDerivedStateFromError(error) {
      // 更新 state 使下一次渲染能够显示降级后的 UI
        console.log(error);
        return { hasError: true, message: error.message };
    }
  
    componentDidCatch(error, info) {
      // 你同样可以将错误日志上报给服务器
        // logErrorToMyService(error, info);
        console.log(error.message, info);
    }
  
    render() {
        if (this.state.hasError) {
            // 你可以自定义降级后的 UI 并渲染
            return <h1>{this.state.message}</h1>;
        }

        return this.props.children; 
    }
    
}